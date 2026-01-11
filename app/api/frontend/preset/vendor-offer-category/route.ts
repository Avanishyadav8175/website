// next config
export const dynamic = "force-dynamic";

// controllers
import { getVendorOfferCategories } from "./controllers";

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
import { type VendorOfferCategoryDocument } from "@/common/types/documentation/presets/vendorOfferCategory";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<VendorOfferCategoryDocument[]>> => {
  try {
    const documents = await getVendorOfferCategories();

    if (!documents) {
      return Response<VendorOfferCategoryDocument[]>(notFoundErrorResponse);
    }

    return Response(successData(documents));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
