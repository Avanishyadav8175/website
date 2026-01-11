// next config
export const dynamic = "force-dynamic";

// constants
import { DOMAIN, X_API_KEY } from "@/common/constants/environmentVariables";
import { SITEMAP_SUB_TOPICS_CACHE_KEY } from "@/common/constants/cacheKeys";

// libraries
import { NextRequest, NextResponse } from "next/server";

// controllers
import { clearCache } from "../controllers";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const response = await clearCache({
      redisKeys: [SITEMAP_SUB_TOPICS_CACHE_KEY],
      cloudfrontPath: `/sub-pages/sitemap.xml`
    });

    if (!response) {
      return NextResponse.json(null, { status: 400 });
    }

    fetch(`${DOMAIN}/api/frontend/sitemap/sub-topics`, {
      headers: { "x-api-key": X_API_KEY }
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
};
