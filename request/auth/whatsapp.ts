// constants
import { DOMAIN } from "@/common/constants/domain";

// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type ResponseDataType } from "@/common/types/apiTypes";
import { XApiKey } from "@/common/constants/apiKey";

export const whatsappSendOTP = ({
  whatsappNumber
}: {
  whatsappNumber: string;
}) => {
  return new Promise<
    ResponseDataType<{
      identification: "registered" | "not-registered";
      orderId: string;
    }>
  >(async (resolve, reject) => {
    try {
      const response: Response = await fetch(
        `${DOMAIN}/api/auth/customer/whatsapp/send`,
        {
          method: "POST",
          headers: { "x-api-key": XApiKey },
          body: JSON.stringify({ whatsappNumber })
        }
      );
      const responseData: ResponseDataType<{
        identification: "registered" | "not-registered";
        orderId: string;
      }> = await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      reject({
        status: null
      });
    }
  });
};

export const whatsappResendOTP = ({ orderId }: { orderId: string }) => {
  return new Promise<
    ResponseDataType<{
      orderId: string;
    }>
  >(async (resolve, reject) => {
    try {
      const response: Response = await fetch(
        `${DOMAIN}/api/auth/customer/whatsapp/resend`,
        {
          method: "POST",
          headers: { "x-api-key": XApiKey },
          body: JSON.stringify({ orderId })
        }
      );
      const responseData: ResponseDataType<{
        orderId: string;
      }> = await response.json();

      if (response.ok) {
        resolve(responseData);
      } else {
        reject(responseData);
      }
    } catch (error: any) {
      reject(null);
    }
  });
};

export const whatsappVerifyOTP = ({
  whatsappNumber,
  orderId,
  otp
}: {
  whatsappNumber: string;
  orderId: string;
  otp: string;
}) => {
  return new Promise<ResponseDataType<CustomerDocument | null>>(
    async (resolve, reject) => {
      try {
        const response: Response = await fetch(
          `${DOMAIN}/api/auth/customer/whatsapp/verify`,
          {
            method: "POST",
            headers: { "x-api-key": XApiKey },
            body: JSON.stringify({ whatsappNumber, orderId, otp })
          }
        );
        const responseData: ResponseDataType<CustomerDocument | null> =
          await response.json();

        if (response.ok) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      } catch (error: any) {
        reject({
          status: null
        });
      }
    }
  );
};
