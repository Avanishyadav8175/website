// utils
import { Response } from "@/common/utils/api/next";
import { serverErrorResponse } from "@/common/utils/api/error";

// controllers
import { verify } from "@/app/api/auth/customer/mobile/controller";

// handlers
// send OTP
export async function POST(req: Request) {
  try {
    // extract data
    const { mobileNumber, orderId, otp } = await req.json();

    // OTPLESS operation
    const isVerified = await verify(mobileNumber, orderId, otp);

    // incorrect OTP
    if (isVerified === null) {
      // user error response
      return Response<null>({
        status: 500,
        data: {
          data: null,
          messages: [
            {
              type: "error",
              message: "Couldn't Verify OTP, Try Again"
            }
          ]
        }
      });
    }

    // incorrect OTP
    if (!isVerified) {
      // user error response
      return Response<null>({
        status: 400,
        data: {
          data: null,
          messages: [
            {
              type: "error",
              message: "Incorrect OTP, Try Again"
            }
          ]
        }
      });
    }

    return Response<boolean>({
      status: 200,
      data: {
        data: isVerified,
        messages: []
      }
    });
  } catch (error: any) {
    console.error("Error Verifying Mobile Number:", error);

    // server error response
    return Response<null>(serverErrorResponse);
  }
}
