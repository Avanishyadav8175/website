// next config
export const dynamic = "force-dynamic";

// controllers
import { addCart, getCart } from "./controller";

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
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type NextRequest } from "next/server";

export const POST = async (
  req: NextRequest
): Promise<APIResponseType<CartDocument>> => {
  try {
    const addData = (await req.json()) as CartDocument;

    const document = await addCart({ cart: addData });

    if (!document) {
      return Response<CartDocument>(notFoundErrorResponse);
    }

    return Response(successData(document));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
