// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import { getSubTopicMeta } from "../../../../controllers";

// constants
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";
import { SUB_TOPIC_PAGE_META_CACHE_KEY } from "@/common/constants/cacheKeys";

// utils
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type NextRequest } from "next/server";
import { type SubTopicDocument } from "@/common/types/documentation/pages/subTopic";

export const GET = async (
  req: NextRequest,
  {
    params: { categorySlug, topicSlug, subTopicSlug }
  }: {
    params: { categorySlug: string; topicSlug: string; subTopicSlug: string };
  }
): Promise<APIResponseType<SubTopicDocument>> => {
  try {
    const cachedDocument = await getFromRedis<SubTopicDocument>({
      key: `${SUB_TOPIC_PAGE_META_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}`
    });

    if (!cachedDocument) {
      const document = await getSubTopicMeta({
        categorySlug,
        topicSlug,
        subTopicSlug
      });

      if (!document) {
        return Response<null>(notFoundErrorResponse);
      }

      await setToRedis({
        key: `${SUB_TOPIC_PAGE_META_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}`,
        value: document
      });

      return Response(successData(document));
    } else {
      return Response(successData(cachedDocument));
    }
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
