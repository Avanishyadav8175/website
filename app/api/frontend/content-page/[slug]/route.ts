// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import {
  getContentPageDetailsI,
  getContentPageDetailsII,
  getContentPageDetailsIII,
  getContentPageDetailsIV,
  getContentPageDetailsV
} from "../controllers";

// constants
import { CONTENT_PAGE_CACHE_KEY } from "@/common/constants/cacheKeys";

// utils
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";
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
    // const cachedDocument = await getFromRedis<ContentDocument>({
    //   key: `${CONTENT_PAGE_CACHE_KEY}_${slug}`
    // });

    // if (!cachedDocument) {
      const [i, ii, iii, iv, v] = await Promise.all([
        getContentPageDetailsI({ slug }),
        getContentPageDetailsII({ slug }),
        getContentPageDetailsIII({ slug }),
        getContentPageDetailsIV({ slug }),
        getContentPageDetailsV({ slug })
      ]);

      if (!i || !ii || !iii || !iv || !v) {
        return Response<ContentDocument>(notFoundErrorResponse);
      }

      const document = i.toObject() as ContentDocument;

      document.availability = ii.availability;
      document.customization = iii.customization;
      document.addons = iii.addons;
      document.variants = iv.variants;
      document._coupons = v._coupons;
      document._suggestions = v._suggestions;

      // await setToRedis({
      //   key: `${CONTENT_PAGE_CACHE_KEY}_${slug}`,
      //   value: document
      // });

      return Response(successData(document));
    // } else {
    //   return Response(successData(cachedDocument));
    // }
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
