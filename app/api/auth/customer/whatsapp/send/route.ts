// utils
import { Response } from "@/common/utils/api/next";
import { serverErrorResponse } from "@/common/utils/api/error";

// controllers
import { identify, send } from "@/app/api/auth/customer/whatsapp/controller";

// types
import { type ResponseType } from "@/common/types/apiTypes";

// handlers
// send OTP
export async function POST(req: Request) {
  try {
    // extract data
    const { whatsappNumber } = await req.json();

    // OTPLESS operation
    const identificationResponse: ResponseType<
      "registered" | "not-registered"
    > = await identify({ whatsappNumber });
    const orderId = await send(whatsappNumber);

    if (!identificationResponse) {
      // user error response
      return Response<{ identification: "not-registered"; orderId: string }>({
        status: 200,
        data: {
          data: { identification: "not-registered", orderId },
          messages: []
        }
      });
    }

    return Response<{
      identification: "registered" | "not-registered";
      orderId: string;
    }>({
      status: 200,
      data: {
        data: {
          identification: identificationResponse.data.data as
            | "registered"
            | "not-registered",
          orderId
        },
        messages: []
      }
    });
  } catch (error: any) {
    console.error("Error Identifying/SendOTP with Whatsapp:", error);

    // server error response
    return Response<null>(serverErrorResponse);
  }
}
