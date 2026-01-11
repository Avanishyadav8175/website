// next config
export const dynamic = "force-dynamic";

// constants
import {
  DYNAMIC_PAGE_CACHE_KEY,
  DYNAMIC_PAGE_META_CACHE_KEY
} from "@/common/constants/cacheKeys";
import { DOMAIN, X_API_KEY } from "@/common/constants/environmentVariables";

// libraries
import { NextRequest, NextResponse } from "next/server";

// controllers
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";
import { clearCache } from "../../controllers";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<NextResponse> => {
  try {
    const { slug } = await params;
    const response = await clearCache({
      redisKeys: [
        `${DYNAMIC_PAGE_CACHE_KEY}_${slug}`,
        `${DYNAMIC_PAGE_META_CACHE_KEY}_${slug}`
      ],
      nextTags: [
        `${DYNAMIC_PAGE_CACHE_KEY}_${slug}`,
        `${DYNAMIC_PAGE_META_CACHE_KEY}_${slug}`
      ],
      cloudfrontPath: `${FRONTEND_LINKS.DYNAMIC_PAGE}/${slug}`
    });

    if (!response) {
      return NextResponse.json(null, { status: 400 });
    }

    fetch(`${DOMAIN}/api/frontend/dynamic-page/${slug}`, {
      headers: { "x-api-key": X_API_KEY }
    });
    fetch(`${DOMAIN}/api/frontend/dynamic-page/${slug}/meta`, {
      headers: { "x-api-key": X_API_KEY }
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
};
