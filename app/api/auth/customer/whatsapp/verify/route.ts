// controllers
import { verify } from "@/app/api/auth/customer/whatsapp/controller";
import { CustomerDocument } from "@/common/types/documentation/users/customer";
import authCookie from "@/common/utils/api/authCookie";
import { serverErrorResponse } from "@/common/utils/api/error";
import { Response } from "@/common/utils/api/next";

// handlers
// send OTP
export async function POST(req: Request) {
  try {
    // extract data
    const { whatsappNumber, orderId, otp } = await req.json();

    // OTPLESS operation
    const customer = await verify(whatsappNumber, orderId, otp);

    // incorrect OTP
    if (!customer) {
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

    if (customer) {
      authCookie.set({
        name: "__user_auth__",
        payload: { id: customer._id as string },
        expiresIn: 86400
      });
    }

    return Response<CustomerDocument>({
      status: 200,
      data: {
        data: {
          _id: customer._id,
          name: customer?.name || undefined
        } as CustomerDocument,
        messages: []
      }
    });
  } catch (error: any) {
    console.error("Error Verifying Whatsapp:", error);

    // server error response
    return Response<null>(serverErrorResponse);
  }
}
