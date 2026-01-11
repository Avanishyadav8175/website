// utils
import { Response } from "@/common/utils/api/next";
import { serverErrorResponse } from "@/common/utils/api/error";

// controllers
import { identify } from "@/app/api/auth/customer/mobile/controller";

// types
import { type ResponseType } from "@/common/types/apiTypes";

// handlers
// send OTP
export async function POST(req: Request) {
  try {
    // extract data
    const { mobileNumber } = await req.json();

    // OTPLESS operation
    const identificationResponse: ResponseType<
      "registered" | "not-registered"
    > = await identify({ mobileNumber });

    if (!identificationResponse) {
      // user error response
      return Response<{ identification: "not-registered" }>({
        status: 200,
        data: {
          data: { identification: "not-registered" },
          messages: []
        }
      });
    }

    return Response<{
      identification: "registered" | "not-registered";
    }>({
      status: 200,
      data: {
        data: {
          identification: identificationResponse.data.data as
            | "registered"
            | "not-registered"
        },
        messages: []
      }
    });
  } catch (error: any) {
    console.error("Error Identifying with Mobile:", error);

    // server error response
    return Response<null>(serverErrorResponse);
  }
}
