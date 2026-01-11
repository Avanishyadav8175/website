// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import { getCatalogueCategories } from "./controllers";

// constants
import { CATALOGUE_CATEGORIES_CACHE_KEY } from "@/common/constants/cacheKeys";

// utils
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type CatalogueCategoryDocument } from "@/common/types/documentation/categories/catalogueCategory";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<CatalogueCategoryDocument[]>> => {
  try {
    const cachedCatalogueCategories = await getFromRedis<
      CatalogueCategoryDocument[]
    >({
      key: CATALOGUE_CATEGORIES_CACHE_KEY
    });

    if (!cachedCatalogueCategories) {
      const catalogueCategories = await getCatalogueCategories();

      if (!catalogueCategories) {
        return Response<CatalogueCategoryDocument[]>(notFoundErrorResponse);
      }

      await setToRedis({
        key: CATALOGUE_CATEGORIES_CACHE_KEY,
        value: catalogueCategories
      });

      return Response(successData(catalogueCategories));
    } else {
      return Response(successData(cachedCatalogueCategories));
    }
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
