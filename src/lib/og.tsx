import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/** 공유 미리보기 이미지 공통 설정 (TASK-20) */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// ImageResponse는 woff2를 읽지 못해서 Pretendard의 otf를 씁니다. 빌드할 때 한 번만 읽습니다.
const fontDir = join(process.cwd(), "node_modules/pretendard/dist/public/static");
const fonts = Promise.all([
  readFile(join(fontDir, "Pretendard-Regular.otf")),
  readFile(join(fontDir, "Pretendard-SemiBold.otf")),
]);

/** 검은 배경에 라벨 · 제목 · 설명을 얹은 1200×630 이미지 */
export async function renderOgImage({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  const [regular, semibold] = await fonts;
  const titleSize = title.length > 28 ? 56 : title.length > 16 ? 68 : 84;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#000000",
          color: "#ffffff",
          fontFamily: "Pretendard",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: "0.2em" }}>
          <span style={{ fontWeight: 600 }}>{site.name}</span>
          <span style={{ color: "#51565a", letterSpacing: "0.08em" }}>{eyebrow.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              maxWidth: 1000,
              wordBreak: "keep-all",
            }}
          >
            {title}
          </div>
          {description && (
            <div style={{ fontSize: 30, lineHeight: 1.5, color: "#a3a8ad", maxWidth: 960, wordBreak: "keep-all" }}>{description}</div>
          )}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Pretendard", data: regular, weight: 400, style: "normal" },
        { name: "Pretendard", data: semibold, weight: 600, style: "normal" },
      ],
    },
  );
}
