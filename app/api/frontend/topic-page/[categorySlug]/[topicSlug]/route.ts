// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import { getTopicPageDetailsI, getTopicPageDetailsII } from "../../controllers";

// constants
import { TOPIC_PAGE_CACHE_KEY } from "@/common/constants/cacheKeys";

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
import { type TopicDocument } from "@/common/types/documentation/pages/topic";

export const GET = async (
  req: NextRequest,
  {
    params: { categorySlug, topicSlug }
  }: { params: { categorySlug: string; topicSlug: string } }
): Promise<APIResponseType<TopicDocument>> => {
  try {
    const cachedDocument = await getFromRedis<TopicDocument>({
      key: `${TOPIC_PAGE_CACHE_KEY}_${categorySlug}_${topicSlug}`
    });

    if (!cachedDocument) {
      const [i, ii] = await Promise.all([
        getTopicPageDetailsI({ categorySlug, topicSlug }),
        getTopicPageDetailsII({ categorySlug, topicSlug })
      ]);

      if (!i || !ii) {
        return Response<TopicDocument>(notFoundErrorResponse);
      }

      const document = i.toObject() as TopicDocument;

      document._page = ii._page;

      await setToRedis({
        key: `${TOPIC_PAGE_CACHE_KEY}_${categorySlug}_${topicSlug}`,
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
