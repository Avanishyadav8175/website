// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import {
  getSubSubSubTopicPageDetailsI,
  getSubSubSubTopicPageDetailsII
} from "../../../../../controllers";

// constants
import { SUB_SUB_SUB_TOPIC_PAGE_CACHE_KEY } from "@/common/constants/cacheKeys";

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
import { type SubSubSubTopicDocument } from "@/common/types/documentation/pages/subSubSubTopic";

export const GET = async (
  req: NextRequest,
  {
    params: { categorySlug, topicSlug, subTopicSlug, subSubTopicSlug, subSubSubTopicSlug }
  }: {
    params: { categorySlug: string; topicSlug: string; subTopicSlug: string, subSubTopicSlug: string, subSubSubTopicSlug: string };
  }
): Promise<APIResponseType<SubSubSubTopicDocument>> => {
  try {
    const cachedDocument = await getFromRedis<SubSubSubTopicDocument>({
      key: `${SUB_SUB_SUB_TOPIC_PAGE_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}_${subSubTopicSlug}_${subSubSubTopicSlug}`
    });

    if (!cachedDocument) {
      const [i, ii] = await Promise.all([
        getSubSubSubTopicPageDetailsI({ categorySlug, topicSlug, subTopicSlug, subSubTopicSlug, subSubSubTopicSlug }),
        getSubSubSubTopicPageDetailsII({ categorySlug, topicSlug, subTopicSlug, subSubTopicSlug, subSubSubTopicSlug })
      ]);

      if (!i || !ii) {
        return Response<SubSubSubTopicDocument>(notFoundErrorResponse);
      }

      const document = i.toObject() as SubSubSubTopicDocument;

      document._page = ii._page;

      await setToRedis({
        key: `${SUB_SUB_SUB_TOPIC_PAGE_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}_${subSubTopicSlug}_${subSubSubTopicSlug}`,
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
