import { XApiKey } from "@/common/constants/apiKey";
import { DOMAIN } from "@/common/constants/domain";
import { ResponseDataType } from "@/common/types/apiTypes";
import { CustomerDocument } from "@/common/types/documentation/users/customer";

export const verify = (code: string) => {
  return new Promise<ResponseDataType<CustomerDocument>>(
    async (resolve, reject) => {
      try {
        const response: Response = await fetch(
          `${DOMAIN}/api/auth/customer/google`,
          {
            method: "POST",
            headers: { "x-api-key": XApiKey },
            body: JSON.stringify({ code })
          }
        );
        const responseData: ResponseDataType<CustomerDocument> =
          await response.json();

        if (response.ok) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      } catch (error: any) {
        reject({
          data: null,
          messages: [
            {
              type: "error",
              message: "Response Error"
            }
          ]
        });
      }
    }
  );
};
