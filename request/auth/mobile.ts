// constants
import { DOMAIN } from "@/common/constants/domain";

// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type ResponseDataType } from "@/common/types/apiTypes";
import { XApiKey } from "@/common/constants/apiKey";

export const mobileIdentify = ({ mobileNumber }: { mobileNumber: string }) => {
  return new Promise<
    ResponseDataType<{
      identification: "registered" | "not-registered";
    }>
  >(async (resolve, reject) => {
    try {
      const response: Response = await fetch(
        `${DOMAIN}/api/auth/customer/mobile/identify`,
        {
          method: "POST",
          headers: { "x-api-key": XApiKey },
          body: JSON.stringify({ mobileNumber })
        }
      );
      const responseData: ResponseDataType<{
        identification: "registered" | "not-registered";
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

export const mobileSendOTP = ({ mobileNumber }: { mobileNumber: string }) => {
  return new Promise<
    ResponseDataType<{
      orderId: string;
    }>
  >(async (resolve, reject) => {
    try {
      const response: Response = await fetch(
        `${DOMAIN}/api/auth/customer/mobile/send`,
        {
          method: "POST",
          headers: { "x-api-key": XApiKey },
          body: JSON.stringify({ mobileNumber })
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

export const mobileSendOTPAndIdentify = ({
  mobileNumber
}: {
  mobileNumber: string;
}) => {
  return new Promise<
    ResponseDataType<{
      identification: "registered" | "not-registered";
      orderId: string;
    }>
  >(async (resolve, reject) => {
    try {
      const response: Response = await fetch(
        `${DOMAIN}/api/auth/customer/mobile/send-n-identify`,
        {
          method: "POST",
          headers: { "x-api-key": XApiKey },
          body: JSON.stringify({ mobileNumber })
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
      reject(null);
    }
  });
};

export const mobileResendOTP = ({ orderId }: { orderId: string }) => {
  return new Promise<
    ResponseDataType<{
      orderId: string;
    }>
  >(async (resolve, reject) => {
    try {
      const response: Response = await fetch(
        `${DOMAIN}/api/auth/customer/mobile/resend`,
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

export const mobileVerifyOTP = ({
  mobileNumber,
  orderId,
  otp
}: {
  mobileNumber: string;
  orderId: string;
  otp: string;
}) => {
  return new Promise<ResponseDataType<boolean | null>>(
    async (resolve, reject) => {
      try {
        const response: Response = await fetch(
          `${DOMAIN}/api/auth/customer/mobile/verify`,
          {
            method: "POST",
            headers: { "x-api-key": XApiKey },
            body: JSON.stringify({ mobileNumber, orderId, otp })
          }
        );
        const responseData: ResponseDataType<boolean | null> =
          await response.json();

        if (response.ok) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      } catch (error: any) {
        reject(null);
      }
    }
  );
};

export const mobileVerifyOTPAndAuthenticate = ({
  mobileNumber,
  orderId,
  otp
}: {
  mobileNumber: string;
  orderId: string;
  otp: string;
}) => {
  return new Promise<ResponseDataType<CustomerDocument | null>>(
    async (resolve, reject) => {
      try {
        const response: Response = await fetch(
          `${DOMAIN}/api/auth/customer/mobile/verify-n-authenticate`,
          {
            method: "POST",
            headers: { "x-api-key": XApiKey },
            body: JSON.stringify({ mobileNumber, orderId, otp })
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
        reject(null);
      }
    }
  );
};
