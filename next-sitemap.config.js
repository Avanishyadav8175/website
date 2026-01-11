/** @type {import('next-sitemap').IConfig} */

const SITEMAP_DOMAIN = process.env.NEXT_PUBLIC_SITEMAP_DOMAIN;
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
const X_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY;

const config = {
  siteUrl: SITEMAP_DOMAIN,
  sitemapBaseFileName: "sitemap",
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  exclude: ["/*"],
  outDir: "./public/images",
  additionalPaths: async (config) => {
    try {
      const result = await fetch(`${SITEMAP_DOMAIN}/api/frontend/sitemap/images`, {
        headers: {
          "x-api-key": X_API_KEY
        },
        next: {
          revalidate: 0
        }
      })
        .then(async (res) => {
          // Check if response is ok and content-type is JSON
          if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
            console.warn('Sitemap images API not available during build, skipping image sitemap generation');
            return [];
          }
          
          const { data } = await res.json();

          if(!data) return [];

          return data.map(({ name, slug, images }) => ({
            loc: `${DOMAIN}/${slug}`,
            images: images.map((href) => ({
              loc: { href },
              caption: name
            }))
          }));
        })
        .catch((error) => {
          console.warn('Sitemap images generation failed during build, skipping:', error?.message || error);
          return [];
        });

      return result;
    } catch (error) {
      console.warn('Sitemap images generation failed during build, skipping:', error?.message || error);
      return [];
    }
  }
};

module.exports = config;
