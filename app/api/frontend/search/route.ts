// next config
export const dynamic = "force-dynamic";

// controllers
import { getAITags, getContentCategories, getContents } from "./controllers";

// constants
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";

// utils
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";

// types
import { type AITagDocument } from "@/common/types/documentation/presets/aiTag";
import { type APIResponseType } from "@/common/types/apiTypes";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type NextRequest } from "next/server";
import { connectRedis, redisClient } from "@/db/redis/redis-client";

export const GET = async (
  req: NextRequest
): Promise<
  APIResponseType<{
    aiTags: AITagDocument[];
    categories: ContentCategoryDocument[];
    contents: ContentDocument[];
  }>
> => {
  try {
    await connectRedis();

    let cachedData = await redisClient.get("search");
    if (!cachedData || cachedData == null) {
      const [aiTags, categories, contents] = await Promise.all([
        getAITags(),
        getContentCategories(),
        getContents()
      ]);

      if (!aiTags || !categories || !contents) {
        return Response<{
          aiTags: AITagDocument[];
          categories: ContentCategoryDocument[];
          contents: ContentDocument[];
        }>(notFoundErrorResponse);
      }

      await redisClient.set(
        "search",
        JSON.stringify({ aiTags, categories, contents })
      );

      return Response(
        successData({
          aiTags,
          categories,
          contents
        })
      );
    } else {
      return Response(
        successData({
          aiTags: JSON.parse(cachedData).aiTags,
          categories: JSON.parse(cachedData).categories,
          contents: JSON.parse(cachedData).contents
        })
      );
    }
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
