import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key");
  const VALID_API_KEY = process.env.NEXT_PUBLIC_X_API_KEY || "1tNMPQvO5jA8EgR2sJLI2MGoPKYqgo";

  if (apiKey && apiKey === VALID_API_KEY) {
    return NextResponse.next();
  }

  return NextResponse.json(
    {
      error: "access from unverified source",
      message: "you should not be here",
    },
    { status: 401 }
  );
}

export const config = {
  matcher: "/api/:path*"
};
