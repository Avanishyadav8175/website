import { type MetadataRoute } from "next";

export type Sitemap = MetadataRoute.Sitemap;
export type SitemapData = {
  slug: string;
  updatedAt: string | Date;
};
export type ImageSitemapData = {
  name: string;
  slug: string;
  images: string[];
};
