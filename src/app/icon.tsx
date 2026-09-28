import { ImageResponse } from "next/og";

// 브라우저 탭 아이콘: 검은 바탕에 흰 S (create-next-app 기본 favicon 대체)
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#ffffff",
          fontSize: 44,
          fontWeight: 700,
          borderRadius: 14,
        }}
      >
        S
      </div>
    ),
    size,
  );
}
