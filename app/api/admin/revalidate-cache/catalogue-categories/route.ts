// next config
export const dynamic = "force-dynamic";

// constants
import { CATALOGUE_CATEGORIES_CACHE_KEY } from "@/common/constants/cacheKeys";
import { DOMAIN, X_API_KEY } from "@/common/constants/environmentVariables";

// libraries
import { NextRequest, NextResponse } from "next/server";

// controllers
import { clearCache } from "../controllers";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const response = await clearCache({
      redisKeys: [CATALOGUE_CATEGORIES_CACHE_KEY],
      nextTags: [CATALOGUE_CATEGORIES_CACHE_KEY]
      // cloudfrontPath: "/*"
    });

    if (!response) {
      return NextResponse.json(null, { status: 400 });
    }

    fetch(`${DOMAIN}/api/frontend/catalogue-categories`, {
      headers: { "x-api-key": X_API_KEY }
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
};
