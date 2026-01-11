// next config
export const dynamic = "force-dynamic";

// controllers
import { getServiceImage } from "./controllers";

// utils
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";
import { Response } from "@/common/utils/api/next";
import { successData } from "@/common/utils/api/data";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest
): Promise<APIResponseType<ImageDocument>> => {
  try {
    const serviceImage = await getServiceImage();

    if (!serviceImage) {
      return Response<ImageDocument>(notFoundErrorResponse);
    }

    return Response(successData(serviceImage));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
