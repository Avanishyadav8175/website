export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { resetCloudfrontCache } from "../controller";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const response = await resetCloudfrontCache();

    if (!response) {
      return NextResponse.json(null, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
};
