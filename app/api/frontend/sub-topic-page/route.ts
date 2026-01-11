// next config
export const dynamic = "force-dynamic";

// controllers
import { getSubTopicPageSlugs } from "./controllers";

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
import { type SubTopicDocument } from "@/common/types/documentation/pages/subTopic";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<SubTopicDocument[]>> => {
  try {
    const documents = await getSubTopicPageSlugs();

    if (!documents) {
      return Response<SubTopicDocument[]>(notFoundErrorResponse);
    }

    return Response(successData(documents));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
