// next config
export const dynamic = "force-dynamic";

// controllers
import { getProductRedirects } from "./controllers";

// redis
import { connectRedis, redisClient } from "@/db/redis/redis-client";

// utils
import { NextResponse } from "next/server";

// types
import { type NextRequest } from "next/server";
import { type PermanentRedirect } from "../types";

export const GET = async (
  req: NextRequest
): Promise<NextResponse<PermanentRedirect[]>> => {
  try {
    await connectRedis();

    const cachedRedirects: string | null =
      await redisClient.get(`product_redirects`);

    if (!cachedRedirects || cachedRedirects == " ") {
      const redirects = await getProductRedirects();

      await redisClient.set(`product_redirects`, JSON.stringify(redirects));

      return NextResponse.json(redirects, { status: 200 });
    } else {
      const parsedCachedRedirects = JSON.parse(
        cachedRedirects
      ) as PermanentRedirect[];

      return NextResponse.json(parsedCachedRedirects, { status: 200 });
    }
  } catch (error: any) {
    console.error("Error", error);

    return NextResponse.json([], { status: 200 });
  }
};
