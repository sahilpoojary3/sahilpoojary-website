import type { MetadataRoute } from "next";
import { art } from "@/data/art";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sahilpoojary.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/art`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...art.map((piece) => ({
      url: `${siteUrl}/art/${piece.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
