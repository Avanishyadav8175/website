// next config
export const dynamic = "force-dynamic";

// constants
import {
  CONTENT_CATEGORY_PAGE_CACHE_KEY,
  CONTENT_CATEGORY_PAGE_CONTENTS_CACHE_KEY,
  CONTENT_CATEGORY_PAGE_META_CACHE_KEY
} from "@/common/constants/cacheKeys";
import { DOMAIN, X_API_KEY } from "@/common/constants/environmentVariables";

// libraries
import { NextRequest, NextResponse } from "next/server";

// controllers
import { clearCache } from "../../controllers";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> => {
  try {
    const { slug } = await params;
    const response = await clearCache({
      redisKeys: [
        `${CONTENT_CATEGORY_PAGE_META_CACHE_KEY}_${slug}`,
        `${CONTENT_CATEGORY_PAGE_CACHE_KEY}_${slug}`,
        `${CONTENT_CATEGORY_PAGE_CONTENTS_CACHE_KEY}_${slug}`
      ],
      nextTags: [
        `${CONTENT_CATEGORY_PAGE_META_CACHE_KEY}_${slug}`,
        `${CONTENT_CATEGORY_PAGE_CACHE_KEY}_${slug}`,
        `${CONTENT_CATEGORY_PAGE_CONTENTS_CACHE_KEY}_${slug}`
      ],
      cloudfrontPath: `/${slug}`
    });

    if (!response) {
      return NextResponse.json(null, { status: 400 });
    }

    fetch(`${DOMAIN}/api/frontend/content-category-page/${slug}/meta`, {
      headers: { "x-api-key": X_API_KEY }
    });
    fetch(`${DOMAIN}/api/frontend/content-category-page/${slug}`, {
      headers: { "x-api-key": X_API_KEY }
    });
    fetch(`${DOMAIN}/api/frontend/content-category-page/${slug}/contents`, {
      headers: { "x-api-key": X_API_KEY }
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
};
