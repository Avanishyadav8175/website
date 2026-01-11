// constants
import { ALL_CACHE_KEY, FOOTER_CACHE_KEY } from "@/common/constants/cacheKeys";
import { DOMAIN } from "@/common/constants/environmentVariables";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { XApiKey } from "@/common/constants/apiKey";

// types
import { type FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";
import { type ResponseDataType } from "@/common/types/apiTypes";

export const fetchFooter = (renderingStrategy?: "SSR" | "ISR") => {
  return new Promise<ResponseDataType<FooterSectionDocument[]>>(
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
          `${DOMAIN}/api/frontend/footer`,
          {
            method: "GET",
            headers: { "x-api-key": XApiKey },
            ...(renderingStrategyData && renderingStrategyData.ssr
              ? { cache: "no-store" }
              : {}),
            ...(renderingStrategyData && renderingStrategyData.isr
              ? {
                  next: {
                    tags: [ALL_CACHE_KEY, FOOTER_CACHE_KEY]
                  }
                }
              : {})
          }
        );
        const responseData: ResponseDataType<FooterSectionDocument[]> =
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
