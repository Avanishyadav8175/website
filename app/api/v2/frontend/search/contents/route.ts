import { connectRedis, redisClient } from "@/db/redis/redis-client";
import { NextRequest } from "next/server";
import { serverErrorResponse } from "@/common/utils/api/error";
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";
import { APIResponseType } from "@/common/types/apiTypes";
import { getContents } from "./controller";

export const dynamic = "force-dynamic";

const REDIS_KEY_CONTENTS = "search-contents";

const isEmpty = (str: string | null) => (str && str.length > 0 ? false : true);

export const GET = async (
  req: NextRequest
): Promise<
  APIResponseType<{ aiTags: any; categories: any; contents: any }>
> => {
  try {
    await connectRedis();

    const cityIdParam = req.nextUrl.searchParams.get("cityId");
    const cityId =
      !cityIdParam || cityIdParam === "null" ? "base" : cityIdParam;

    let cachedContents = await redisClient.get(
      `${REDIS_KEY_CONTENTS}-${cityId}`
    );
    let contents;

    // CONTENTS =============================
    if (isEmpty(cachedContents)) {
      let contentsFromDb = await getContents({
        cityId: cityId === "base" ? null : cityId
      });

      if (!contentsFromDb) contentsFromDb = [];
      else
        await redisClient.set(
          `${REDIS_KEY_CONTENTS}-${cityId}`,
          JSON.stringify(contentsFromDb)
        );

      contents = contentsFromDb;
    } else contents = JSON.parse(cachedContents as string);

    return Response(successData(contents));
  } catch (error: any) {
    console.error("Error", error);
    return Response<null>(serverErrorResponse);
  }
};
