// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import { getMeta } from "../../controllers";

// constants
import { CONTENT_PAGE_META_CACHE_KEY } from "@/common/constants/cacheKeys";
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";

// utils
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params: { slug } }: { params: { slug: string } }
): Promise<APIResponseType<ContentDocument>> => {
  try {
    const cachedDocument = await getFromRedis<ContentDocument>({
      key: `${CONTENT_PAGE_META_CACHE_KEY}_${slug}`
    });

    if (!cachedDocument) {
      const document = await getMeta({ slug });

      if (!document) {
        return Response<null>(notFoundErrorResponse);
      }

      await setToRedis({
        key: `${CONTENT_PAGE_META_CACHE_KEY}_${slug}`,
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
