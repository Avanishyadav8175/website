export const dynamic = "force-dynamic";

// connection
import connectDB from "@/db/mongoose/connection";

// models
import models from "@/db/mongoose/models";
const { Carts } = models;

import getRazorpay from "@/app/api/payment/razorpay/razorpay";
import { NextRequest, NextResponse } from "next/server";

type OrderIdDataType = {
  cartId: string;
};

const razorpay = getRazorpay();

// handle get order
export const POST = async (
  req: NextRequest
): Promise<NextResponse<{ orderId: string | null }>> => {
  try {
    const { cartId } = (await req.json()) as OrderIdDataType;

    await connectDB();

    const amount = (await Carts.findById(cartId))?.price?.payable || null;

    if (!amount) {
      return NextResponse.json({ orderId: null }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR"
    });

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ orderId: null }, { status: 500 });
  }
};
