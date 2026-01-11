// libraries
import { NextRequest, NextResponse } from "next/server";

// controllers
import { updateOrder } from "../../controller";

// types
import { type OrderPaymentGatewayDocument } from "@/common/types/documentation/nestedDocuments/orderPaymentGateway";

// constants
const ROUTE_SLUG = `/retry-payment/`;

// handle generate order
export const PATCH = async (
  req: NextRequest
): Promise<NextResponse<boolean>> => {
  try {
    // extracting url parameters
    const id: string = req.url.split(ROUTE_SLUG)[1];

    const updateOrderData =
      (await req.json()) as Partial<OrderPaymentGatewayDocument>;

    const isUpdated: boolean = (await updateOrder(
      id,
      updateOrderData
    )) as boolean;

    if (!isUpdated) {
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
