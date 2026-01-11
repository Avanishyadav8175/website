// next config
export const dynamic = "force-dynamic";

// libraries
import { NextRequest } from "next/server";

// utils
import { Response } from "@/common/utils/api/next";
import { serverErrorResponse } from "@/common/utils/api/error";

// controllers
import { identify } from "./controller";

// types
import { type ResponseType } from "@/common/types/apiTypes";

// handlers
// send OTP
export async function POST(req: NextRequest) {
  try {
    // extract data
    const { mail } = await req.json();

    const response: ResponseType<{
      status: "registered" | "not-registered";
    }> = await identify({ mail });

    // incorrect OTP
    if (!response) {
      // user error response
      return Response<{ status: "not-registered" }>({
        status: 200,
        data: {
          data: { status: "not-registered" },
          messages: []
        }
      });
    }

    return Response<{ status: "registered" | "not-registered" }>(response);
  } catch (error: any) {
    console.error("Error Identifying with Mail:", error);

    // server error response
    return Response<null>(serverErrorResponse);
  }
}
