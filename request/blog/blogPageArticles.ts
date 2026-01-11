// constants
import { DOMAIN } from "@/common/constants/environmentVariables";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { BLOG_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// types
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { type ResponseDataType } from "@/common/types/apiTypes";
import { XApiKey } from "@/common/constants/apiKey";

export const fetchBlogPageArticles = (
  page: number,
  renderingStrategy?: "SSR" | "ISR"
) => {
  return new Promise<ResponseDataType<BlogArticleDocument[]>>(
    async (resolve, reject) => {
      try {
        const renderingStrategyData = renderingStrategy
          ? renderingStrategy === "SSR"
            ? { ssr: true }
            : { isr: true, revalidate: BLOG_REFRESH_INTERVAL }
          : RENDERING_STRATEGY === "SSR"
            ? { ssr: true }
            : { isr: true, revalidate: BLOG_REFRESH_INTERVAL };

        const response: Response = await fetch(
          `${DOMAIN}/api/frontend/blog/page/${page}`,
          {
            method: "GET",
            headers: { "x-api-key": XApiKey },
            ...(renderingStrategyData && renderingStrategyData.ssr
              ? { cache: "no-store" }
              : {}),
            ...(renderingStrategyData &&
            renderingStrategyData.isr &&
            renderingStrategyData.revalidate &&
            renderingStrategyData.revalidate > 0
              ? {
                  next: {
                    tags: ["cache"],
                    revalidate: renderingStrategyData.revalidate
                  }
                }
              : {})
          }
        );
        const responseData: ResponseDataType<BlogArticleDocument[]> =
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
