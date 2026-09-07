import { ImageResponse } from "next/og";
import { BRAND_COLORS, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site-config";

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_COLORS.bg,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 20,
            background: BRAND_COLORS.accent,
            marginBottom: 44,
          }}
        >
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="#ffffff"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            color: BRAND_COLORS.ink,
          }}
        >
          {SITE_TITLE}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 32,
            color: "#667085",
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  );
}
