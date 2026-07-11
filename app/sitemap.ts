import type { MetadataRoute } from "next";
import projectsData from "@/data/projects.json";

const BASE_URL = "https://www.delphinassociates.com";

/**
 * Dynamic sitemap — replaces the old hand-maintained public/sitemap.xml.
 * Project detail URLs are generated from data/projects.json, so adding a
 * project automatically adds its URL for Google and Bing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/projects`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/team`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];

  const projectPages: MetadataRoute.Sitemap = (projectsData as Array<{ id: number }>).map(
    (project) => ({
      url: `${BASE_URL}/projects/${project.id}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticPages, ...projectPages];
}
