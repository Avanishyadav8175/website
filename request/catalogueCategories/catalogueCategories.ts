// constants
import {
  ALL_CACHE_KEY,
  CATALOGUE_CATEGORIES_CACHE_KEY
} from "@/common/constants/cacheKeys";
import { CATALOGUE_CATEGORY_REFRESH_INTERVAL } from "@/common/constants/revalidateIntervals";
import { DOMAIN } from "@/common/constants/environmentVariables";
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";
import { XApiKey } from "@/common/constants/apiKey";

// types
import { type CatalogueCategoryDocument } from "@/common/types/documentation/categories/catalogueCategory";
import { type ResponseDataType } from "@/common/types/apiTypes";

export const fetchCatalogueCategories = (renderingStrategy?: "SSR" | "ISR") => {
  return new Promise<ResponseDataType<CatalogueCategoryDocument[]>>(
    async (resolve, reject) => {
      try {
        const renderingStrategyData = renderingStrategy
          ? renderingStrategy === "SSR"
            ? { ssr: true }
            : { isr: true, revalidate: CATALOGUE_CATEGORY_REFRESH_INTERVAL }
          : RENDERING_STRATEGY === "SSR"
            ? { ssr: true }
            : { isr: true, revalidate: CATALOGUE_CATEGORY_REFRESH_INTERVAL };

        const response: Response = await fetch(
          `${DOMAIN}/api/frontend/catalogue-categories`,
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
                    tags: [ALL_CACHE_KEY, CATALOGUE_CATEGORIES_CACHE_KEY],
                    revalidate: renderingStrategyData.revalidate
                  }
                }
              : {})
          }
        );
        const responseData: ResponseDataType<CatalogueCategoryDocument[]> =
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
