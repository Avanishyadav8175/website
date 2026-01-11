// constants
import { SITEMAP_DOMAIN as DOMAIN } from "@/common/constants/environmentVariables";
import { XApiKey } from "@/common/constants/apiKey";

// types
import { type ResponseDataType } from "@/common/types/apiTypes";
import { type SitemapData } from "@/common/types/sitemap";

export const fetchSitemapBlogs = () => {
  return new Promise<ResponseDataType<SitemapData[]>>(
    async (resolve, reject) => {
      try {
        const response: Response = await fetch(
          `${DOMAIN}/api/frontend/sitemap/blogs`,
          {
            method: "GET",
            headers: { "x-api-key": XApiKey },
            next: {
              revalidate: 0
            }
          }
        );
        const responseData: ResponseDataType<SitemapData[]> =
          await response.json();

        if (response.ok) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      } catch (error: any) {
        reject({
          data: null,
          messages: [
            {
              type: "error",
              message: "Response Error"
            }
          ]
        });
      }
    }
  );
};
