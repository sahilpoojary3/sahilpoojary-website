import type { MetadataRoute } from "next";
import { art } from "@/data/art";
import { insights } from "@/data/insights";

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
    {
      url: `${siteUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...insights.map((article) => ({
      url: `${siteUrl}/insights/${article.slug}`,
      lastModified: article.updatedDate ?? article.publishedDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${siteUrl}/author/sahil-poojary`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
