// next config
export const dynamic = "force-dynamic";

// constants
import {
  SUB_SUB_TOPIC_PAGE_CACHE_KEY,
  SUB_SUB_TOPIC_PAGE_CONTENTS_CACHE_KEY,
  SUB_SUB_TOPIC_PAGE_META_CACHE_KEY
} from "@/common/constants/cacheKeys";
import { DOMAIN, X_API_KEY } from "@/common/constants/environmentVariables";

// libraries
import { NextRequest, NextResponse } from "next/server";

// controllers
import { clearCache } from "../../../../../controllers";

export const GET = async (
  req: NextRequest,
  {
    params
  }: {
    params: Promise<{ categorySlug: string; topicSlug: string; subTopicSlug: string, subSubTopicSlug: string }>;
  }
): Promise<NextResponse> => {
  try {
    const { categorySlug, topicSlug, subTopicSlug, subSubTopicSlug } = await params;
    const response = await clearCache({
      redisKeys: [
        `${SUB_SUB_TOPIC_PAGE_META_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}_${subSubTopicSlug}`,
        `${SUB_SUB_TOPIC_PAGE_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}_${subSubTopicSlug}`,
        `${SUB_SUB_TOPIC_PAGE_CONTENTS_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}_${subSubTopicSlug}`
      ],
      nextTags: [
        `${SUB_SUB_TOPIC_PAGE_META_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}_${subSubTopicSlug}`,
        `${SUB_SUB_TOPIC_PAGE_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}_${subSubTopicSlug}`,
        `${SUB_SUB_TOPIC_PAGE_CONTENTS_CACHE_KEY}_${categorySlug}_${topicSlug}_${subTopicSlug}_${subSubTopicSlug}`
      ],
      cloudfrontPath: `/${categorySlug}/${topicSlug}/${subTopicSlug}/${subSubTopicSlug}`
    });

    if (!response) {
      return NextResponse.json(null, { status: 400 });
    }

    fetch(
      `${DOMAIN}/api/frontend/sub-sub-topic-page/${categorySlug}/${topicSlug}/${subTopicSlug}/${subSubTopicSlug}/meta`,
      {
        headers: { "x-api-key": X_API_KEY }
      }
    );
    fetch(
      `${DOMAIN}/api/frontend/sub-sub-topic-page/${categorySlug}/${topicSlug}/${subTopicSlug}/${subSubTopicSlug}`,
      {
        headers: { "x-api-key": X_API_KEY }
      }
    );
    fetch(
      `${DOMAIN}/api/frontend/sub-sub-topic-page/${categorySlug}/${topicSlug}/${subTopicSlug}/${subSubTopicSlug}/contents`,
      {
        headers: { "x-api-key": X_API_KEY }
      }
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
};
