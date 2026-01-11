// config
import { GENERATE_SITEMAP } from "@/config/sitemap";

// constants
import { DOMAIN } from "@/common/constants/environmentVariables";

// requests
import { fetchSitemapProducts } from "@/request/sitemap/products";

// types
import { type Sitemap, type SitemapData } from "@/common/types/sitemap";

export default async function Sitemap(): Promise<Sitemap> {
  if (GENERATE_SITEMAP) {
    try {
      const response = await fetchSitemapProducts();

      const sitemapProducts =
        response && response?.data ? (response.data as SitemapData[]) : [];

      const sitemaps: Sitemap = sitemapProducts.map(({ slug, updatedAt }) => ({
        url: `${DOMAIN}/${slug}`,
        lastModified: updatedAt,
        changeFrequency: "monthly",
        priority: 1
      }));

      return sitemaps;
    } catch (error) {
      // Return empty array during build time when API is not available
      console.warn('Sitemap generation failed during build, returning empty sitemap:', error);
      return [];
    }
  }

  return [];
}
