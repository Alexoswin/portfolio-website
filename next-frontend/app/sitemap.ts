import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blogs`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogPosts.map((post) => ({
      url: `${siteConfig.url}/blogs/${post.slug}`,
      lastModified: new Date(post.isoDate),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
