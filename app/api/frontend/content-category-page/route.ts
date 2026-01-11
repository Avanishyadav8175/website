// next config
export const dynamic = "force-dynamic";

// controllers
import { getContentCategoryPageSlugs } from "./controllers";

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
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<ContentCategoryDocument[]>> => {
  try {
    const documents = await getContentCategoryPageSlugs();

    if (!documents) {
      return Response<ContentCategoryDocument[]>(notFoundErrorResponse);
    }

    return Response(successData(documents));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
