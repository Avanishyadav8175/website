// next config
export const dynamic = "force-dynamic";

// controllers
import { getBlogArticles } from "./controllers";

// constants
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";

// utils
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<BlogArticleDocument[]>> => {
  try {
    const document = await getBlogArticles();

    if (!document) {
      return Response<BlogArticleDocument[]>(notFoundErrorResponse);
    }

    return Response(successData(document));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
