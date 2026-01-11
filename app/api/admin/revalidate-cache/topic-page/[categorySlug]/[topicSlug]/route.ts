// next config
export const dynamic = "force-dynamic";

// constants
import {
  TOPIC_PAGE_CACHE_KEY,
  TOPIC_PAGE_CONTENTS_CACHE_KEY,
  TOPIC_PAGE_META_CACHE_KEY
} from "@/common/constants/cacheKeys";
import { DOMAIN, X_API_KEY } from "@/common/constants/environmentVariables";

// libraries
import { NextRequest, NextResponse } from "next/server";

// controllers
import { clearCache } from "../../../controllers";

export const GET = async (
  req: NextRequest,
  {
    params
  }: { params: Promise<{ categorySlug: string; topicSlug: string }> }
): Promise<NextResponse> => {
  try {
    const { categorySlug, topicSlug } = await params;
    const response = await clearCache({
      redisKeys: [
        `${TOPIC_PAGE_META_CACHE_KEY}_${categorySlug}_${topicSlug}`,
        `${TOPIC_PAGE_CACHE_KEY}_${categorySlug}_${topicSlug}`,
        `${TOPIC_PAGE_CONTENTS_CACHE_KEY}_${categorySlug}_${topicSlug}`
      ],
      nextTags: [
        `${TOPIC_PAGE_META_CACHE_KEY}_${categorySlug}_${topicSlug}`,
        `${TOPIC_PAGE_CACHE_KEY}_${categorySlug}_${topicSlug}`,
        `${TOPIC_PAGE_CONTENTS_CACHE_KEY}_${categorySlug}_${topicSlug}`
      ],
      cloudfrontPath: `/${categorySlug}/${topicSlug}`
    });

    if (!response) {
      return NextResponse.json(null, { status: 400 });
    }

    fetch(
      `${DOMAIN}/api/frontend/topic-page/${categorySlug}/${topicSlug}/meta`,
      {
        headers: { "x-api-key": X_API_KEY }
      }
    );
    fetch(`${DOMAIN}/api/frontend/topic-page/${categorySlug}/${topicSlug}`, {
      headers: { "x-api-key": X_API_KEY }
    });
    fetch(
      `${DOMAIN}/api/frontend/topic-page/${categorySlug}/${topicSlug}/contents`,
      {
        headers: { "x-api-key": X_API_KEY }
      }
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
};
