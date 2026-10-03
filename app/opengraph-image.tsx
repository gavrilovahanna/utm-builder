import { ImageResponse } from "next/og";

export const alt = "UTM Builder — Free UTM URL Generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "72px",
        background: "#0b1020",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "18px", color: "#a5b4fc", fontSize: 28, fontWeight: 700 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "#4f46e5", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>↗</div>
        UTM Builder
      </div>
      <div style={{ marginTop: 44, fontSize: 72, lineHeight: 1.05, fontWeight: 800, letterSpacing: -3 }}>
        Build better campaign URLs.
      </div>
      <div style={{ marginTop: 26, fontSize: 30, color: "#cbd5e1" }}>
        Free UTM generator · QR codes · Local campaign history
      </div>
    </div>,
    size,
  );
}
