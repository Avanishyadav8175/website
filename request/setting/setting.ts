// constants
import { ALL_CACHE_KEY, SETTING_CACHE_KEY } from "@/common/constants/cacheKeys";
import { DOMAIN } from "@/common/constants/environmentVariables";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { SETTING_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";
import { XApiKey } from "@/common/constants/apiKey";

// types
import { type ResponseDataType } from "@/common/types/apiTypes";
import { type SettingDocument } from "@/common/types/documentation/settings/setting";

export const fetchSetting = (renderingStrategy?: "SSR" | "ISR") => {
  return new Promise<ResponseDataType<SettingDocument>>(
    async (resolve, reject) => {
      try {
        const renderingStrategyData = renderingStrategy
          ? renderingStrategy === "SSR"
            ? { ssr: true }
            : { isr: true, revalidate: SETTING_REFRESH_INTERVAL }
          : RENDERING_STRATEGY === "SSR"
            ? { ssr: true }
            : { isr: true, revalidate: SETTING_REFRESH_INTERVAL };

        const response: Response = await fetch(
          `${DOMAIN}/api/frontend/setting`,
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
                    tags: [ALL_CACHE_KEY, SETTING_CACHE_KEY],
                    revalidate: renderingStrategyData.revalidate
                  }
                }
              : {})
          }
        );
        const responseData: ResponseDataType<SettingDocument> =
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
