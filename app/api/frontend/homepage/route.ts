// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import { getHomepageLayouts } from "./controllers";

// constants
import { HOMEPAGE_CACHE_KEY } from "@/common/constants/cacheKeys";
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";

// utils
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<HomepageLayoutDocument[]>> => {
  try {
    const cachedDocuments = await getFromRedis<HomepageLayoutDocument[]>({
      key: HOMEPAGE_CACHE_KEY
    });

    if (!cachedDocuments || !cachedDocuments.length) {
      const documents = await getHomepageLayouts();

      if (!documents) {
        return Response<HomepageLayoutDocument[]>(notFoundErrorResponse);
      }

      await setToRedis({
        key: HOMEPAGE_CACHE_KEY,
        value: documents
      });

      return Response(successData(documents));
    } else {
      return Response(successData(cachedDocuments));
    }
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
