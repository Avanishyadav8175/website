// next config
export const dynamic = "force-dynamic";

// controllers
import { getCart, updateCart } from "../controller";

// constants
import {
  notFoundErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";

// utils
import { successData } from "@/common/utils/api/data";
import { Response } from "@/common/utils/api/next";

// types
import { type APIResponseType } from "@/common/types/apiTypes";
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
): Promise<APIResponseType<CartDocument>> => {
  try {
    const cart = await getCart({ id });

    if (!cart) {
      return Response<CartDocument>(notFoundErrorResponse);
    }

    return Response(successData(cart));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};

export const PATCH = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
): Promise<APIResponseType<CartDocument>> => {
  try {
    const cart = (await req.json()) as CartDocument;

    const document = await updateCart({ id, cart });

    if (!document) {
      return Response<CartDocument>(notFoundErrorResponse);
    }

    return Response(successData(document));
  } catch (error: any) {
    console.error("Error", error);

    return Response<null>(serverErrorResponse);
  }
};
