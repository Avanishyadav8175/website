import { connectRedis, redisClient } from "@/db/redis/redis-client";
import { NextRequest } from "next/server";
import { getAITags, getContentCategories } from "./controller";
import { serverErrorResponse } from "@/common/utils/api/error";
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";
import { APIResponseType } from "@/common/types/apiTypes";

export const dynamic = "force-dynamic";

/* 
contents dont load with initial load at all
it loads on request using ../contents/route.ts
*/

const REDIS_KEY_AI_TAGS = "search-ai-tags";
const REDIS_KEY_CATEGORIES = "search-categories";

const isEmpty = (str: string | null) => (str && str.length > 0 ? false : true);

export const GET = async (
  req: NextRequest
): Promise<
  APIResponseType<{ aiTags: any; categories: any; contents: any }>
> => {
  try {
    await connectRedis();

    let cachedAiTags = await redisClient.get(REDIS_KEY_AI_TAGS);
    let cachedCategories = await redisClient.get(REDIS_KEY_CATEGORIES);

    let aiTags, categories;

    // AI TAGS =============================
    if (isEmpty(cachedAiTags)) {
      let aiTagsFromDb = await getAITags();

      if (!aiTagsFromDb) aiTagsFromDb = [];
      else
        await redisClient.set(REDIS_KEY_AI_TAGS, JSON.stringify(aiTagsFromDb));

      aiTags = aiTagsFromDb;
    } else aiTags = JSON.parse(cachedAiTags as string);

    // CATEGORIES =============================
    if (isEmpty(cachedCategories)) {
      let categoriesFromDb = await getContentCategories();

      if (!categoriesFromDb) categoriesFromDb = [];
      else
        await redisClient.set(
          REDIS_KEY_CATEGORIES,
          JSON.stringify(categoriesFromDb)
        );

      categories = categoriesFromDb;
    } else categories = JSON.parse(cachedCategories as string);

    return Response(successData({ aiTags, categories }));
  } catch (error: any) {
    console.error("Error", error);
    return Response<null>(serverErrorResponse);
  }
};
