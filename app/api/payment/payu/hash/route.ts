export const dynamic = "force-dynamic";

// libraries
import crypto from "crypto";

// connection
import connectDB from "@/db/mongoose/connection";

// models
import models from "@/db/mongoose/models";
const { Carts } = models;

// constants
import { PAYU_KEY, PAYU_SALT } from "@/common/constants/environmentVariables";

// utils
import { NextRequest, NextResponse } from "next/server";

type GenerateHashDataType = {
  cartId: string;
  txnid: string;
  productinfo: string;
  firstname: string;
  email: string;
};

// handle get order
export const POST = async (
  req: NextRequest
): Promise<NextResponse<{ hash: string | null }>> => {
  try {
    const { cartId, txnid, productinfo, firstname, email } =
      (await req.json()) as GenerateHashDataType;

    await connectDB();

    const amount = (await Carts.findById(cartId))?.price?.payable || null;

    if (!amount) {
      return NextResponse.json({ hash: null }, { status: 400 });
    }

    const hashString = `${PAYU_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${PAYU_SALT}`;
    const hash = crypto.createHash("sha512").update(hashString).digest("hex");

    return NextResponse.json({ hash }, { status: 200 });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({ hash: null }, { status: 500 });
  }
};
