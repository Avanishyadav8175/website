// constants
import {
  ALL_CACHE_KEY,
  CONTENT_PAGE_CUSTOMIZATION_CACHE_KEY
} from "@/common/constants/cacheKeys";
import { DOMAIN } from "@/common/constants/environmentVariables";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { XApiKey } from "@/common/constants/apiKey";

// types
import { type ContentCustomizationDocument } from "@/common/types/documentation/nestedDocuments/contentCustomization";
import { type ResponseDataType } from "@/common/types/apiTypes";

export const fetchContentPageCustomization = (
  slug: string,
  renderingStrategy?: "SSR" | "ISR"
) => {
  return new Promise<ResponseDataType<ContentCustomizationDocument>>(
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
          `${DOMAIN}/api/frontend/content-page/${slug}/customization`,
          {
            method: "GET",
            headers: { "x-api-key": XApiKey },
            ...(renderingStrategyData && renderingStrategyData.ssr
              ? { cache: "no-store" }
              : {}),
            ...(renderingStrategyData && renderingStrategyData.isr
              ? {
                  next: {
                    tags: [
                      ALL_CACHE_KEY,
                      `${CONTENT_PAGE_CUSTOMIZATION_CACHE_KEY}_${slug}`
                    ]
                  }
                }
              : {})
          }
        );
        const responseData: ResponseDataType<ContentCustomizationDocument> =
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
