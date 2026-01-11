// constants
import {
  ALL_CACHE_KEY,
  TOPIC_PAGE_CONTENTS_CACHE_KEY
} from "@/common/constants/cacheKeys";
import { DOMAIN } from "@/common/constants/environmentVariables";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { XApiKey } from "@/common/constants/apiKey";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ResponseDataType } from "@/common/types/apiTypes";

export const fetchTopicContents = ({
  categorySlug,
  topicSlug,
  renderingStrategy
}: {
  categorySlug: string;
  topicSlug: string;
  renderingStrategy?: "SSR" | "ISR";
}) => {
  return new Promise<ResponseDataType<ContentDocument[]>>(
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
          `${DOMAIN}/api/frontend/topic-page/${categorySlug}/${topicSlug}/contents`,
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
                      `${TOPIC_PAGE_CONTENTS_CACHE_KEY}_${categorySlug}_${topicSlug}`
                    ]
                  }
                }
              : {})
          }
        );
        const responseData: ResponseDataType<ContentDocument[]> =
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
