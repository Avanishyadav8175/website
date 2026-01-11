// next config
export const dynamic = "force-dynamic";

// libraries
import { NextRequest, NextResponse } from "next/server";

// controllers
import { resetRedisCache } from "../controller";

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const response = await resetRedisCache();

    if (!response) {
      return NextResponse.json(null, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(null, { status: 500 });
  }
};
