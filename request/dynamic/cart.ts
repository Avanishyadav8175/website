// constants
import { DOMAIN } from "@/common/constants/environmentVariables";

// types
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type ResponseDataType } from "@/common/types/apiTypes";
import { XApiKey } from "@/common/constants/apiKey";

export const addCart = (cart: CartDocument) => {
  return new Promise<ResponseDataType<CartDocument>>(
    async (resolve, reject) => {
      try {
        const response: Response = await fetch(`${DOMAIN}/api/frontend/cart`, {
          method: "POST",
          headers: { "x-api-key": XApiKey },
          body: JSON.stringify(cart)
        });
        const responseData: ResponseDataType<CartDocument> =
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

export const fetchCart = (cartId: string) => {
  return new Promise<ResponseDataType<CartDocument>>(
    async (resolve, reject) => {
      try {
        const response: Response = await fetch(
          `${DOMAIN}/api/frontend/cart/${cartId}`,
          {
            headers: { "x-api-key": XApiKey }
          }
        );
        const responseData: ResponseDataType<CartDocument> =
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

export const updateCart = (cartId: string, cart: CartDocument) => {
  return new Promise<ResponseDataType<CartDocument>>(
    async (resolve, reject) => {
      try {
        const response: Response = await fetch(
          `${DOMAIN}/api/frontend/cart/${cartId}`,
          {
            method: "PATCH",
            headers: { "x-api-key": XApiKey },
            body: JSON.stringify(cart)
          }
        );
        const responseData: ResponseDataType<CartDocument> =
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
