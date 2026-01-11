// next config
export const dynamic = "force-dynamic";

// constants
import {
  HOMEPAGE_CACHE_KEY,
  HOMEPAGE_META_CACHE_KEY
} from "@/common/constants/cacheKeys";
import { DOMAIN, X_API_KEY } from "@/common/constants/environmentVariables";

// libraries
import { NextRequest, NextResponse } from "next/server";

// controllers
import { clearCache } from "../controllers";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const response = await clearCache({
      redisKeys: [HOMEPAGE_CACHE_KEY, HOMEPAGE_META_CACHE_KEY],
      nextTags: [HOMEPAGE_CACHE_KEY, HOMEPAGE_META_CACHE_KEY],
      cloudfrontPath: `/`
    });

    if (!response) {
      return NextResponse.json(null, { status: 400 });
    }

    fetch(`${DOMAIN}/api/frontend/homepage`, {
      headers: { "x-api-key": X_API_KEY }
    });
    // fetch(`${DOMAIN}/api/frontend/homepage/meta`, {
    //   headers: { "x-api-key": X_API_KEY }
    // });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
};
