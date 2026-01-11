// utils
import authCookie from "@/common/utils/api/authCookie";
import { Response } from "@/common/utils/api/next";
import { serverErrorResponse } from "@/common/utils/api/error";

// controllers
import {
  loginOrRegister,
  verify
} from "@/app/api/auth/customer/mobile/controller";

// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";

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

    const customer = await loginOrRegister(mobileNumber);

    // incorrect OTP
    if (!customer) {
      // user error response
      return Response<null>({
        status: 403,
        data: {
          data: null,
          messages: [
            {
              type: "error",
              message: "Account is Blocked!"
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
    console.error("Error Verify and Authenticate Mobile Number:", error);

    // server error response
    return Response<null>(serverErrorResponse);
  }
}
