import { ImageResponse } from "next/og";
import { insights } from "@/data/insights";
import { profile } from "@/config/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = insights.find((a) => a.slug === slug);
  const title = article?.title ?? profile.name;
  const category = article?.category ?? "Insights";

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
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#1b3a5c",
              color: "#faf8f4",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8a6d3b", fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>
            {category}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 60, fontWeight: 600, lineHeight: 1.15, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#5b5f68", marginTop: 40 }}>
          {profile.name} — Insights
        </div>
      </div>
    ),
    { ...size }
  );
}
