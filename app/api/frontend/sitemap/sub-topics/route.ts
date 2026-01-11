// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import { getSitemapData } from "./controllers";

// constants
import { SITEMAP_SUB_TOPICS_CACHE_KEY } from "@/common/constants/cacheKeys";

// utils
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type NextRequest } from "next/server";
import { type SitemapData } from "@/common/types/sitemap";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<SitemapData[]>> => {
  try {
    const cachedSitemapData = await getFromRedis<SitemapData[]>({
      key: SITEMAP_SUB_TOPICS_CACHE_KEY
    });

    if (!cachedSitemapData) {
      const sitemapData = await getSitemapData();

      await setToRedis({
        key: SITEMAP_SUB_TOPICS_CACHE_KEY,
        value: sitemapData
      });

      if (!sitemapData) {
        return Response<SitemapData[]>(notFoundErrorResponse);
      }

      return Response(successData(sitemapData));
    } else {
      return Response(successData(cachedSitemapData));
    }
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
