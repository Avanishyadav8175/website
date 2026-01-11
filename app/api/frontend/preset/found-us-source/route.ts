// next config
export const dynamic = "force-dynamic";

// controllers
import { getFoundUsSources } from "./controllers";

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
import { type FoundUsSourceDocument } from "@/common/types/documentation/presets/foundUsSource";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<FoundUsSourceDocument[]>> => {
  try {
    const documents = await getFoundUsSources();

    if (!documents) {
      return Response<FoundUsSourceDocument[]>(notFoundErrorResponse);
    }

    return Response(successData(documents));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
