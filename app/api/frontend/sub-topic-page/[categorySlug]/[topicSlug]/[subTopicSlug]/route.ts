// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import {
  getSubTopicPageDetailsI,
  getSubTopicPageDetailsII
} from "../../../controllers";

// constants
import { SUB_TOPIC_PAGE_CACHE_KEY } from "@/common/constants/cacheKeys";

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
      key: `${SUB_TOPIC_PAGE_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}`
    });

    if (!cachedDocument) {
      const [i, ii] = await Promise.all([
        getSubTopicPageDetailsI({ categorySlug, topicSlug, subTopicSlug }),
        getSubTopicPageDetailsII({ categorySlug, topicSlug, subTopicSlug })
      ]);

      if (!i || !ii) {
        return Response<SubTopicDocument>(notFoundErrorResponse);
      }

      const document = i.toObject() as SubTopicDocument;

      document._page = ii._page;

      await setToRedis({
        key: `${SUB_TOPIC_PAGE_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}`,
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
