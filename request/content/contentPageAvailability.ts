// constants
import {
  ALL_CACHE_KEY,
  CONTENT_PAGE_AVAILABILITY_CACHE_KEY
} from "@/common/constants/cacheKeys";
import { DOMAIN } from "@/common/constants/environmentVariables";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { XApiKey } from "@/common/constants/apiKey";

// types
import { type ResponseDataType } from "@/common/types/apiTypes";

export const checkIsContentAvailable = ({
  slug,
  city,
  pincode,
  renderingStrategy
}: {
  slug: string;
  city?: string;
  pincode?: string;
  renderingStrategy?: "SSR" | "ISR";
}) => {
  return new Promise<ResponseDataType<boolean>>(async (resolve, reject) => {
    try {
      const renderingStrategyData = renderingStrategy
        ? renderingStrategy === "SSR"
          ? { ssr: true }
          : { isr: true }
        : RENDERING_STRATEGY === "SSR"
          ? { ssr: true }
          : { isr: true };

      const response: Response = await fetch(
        `${DOMAIN}/api/frontend/content-page/${slug}/availability`,
        {
          method: "POST",
          headers: { "x-api-key": XApiKey },
          body: JSON.stringify({
            city,
            pincode
          }),
          ...(renderingStrategyData && renderingStrategyData.ssr
            ? { cache: "no-store" }
            : {}),
          ...(renderingStrategyData && renderingStrategyData.isr
            ? {
                next: {
                  tags: [
                    ALL_CACHE_KEY,
                    `${CONTENT_PAGE_AVAILABILITY_CACHE_KEY}_${slug}`
                  ]
                }
              }
            : {})
        }
      );
      const responseData: ResponseDataType<boolean> = await response.json();

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
  });
};
