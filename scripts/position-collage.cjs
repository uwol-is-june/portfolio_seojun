// 홈 포지션 호버 이미지: 실제 프로젝트 화면을 기울어진 세로 열로 붙이고, 열마다 반대 방향으로 흐르게 한다.
// 카드뉴스 에이전트 썸네일(public/projects/cardnews-agent/cover.webp)과 같은 배치다.
//
// 프레임을 저장하는 움직이는 WebP는 용량을 맞추려고 fps를 낮추면 끊겨 보였다(TASK-109).
// 그래서 작은 화면 이미지를 SVG 안에 넣고 CSS 애니메이션으로 움직인다. <img>로 넣어도 재생되고,
// 브라우저가 매 프레임을 그리므로 부드럽고, 이미지는 한 번만 들어가 용량도 작다.
//
// usage: node scripts/position-collage.cjs
//   - 화면 목록: scripts/position-collage.json
//   - 결과: public/home/<position>.svg (움직임) · public/home/<position>-still.webp (첫 화면, 처음 로드 · 동작 줄이기용)
//   - 필요: ffmpeg(이미지 축소) · Playwright(정지 이미지 캡처, 브라우저는 설치된 Edge 사용)
//     Playwright가 프로젝트에 없으면 PW 환경변수로 경로를 준다. 예) PW=<npx 캐시>/node_modules/playwright
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const pw = require(process.env.PW || "playwright");
const ROOT = path.resolve(__dirname, "..");
const LIST = JSON.parse(fs.readFileSync(path.join(__dirname, "position-collage.json"), "utf8"));
const OUT = path.join(ROOT, "public/home");

// 호버 이미지 최대 크기(300×400, 3:4)를 SVG 좌표로 쓴다
const W = 300;
const H = 400;
const COLS = 3;
const GAP = 8;
const STAGE_W = W * 1.45; // 기울였을 때 모서리가 비지 않게 넓게
const COL_W = (STAGE_W - GAP * (COLS - 1)) / COLS;
const IMG_H = (COL_W * 4) / 3;
const SECONDS = 26; // 한 바퀴(묶음 하나 높이)를 도는 시간. 길수록 천천히 흐른다
const PX = 2; // 레티나에서 선명하도록 표시 크기의 2배로 줄인다

const round = (n) => Math.round(n * 100) / 100;

/** 화면 캡처를 3:4로 자르고 줄여 data URI로 */
function thumb(src, tmp) {
  const out = path.join(tmp, src.replace(/[\\/]/g, "_"));
  if (!fs.existsSync(out)) {
    const w = Math.round(COL_W * PX);
    const h = Math.round(IMG_H * PX);
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", path.join(ROOT, "public", src),
      "-vf", `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h}`, "-c:v", "libwebp", "-quality", "62", out]);
  }
  return `data:image/webp;base64,${fs.readFileSync(out).toString("base64")}`;
}

function svg(images, tmp, animate) {
  const cols = Array.from({ length: COLS }, () => []);
  images.forEach((src, i) => cols[i % COLS].push(thumb(src, tmp)));
  const colSvg = cols.map((list, c) => {
    const cycle = list.length * (IMG_H + GAP); // 묶음 하나 높이. 이만큼 움직이면 제자리
    // 같은 묶음을 세 번 이어 붙이고, 화면 가운데에는 늘 1~2번째 묶음 사이가 오도록 움직인다
    const imgs = [0, 1, 2]
      .flatMap((set) => list.map((href, i) => ({ href, y: set * cycle + i * (IMG_H + GAP) })))
      .map(({ href, y }) => `<image href="${href}" x="0" y="${round(y)}" width="${round(COL_W)}" height="${round(IMG_H)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#r)"/>`)
      .join("");
    const up = c % 2 === 0;
    const from = up ? -cycle : -2 * cycle;
    const to = up ? -2 * cycle : -cycle;
    return {
      css: `.c${c}{animation:c${c} ${SECONDS}s linear infinite}@keyframes c${c}{from{transform:translateY(${round(from)}px)}to{transform:translateY(${round(to)}px)}}`,
      g: `<g transform="translate(${round(c * (COL_W + GAP))} 0)"><g class="c${c}" style="transform:translateY(${round(from)}px)">${imgs}</g></g>`,
    };
  });
  // 열의 y=0(현재 위치)을 화면 가운데에 두고 기울인다
  const stage = `<g transform="translate(${W / 2} ${H / 2}) rotate(-9) translate(${round(-STAGE_W / 2)} 0)">${colSvg.map((c) => c.g).join("")}</g>`;
  const style = animate
    ? `${colSvg.map((c) => c.css).join("")}@media (prefers-reduced-motion:reduce){g[class]{animation:none}}`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<style>${style}</style>
<defs>
<clipPath id="r" clipPathUnits="objectBoundingBox"><rect width="1" height="1" rx="0.05" ry="0.0375"/></clipPath>
<radialGradient id="v" cx="50%" cy="50%" r="75%"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.5"/></radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="#0b0b0c"/>
${stage}
<rect width="${W}" height="${H}" fill="url(#v)"/>
</svg>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await pw.chromium.launch({ channel: "msedge" });
  for (const [id, images] of Object.entries(LIST)) {
    if (id.startsWith("_")) continue;
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `collage-${id}-`));
    const animated = path.join(OUT, `${id}.svg`);
    fs.writeFileSync(animated, svg(images, tmp, true));

    // 정지 이미지: 애니메이션 없는 같은 SVG(첫 화면과 같은 자리)를 2배로 찍는다
    const still = path.join(tmp, "still.svg");
    fs.writeFileSync(still, svg(images, tmp, false));
    const p = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: PX });
    await p.goto("file:///" + still.replace(/\\/g, "/"));
    await p.waitForTimeout(300);
    const png = path.join(tmp, "still.png");
    await p.screenshot({ path: png });
    await p.close();
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", png, "-c:v", "libwebp", "-quality", "75", path.join(OUT, `${id}-still.webp`)]);

    fs.rmSync(tmp, { recursive: true, force: true });
    console.log(id, `${(fs.statSync(animated).size / 1024).toFixed(0)} KB (svg)`);
  }
  await browser.close();
})();
