// next config
export const dynamic = "force-dynamic";

// controllers
import { getTrendingSearchKeywords } from "../controllers";

// constants
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";

// utils
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type NextRequest } from "next/server";
import { type TrendingSearchKeywordDocument } from "@/common/types/documentation/presets/trendingSearchKeyword";
import { connectRedis, redisClient } from "@/db/redis/redis-client";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<TrendingSearchKeywordDocument[]>> => {
  try {
    await connectRedis();
    let cachedData = await redisClient.get("trending");

    if (!cachedData && cachedData == null) {
      const documents = await getTrendingSearchKeywords();

      if (!documents) {
        return Response<TrendingSearchKeywordDocument[]>(notFoundErrorResponse);
      }

      await redisClient.set("trending", JSON.stringify(documents));

      return Response(successData(documents));
    } else {
      return Response(successData(JSON.parse(cachedData)));
    }
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
