// next config
export const dynamic = "force-dynamic";

// libraries
import { get as getFromRedis, set as setToRedis } from "@/db/redis/methods";

// controllers
import { getMeta } from "../../controllers";

// constants
import { BLOG_ARTICLE_PAGE_META_CACHE_KEY } from "@/common/constants/cacheKeys";
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";

// utils
import { successData } from "@/common/utils/api/data";
import { Response } from "@/common/utils/api/next";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
): Promise<APIResponseType<BlogArticleDocument>> => {
  try {
    const { slug } = await params;
    const cachedDocument = await getFromRedis<BlogArticleDocument>({
      key: `${BLOG_ARTICLE_PAGE_META_CACHE_KEY}_${slug}`
    });

    if (!cachedDocument) {
      const document = await getMeta({ slug });

      if (!document) {
        return Response<null>(notFoundErrorResponse);
      }

      await setToRedis({
        key: `${BLOG_ARTICLE_PAGE_META_CACHE_KEY}_${slug}`,
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
