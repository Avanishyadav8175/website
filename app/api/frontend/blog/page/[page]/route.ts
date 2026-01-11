// next config
export const dynamic = "force-dynamic";

// controllers
import { getBlogPageArticles } from "../../controllers";

// constants
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
  { params }: { params: Promise<{ page: string }> }
): Promise<APIResponseType<BlogArticleDocument[]>> => {
  try {
    const { page } = await params;
    const result = await getBlogPageArticles({ page: Number(page) || 1 });

    if (!result) {
      return Response<BlogArticleDocument[]>(notFoundErrorResponse);
    }

    return Response(successData(result.articles, result.count));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
