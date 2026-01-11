// constants
import {
  ALL_CACHE_KEY,
  SUB_TOPIC_PAGE_CONTENTS_CACHE_KEY
} from "@/common/constants/cacheKeys";
import { DOMAIN } from "@/common/constants/environmentVariables";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { SUB_TOPIC_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";
import { XApiKey } from "@/common/constants/apiKey";

// types
import { type ResponseDataType } from "@/common/types/apiTypes";
import { type SubTopicDocument } from "@/common/types/documentation/pages/subTopic";

export const fetchSubTopicPageData = (
  categorySlug: string,
  topicSlug: string,
  subTopicSlug: string,
  renderingStrategy?: "SSR" | "ISR"
) => {
  return new Promise<ResponseDataType<SubTopicDocument>>(
    async (resolve, reject) => {
      try {
        const renderingStrategyData = renderingStrategy
          ? renderingStrategy === "SSR"
            ? { ssr: true }
            : { isr: true, revalidate: SUB_TOPIC_REFRESH_INTERVAL }
          : RENDERING_STRATEGY === "SSR"
            ? { ssr: true }
            : { isr: true, revalidate: SUB_TOPIC_REFRESH_INTERVAL };

        const response: Response = await fetch(
          `${DOMAIN}/api/frontend/sub-topic-page/${categorySlug}/${topicSlug}/${subTopicSlug}`,
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
                    tags: [
                      ALL_CACHE_KEY,
                      `${SUB_TOPIC_PAGE_CONTENTS_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}`
                    ],
                    revalidate: renderingStrategyData.revalidate
                  }
                }
              : {})
          }
        );
        const responseData: ResponseDataType<SubTopicDocument> =
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
