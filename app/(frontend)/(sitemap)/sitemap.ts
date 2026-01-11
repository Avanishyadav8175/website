// config
import { GENERATE_SITEMAP } from "@/config/sitemap";

// constants
import { COMPANY_URL_ENV } from "@/common/constants/environmentVariables"; 
// types
import { type Sitemap } from "@/common/types/sitemap";

export default function Sitemap(): Sitemap {
  if (GENERATE_SITEMAP) {
    return [
      {
        url: COMPANY_URL_ENV,
        changeFrequency: "daily",
        lastModified: new Date().toISOString(),
        priority: 1
      },
      {
        url: `${COMPANY_URL_ENV}/products/sitemap.xml`,
        changeFrequency: "hourly",
        lastModified: new Date().toISOString(),
        priority: 0.9
      },
      {
        url: `${COMPANY_URL_ENV}/categories/sitemap.xml`,
        changeFrequency: "daily",
        lastModified: new Date().toISOString(),
        priority: 0.8
      },
      {
        url: `${COMPANY_URL_ENV}/blogs/sitemap.xml`,
        changeFrequency: "daily",
        lastModified: new Date().toISOString(),
        priority: 0.7
      },
      {
        url: `${COMPANY_URL_ENV}/images/sitemap.xml`,
        changeFrequency: "daily",
        lastModified: new Date().toISOString(),
        priority: 0.6
      }
    ];
  }

  return [];
}
