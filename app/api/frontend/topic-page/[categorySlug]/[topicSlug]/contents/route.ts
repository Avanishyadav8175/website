// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import { getTopicPageContents } from "../../../controllers";

// constants
import { TOPIC_PAGE_CONTENTS_CACHE_KEY } from "@/common/constants/cacheKeys";

// utils
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  {
    params: { categorySlug, topicSlug }
  }: { params: { categorySlug: string; topicSlug: string } }
): Promise<APIResponseType<ContentDocument[]>> => {
  try {
    const cachedDocuments = await getFromRedis<ContentDocument[]>({
      key: `${TOPIC_PAGE_CONTENTS_CACHE_KEY}_${categorySlug}_${topicSlug}`
    });

    if (!cachedDocuments) {
      const documents = await getTopicPageContents({ categorySlug, topicSlug });

      if (!documents) {
        return Response<ContentDocument[]>(notFoundErrorResponse);
      }

      await setToRedis({
        key: `${TOPIC_PAGE_CONTENTS_CACHE_KEY}_${categorySlug}_${topicSlug}`,
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
