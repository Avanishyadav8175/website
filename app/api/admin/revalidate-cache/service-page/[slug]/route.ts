// next config
export const dynamic = "force-dynamic";

// constants
import {
  CONTENT_PAGE_CACHE_KEY,
  CONTENT_PAGE_META_CACHE_KEY,
  CONTENT_PAGE_REFERENCE_CACHE_KEY
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
    // const referenceSlugs = await getReferenceVariantSlugs({ slug });

    const response = await clearCache({
      redisKeys: [
        `${CONTENT_PAGE_CACHE_KEY}_${slug}`,
        `${CONTENT_PAGE_META_CACHE_KEY}_${slug}`,
        `${CONTENT_PAGE_REFERENCE_CACHE_KEY}_${slug}`
        // ...referenceSlugs.map(
        //   (referenceSlug) =>
        //     `${CONTENT_PAGE_REFERENCE_CACHE_KEY}_${referenceSlug}`
        // )
      ],
      nextTags: [
        `${CONTENT_PAGE_CACHE_KEY}_${slug}`,
        `${CONTENT_PAGE_META_CACHE_KEY}_${slug}`
      ],
      cloudfrontPath: `/s/${slug}`
    });

    if (!response) {
      return NextResponse.json(null, { status: 400 });
    }

    const updateCachePromises = [
      fetch(`${DOMAIN}/api/frontend/content-page/${slug}`, {
        headers: { "x-api-key": X_API_KEY }
      }),
      fetch(`${DOMAIN}/api/frontend/content-page/${slug}/meta`, {
        headers: { "x-api-key": X_API_KEY }
      }),
      fetch(`${DOMAIN}/api/frontend/content-page/${slug}/reference`, {
        headers: { "x-api-key": X_API_KEY }
      })
      // ...referenceSlugs.map((referenceSlug) =>
      //   fetch(
      //     `${DOMAIN}/api/frontend/content-page/${referenceSlug}/reference`,
      //     {
      //       headers: { "x-api-key": X_API_KEY }
      //     }
      //   )
      // )
    ];

    Promise.all(updateCachePromises);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
};
