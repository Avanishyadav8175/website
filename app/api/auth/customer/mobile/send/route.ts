// utils
import { Response } from "@/common/utils/api/next";
import { serverErrorResponse } from "@/common/utils/api/error";

// controllers
import { send } from "@/app/api/auth/customer/mobile/controller";

// handlers
// send OTP
export async function POST(req: Request) {
  try {
    // extract data
    const { mobileNumber } = await req.json();

    // OTPLESS operation
    const orderId = await send(mobileNumber);

    if (!orderId) {
      // user error response
      return Response<null>({
        status: 500,
        data: {
          data: null,
          messages: [
            {
              type: "error",
              message: "Couldn't Send OTP try again!"
            }
          ]
        }
      });
    }

    return Response<{
      orderId: string;
    }>({
      status: 200,
      data: {
        data: {
          orderId
        },
        messages: []
      }
    });
  } catch (error: any) {
    console.error("Error Sending OTP on Mobile Number:", error);

    // server error response
    return Response<null>(serverErrorResponse);
  }
}
