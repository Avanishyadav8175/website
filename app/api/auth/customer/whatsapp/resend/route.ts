// utils
import { Response } from "@/common/utils/api/next";
import { serverErrorResponse } from "@/common/utils/api/error";

// controllers
import { resend } from "@/app/api/auth/customer/whatsapp/controller";

// handlers
// send OTP
export async function POST(req: Request) {
  try {
    // extract data
    const { orderId } = await req.json();

    // OTPLESS operation
    const newOrderId = await resend(orderId);

    // invalid credentials *
    if (!newOrderId) {
      // user error response
      return Response<null>({
        status: 500,
        data: {
          data: null,
          messages: [
            {
              type: "error",
              message: "Couldn't Resend OTP, Try Again"
            }
          ]
        }
      });
    }

    // success response
    return Response<{ orderId: string }>({
      status: 200,
      data: {
        data: { orderId: newOrderId },
        messages: [
          {
            type: "success",
            message: `OTP has been Resend`
          }
        ]
      }
    });
  } catch (error: any) {
    console.error("Error Resending OTP with Whatsapp:", error);

    // server error response
    return Response<null>(serverErrorResponse);
  }
}
