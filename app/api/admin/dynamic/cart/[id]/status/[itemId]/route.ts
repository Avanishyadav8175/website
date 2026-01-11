// next config
export const dynamic = "force-dynamic";

// libraries
import { NextRequest, NextResponse } from "next/server";

// utils
import { getRequestBody } from "@/common/utils/api/request";
import { updateCartItemStatus } from "./controller";

// type
type STATUS = "new" | "preparing" | "on-the-way" | "completed" | "cancelled";

// methods
export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
): Promise<NextResponse<boolean>> => {
  try {
    const { id, itemId } = await params;
    const updatedStatus = await getRequestBody<STATUS>(req);

    const isUpdated = await updateCartItemStatus({
      cartId: id,
      cartItemId: itemId,
      updatedStatus
    });

    return NextResponse.json(isUpdated, { status: 200 });
  } catch (error: any) {
    console.error("Error", error);

    return NextResponse.json(false, { status: 200 });
  }
};
