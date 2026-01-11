// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import { getSubSubSubTopicPageContents } from "../../../../../../controllers";

// constants
import { SUB_SUB_SUB_TOPIC_PAGE_CONTENTS_CACHE_KEY } from "@/common/constants/cacheKeys";

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
    params: { categorySlug, topicSlug, subTopicSlug, subSubTopicSlug, subSubSubTopicSlug }
  }: {
    params: { categorySlug: string; topicSlug: string; subTopicSlug: string, subSubTopicSlug: string, subSubSubTopicSlug: string };
  }
): Promise<APIResponseType<ContentDocument[]>> => {
  try {
    const cachedDocuments = await getFromRedis<ContentDocument[]>({
      key: `${SUB_SUB_SUB_TOPIC_PAGE_CONTENTS_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}_${subSubTopicSlug}_${subSubSubTopicSlug}`
    });

    if (!cachedDocuments) {
      const documents = await getSubSubSubTopicPageContents({
        categorySlug,
        topicSlug,
        subTopicSlug,
        subSubTopicSlug,
        subSubSubTopicSlug
      });

      if (!documents) {
        return Response<ContentDocument[]>(notFoundErrorResponse);
      }

      await setToRedis({
        key: `${SUB_SUB_SUB_TOPIC_PAGE_CONTENTS_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}_${subSubTopicSlug}_${subSubSubTopicSlug}`,
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
