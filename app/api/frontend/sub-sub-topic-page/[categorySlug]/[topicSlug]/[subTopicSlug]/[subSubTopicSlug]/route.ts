// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import {
  getSubSubTopicPageDetailsI,
  getSubSubTopicPageDetailsII
} from "../../../../controllers";

// constants
import { SUB_SUB_TOPIC_PAGE_CACHE_KEY } from "@/common/constants/cacheKeys";

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
import { type SubSubTopicDocument } from "@/common/types/documentation/pages/subSubTopic";

export const GET = async (
  req: NextRequest,
  {
    params: { categorySlug, topicSlug, subTopicSlug, subSubTopicSlug }
  }: {
    params: { categorySlug: string; topicSlug: string; subTopicSlug: string, subSubTopicSlug: string };
  }
): Promise<APIResponseType<SubSubTopicDocument>> => {
  try {
    const cachedDocument = await getFromRedis<SubSubTopicDocument>({
      key: `${SUB_SUB_TOPIC_PAGE_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}_${subSubTopicSlug}`
    });

    if (!cachedDocument) {
      const [i, ii] = await Promise.all([
        getSubSubTopicPageDetailsI({ categorySlug, topicSlug, subTopicSlug, subSubTopicSlug }),
        getSubSubTopicPageDetailsII({ categorySlug, topicSlug, subTopicSlug, subSubTopicSlug })
      ]);

      if (!i || !ii) {
        return Response<SubSubTopicDocument>(notFoundErrorResponse);
      }

      const document = i.toObject() as SubSubTopicDocument;

      document._page = ii._page;

      await setToRedis({
        key: `${SUB_SUB_TOPIC_PAGE_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}_${subSubTopicSlug}`,
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
