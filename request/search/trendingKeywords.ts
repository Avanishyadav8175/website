// constants
import { DOMAIN } from "@/common/constants/environmentVariables";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { SEARCH_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";

// types
import { type ResponseDataType } from "@/common/types/apiTypes";
import { type TrendingSearchKeywordDocument } from "@/common/types/documentation/presets/trendingSearchKeyword";
import { XApiKey } from "@/common/constants/apiKey";

export const fetchTrendingKeywords = (renderingStrategy?: "SSR" | "ISR") => {
  return new Promise<ResponseDataType<TrendingSearchKeywordDocument[]>>(
    async (resolve, reject) => {
      try {
        const renderingStrategyData = renderingStrategy
          ? renderingStrategy === "SSR"
            ? { ssr: true }
            : { isr: true, revalidate: SEARCH_REFRESH_INTERVAL }
          : RENDERING_STRATEGY === "SSR"
            ? { ssr: true }
            : { isr: true, revalidate: SEARCH_REFRESH_INTERVAL };

        const response: Response = await fetch(
          `${DOMAIN}/api/frontend/search/trending`,
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
        const responseData: ResponseDataType<TrendingSearchKeywordDocument[]> =
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
