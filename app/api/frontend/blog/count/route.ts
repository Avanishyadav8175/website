// next config
export const dynamic = "force-dynamic";

// controllers
import { getBlogArticlesCount } from "../controllers";

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
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<number>> => {
  try {
    const count = await getBlogArticlesCount();

    if (!count) {
      return Response<number>(notFoundErrorResponse);
    }

    return Response(successData(count));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
