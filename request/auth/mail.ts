// constants
import { DOMAIN } from "@/common/constants/domain";

// requests
import {
  customerLogin,
  customerValidate,
  customerLogout,
  customerRegister
} from "./customer";

import { type ResponseDataType } from "@/common/types/apiTypes";
import { XApiKey } from "@/common/constants/apiKey";

export const mailIdentify = ({ mail }: { mail: string }) => {
  return new Promise<
    ResponseDataType<{ status: "registered" | "not-registered" }>
  >(async (resolve, reject) => {
    try {
      const response: Response = await fetch(
        `${DOMAIN}/api/auth/customer/mail/identification`,
        {
          method: "POST",
          headers: { "x-api-key": XApiKey },
          body: JSON.stringify({ mail })
        }
      );
      const responseData: ResponseDataType<{
        status: "registered" | "not-registered";
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

export const mailRegister = customerRegister;

export const mailLogin = customerLogin;

export const mailValidate = customerValidate;

export const mailLogout = customerLogout;
