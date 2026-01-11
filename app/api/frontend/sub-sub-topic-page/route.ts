// next config
export const dynamic = "force-dynamic";

// controllers
import { getSubSubTopicPageSlugs } from "./controllers";

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
import { type SubSubTopicDocument } from "@/common/types/documentation/pages/subSubTopic";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<SubSubTopicDocument[]>> => {
  try {
    const documents = await getSubSubTopicPageSlugs();

    if (!documents) {
      return Response<SubSubTopicDocument[]>(notFoundErrorResponse);
    }

    return Response(successData(documents));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
