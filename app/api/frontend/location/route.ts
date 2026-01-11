// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// constants
import { LOCATION_CACHE_KEY } from "@/common/constants/cacheKeys";

// controllers
import { getCities } from "./controllers";

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
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<CityDocument[]>> => {
  try {
    // Try to get from Redis cache, but don't fail if Redis is unavailable
    let cachedDocuments: CityDocument[] | null = null;
    try {
      cachedDocuments = await getFromRedis<CityDocument[]>({
        key: LOCATION_CACHE_KEY
      });
    } catch (redisError: any) {
      console.warn("Redis cache error (non-fatal):", redisError?.message || redisError);
      // Continue to database query if Redis fails
    }

    if (!cachedDocuments) {
      const documents = await getCities();

      // If getCities returns null, it means there was an error
      // If it returns an empty array, it means no cities found (but query succeeded)
      if (documents === null) {
        return Response<CityDocument[]>(notFoundErrorResponse);
      }

      // Try to cache in Redis, but don't fail if it doesn't work
      try {
        await setToRedis({
          key: LOCATION_CACHE_KEY,
          value: documents
        });
      } catch (redisError: any) {
        console.warn("Redis cache set error (non-fatal):", redisError?.message || redisError);
        // Continue even if caching fails
      }

      return Response(successData(documents));
    } else {
      return Response(successData(cachedDocuments));
    }
  } catch (error: any) {
    console.error("Error in location API:", error);

    return Response<null>(serverErrorResponse);
  }
};
