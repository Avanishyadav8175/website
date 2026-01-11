// next config
export const dynamic = "force-dynamic";

// controllers
import { getSubSubSubTopicPageSlugs } from "./controllers";

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
import { type SubSubSubTopicDocument } from "@/common/types/documentation/pages/subSubSubTopic";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<SubSubSubTopicDocument[]>> => {
  try {
    const documents = await getSubSubSubTopicPageSlugs();

    if (!documents) {
      return Response<SubSubSubTopicDocument[]>(notFoundErrorResponse);
    }

    return Response(successData(documents));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
