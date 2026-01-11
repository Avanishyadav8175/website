// next config
export const dynamic = "force-dynamic";

// controllers
import { getTopicPageSlugs } from "./controllers";

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
import { type TopicDocument } from "@/common/types/documentation/pages/topic";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<TopicDocument[]>> => {
  try {
    const documents = await getTopicPageSlugs();

    if (!documents) {
      return Response<TopicDocument[]>(notFoundErrorResponse);
    }

    return Response(successData(documents));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
