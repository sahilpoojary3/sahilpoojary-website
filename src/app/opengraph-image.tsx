import { ImageResponse } from "next/og";
import { profile } from "@/config/profile";

export const alt = `${profile.name} — Operations-Focused Business & Management Professional`;
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
          justifyContent: "center",
          padding: "80px",
          background: "#faf8f4",
          color: "#14161a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#1b3a5c",
              color: "#faf8f4",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#5b5f68" }}>
            {profile.location}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 600, lineHeight: 1.1 }}>
          {profile.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#5b5f68",
            marginTop: 28,
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Operations-Focused Business & Management Professional
        </div>
      </div>
    ),
    { ...size }
  );
}
