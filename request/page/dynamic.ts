// constants
import {
  ALL_CACHE_KEY,
  DYNAMIC_PAGE_CACHE_KEY
} from "@/common/constants/cacheKeys";
import { DOMAIN } from "@/common/constants/environmentVariables";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { XApiKey } from "@/common/constants/apiKey";

// types
import { type ResponseDataType } from "@/common/types/apiTypes";
import { type DynamicPageDocument } from "@/common/types/documentation/pages/dynamicPage";

export const fetchDynamicPageData = (
  slug: string,
  renderingStrategy?: "SSR" | "ISR"
) => {
  return new Promise<ResponseDataType<DynamicPageDocument>>(
    async (resolve, reject) => {
      try {
        const renderingStrategyData = renderingStrategy
          ? renderingStrategy === "SSR"
            ? { ssr: true }
            : { isr: true }
          : RENDERING_STRATEGY === "SSR"
            ? { ssr: true }
            : { isr: true };

        const response: Response = await fetch(
          `${DOMAIN}/api/frontend/dynamic-page/${slug}`,
          {
            method: "GET",
            headers: { "x-api-key": XApiKey },
            ...(renderingStrategyData && renderingStrategyData.ssr
              ? { cache: "no-store" }
              : {}),
            ...(renderingStrategyData && renderingStrategyData.isr
              ? {
                  next: {
                    tags: [ALL_CACHE_KEY, `${DYNAMIC_PAGE_CACHE_KEY}_${slug}`]
                  }
                }
              : {})
          }
        );
        const responseData: ResponseDataType<DynamicPageDocument> =
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
