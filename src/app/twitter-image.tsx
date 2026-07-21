import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AnnyFlow — Business Automation & Calling Infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(145deg, #0B1220 0%, #111827 45%, #064E3B 100%)",
          color: "#F8FAFC",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "#052E1C",
            }}
          >
            A
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em" }}>
            AnnyFlow
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              maxWidth: 980,
            }}
          >
            Automation and calling infrastructure, engineered for scale.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(248,250,252,0.72)",
              maxWidth: 820,
              lineHeight: 1.35,
            }}
          >
            Business automation · Phone systems · Outbound dialing
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#34D399",
            fontWeight: 600,
          }}
        >
          annyflow.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
