// next config
export const dynamic = "force-dynamic";

// controllers
import { getBlogCategories } from "../controllers";

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
import { type BlogCategoryDocument } from "@/common/types/documentation/blog/blogCategory";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<BlogCategoryDocument[]>> => {
  try {
    const documents = await getBlogCategories();

    if (!documents) {
      return Response<BlogCategoryDocument[]>(notFoundErrorResponse);
    }

    return Response(successData(documents));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
