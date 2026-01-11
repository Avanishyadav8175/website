// next config
export const dynamic = "force-dynamic";

// libraries
import { NextRequest } from "next/server";

// utils
import authCookie from "@/common/utils/api/authCookie";
import { Response } from "@/common/utils/api/next";
import { serverErrorResponse } from "@/common/utils/api/error";

// controllers
import { verify } from "@/app/api/auth/customer/google/controller";

// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type ResponseType } from "@/common/types/apiTypes";

// handlers
// send OTP
export async function POST(req: NextRequest) {
  try {
    // extract data
    const { code } = await req.json();

    // google verification
    const response: ResponseType<CustomerDocument> | null = await verify(code);

    // incorrect OTP
    if (!response) {
      // user error response
      return Response<null>(serverErrorResponse);
    }

    if (response.data.data) {
      authCookie.set({
        name: "__user_auth__",
        payload: { id: response.data.data._id as string },
        expiresIn: 86400
      });
    }

    return Response<CustomerDocument>(response);
  } catch (error: any) {
    console.error("Error Verifying Google:", error);

    // server error response
    return Response<null>(serverErrorResponse);
  }
}
