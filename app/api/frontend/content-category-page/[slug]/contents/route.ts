// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import { getContentCategoryContents } from "../../controllers";

// constants
import { CONTENT_CATEGORY_PAGE_CONTENTS_CACHE_KEY } from "@/common/constants/cacheKeys";

// utils
import { successData } from "@/common/utils/api/data";
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";
import { Response } from "@/common/utils/api/next";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<APIResponseType<ContentDocument[]>> => {
  try {
    const { slug } = await params;
    const cachedDocuments = await getFromRedis<ContentDocument[]>({
      key: `${CONTENT_CATEGORY_PAGE_CONTENTS_CACHE_KEY}_${slug}`
    });

    if (!cachedDocuments) {
      const documents = await getContentCategoryContents({ slug });

      if (!documents) {
        return Response<ContentDocument[]>(notFoundErrorResponse);
      }

      await setToRedis({
        key: `${CONTENT_CATEGORY_PAGE_CONTENTS_CACHE_KEY}_${slug}`,
        value: documents
      });

      return Response(successData(documents));
    } else {
      return Response(successData(cachedDocuments));
    }
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
