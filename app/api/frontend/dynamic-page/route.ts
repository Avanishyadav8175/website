export const dynamic = "force-dynamic";

// constants
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";

// utils
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";

import { getDynamicPageSlugs } from "./controllers";
import { DynamicPageDocument } from "@/common/types/documentation/pages/dynamicPage";

export async function GET() {
  try {
    const documents = await getDynamicPageSlugs();

    if (!documents) {
      return Response<DynamicPageDocument[]>(notFoundErrorResponse);
    }

    return Response(successData(documents));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
}
