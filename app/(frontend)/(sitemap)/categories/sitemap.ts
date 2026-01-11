// config
import { GENERATE_SITEMAP } from "@/config/sitemap";

// constants
import { DOMAIN } from "@/common/constants/environmentVariables";

// requests
import { fetchSitemapCategories } from "@/request/sitemap/categories";

// types
import { type Sitemap, type SitemapData } from "@/common/types/sitemap";
import { fetchSitemapTopics } from "@/request/sitemap/topics";
import { fetchSitemapSubTopics } from "@/request/sitemap/subTopics";

export default async function Sitemap(): Promise<Sitemap> {
  if (GENERATE_SITEMAP) {
    try {
      const responseCategory1 = await fetchSitemapCategories();
      const sitemapCategory1 =
        responseCategory1 && responseCategory1?.data ? (responseCategory1.data as SitemapData[]) : [];

      const responseCategory2 = await fetchSitemapTopics();
      const sitemapCategory2 =
        responseCategory2 && responseCategory2?.data ? (responseCategory2.data as SitemapData[]) : [];

      const responseCategory3 = await fetchSitemapSubTopics();
      const sitemapCategory3 =
        responseCategory3 && responseCategory3?.data ? (responseCategory3.data as SitemapData[]) : [];

      const allSitemaps = [
        ...sitemapCategory1,
        ...sitemapCategory2,
        ...sitemapCategory3
      ];

      const sitemap: Sitemap = allSitemaps.map(({ slug, updatedAt }) => ({
        url: `${DOMAIN}/${slug}`,
        lastModified: updatedAt,
        changeFrequency: "monthly",
        priority: 0.9
      }));

      return sitemap;
    } catch (error) {
      // Return empty array during build time when API is not available
      console.warn('Sitemap generation failed during build, returning empty sitemap:', error);
      return [];
    }
  }

  return [];
}
