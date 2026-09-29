// 홈 포지션 호버 이미지: 실제 프로젝트 화면을 기울어진 세로 열로 붙이고, 열마다 반대 방향으로 흐르는 움직이는 WebP를 만든다.
// 카드뉴스 에이전트 썸네일(public/projects/cardnews-agent/cover.webp)과 같은 배치다.
//
// usage: node scripts/position-collage.cjs
//   - 화면 목록: scripts/position-collage.json
//   - 결과: public/home/<position>.webp (움직임) · public/home/<position>-still.webp (첫 프레임, 동작 줄이기용)
//   - 필요: Playwright(브라우저는 설치된 Edge 사용) · ffmpeg(libwebp_anim)
//     Playwright가 프로젝트에 없으면 PW 환경변수로 경로를 준다. 예) PW=<npx 캐시>/node_modules/playwright
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const pw = require(process.env.PW || "playwright");
const ROOT = path.resolve(__dirname, "..");
const LIST = JSON.parse(fs.readFileSync(path.join(__dirname, "position-collage.json"), "utf8"));
const OUT = path.join(ROOT, "public/home");

const W = 420; // 호버 이미지 최대 300×400(3:4)의 1.4배
const H = 560;
const FPS = 8;
const SECONDS = 10; // 한 바퀴. 이만큼 지나면 첫 프레임과 같은 자리로 돌아와 끊김 없이 반복된다
const QUALITY = 36;

function page(images) {
  // 열 3개에 번갈아 나눠 담고, 이어 붙임이 보이지 않게 같은 묶음을 세 번 반복한다
  const cols = [[], [], []];
  images.forEach((src, i) => cols[i % 3].push(src));
  const img = (src) => {
    const data = fs.readFileSync(path.join(ROOT, "public", src)).toString("base64");
    return `<img src="data:image/webp;base64,${data}">`;
  };
  const col = (list, i) =>
    `<div class="col" data-dir="${i % 2 ? 1 : -1}">${[0, 1, 2].map(() => `<div class="set">${list.map(img).join("")}</div>`).join("")}</div>`;
  return `<!doctype html><meta charset="utf-8"><style>
    html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;background:#0b0b0c}
    .stage{position:absolute;left:50%;top:50%;width:${Math.round(W * 1.45)}px;display:flex;gap:12px;
      transform:translate(-50%,-50%) rotate(-9deg)}
    .col{flex:1;display:flex;flex-direction:column;will-change:transform}
    .set{display:flex;flex-direction:column;gap:12px;padding-bottom:12px}
    img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:10px;display:block;
      box-shadow:0 6px 18px rgb(0 0 0 / .45)}
    .shade{position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 50%,transparent 55%,rgb(0 0 0 / .45))}
  </style><div class="stage">${cols.map(col).join("")}</div><div class="shade"></div>`;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await pw.chromium.launch({ channel: "msedge" });
  for (const [id, images] of Object.entries(LIST)) {
    if (id.startsWith("_")) continue;
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `collage-${id}-`));
    const p = await browser.newPage({ viewport: { width: W, height: H } });
    await p.setContent(page(images));
    await p.waitForTimeout(300);
    const frames = FPS * SECONDS;
    for (let f = 0; f < frames; f++) {
      await p.evaluate((t) => {
        for (const col of document.querySelectorAll(".col")) {
          const cycle = col.querySelector(".set").offsetHeight; // 묶음 하나 높이만큼 움직이면 제자리
          const dir = Number(col.dataset.dir);
          // 세 묶음 중 가운데 근처만 보이도록 ±반 바퀴 안에서 움직인다
          const y = dir < 0 ? (0.5 - t) * cycle : (t - 0.5) * cycle;
          col.style.transform = `translateY(${y}px)`;
        }
      }, f / frames);
      await p.screenshot({ path: path.join(tmp, `f${String(f).padStart(4, "0")}.png`) });
    }
    await p.close();
    const anim = path.join(OUT, `${id}.webp`);
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(FPS), "-i", path.join(tmp, "f%04d.png"),
      "-c:v", "libwebp_anim", "-loop", "0", "-quality", String(QUALITY), "-compression_level", "6", anim]);
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", path.join(tmp, "f0000.png"), "-c:v", "libwebp",
      "-quality", "75", path.join(OUT, `${id}-still.webp`)]);
    fs.rmSync(tmp, { recursive: true, force: true });
    console.log(id, `${(fs.statSync(anim).size / 1024).toFixed(0)} KB`);
  }
  await browser.close();
})();
