// libraries
import { NextRequest, NextResponse } from "next/server";

// controllers
import { generateOrder } from "../controller";

// types
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";

// handle generate order
export const POST = async (
  req: NextRequest
): Promise<NextResponse<boolean>> => {
  try {
    const orderData = (await req.json()) as Partial<OrderDocument>;

    const isGenerated: boolean = (await generateOrder(orderData)) as boolean;

    if (!isGenerated) {
      return NextResponse.json(false, {
        status: 400
      });
    }

    return NextResponse.json(true, {
      status: 200
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(false, {
      status: 500
    });
  }
};
