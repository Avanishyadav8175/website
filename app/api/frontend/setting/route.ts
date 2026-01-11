// next config
export const dynamic = "force-dynamic";

// controllers
import { getSetting } from "./controllers";

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
import { type SettingDocument } from "@/common/types/documentation/settings/setting";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<SettingDocument>> => {
  try {
    const document = await getSetting();

    if (!document) {
      return Response<SettingDocument>(notFoundErrorResponse);
    }

    return Response(successData(document));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
