import { generateSearchParams } from "@/common/utils/api/searchParam";
import { type Document } from "mongoose";
import { type Query } from "@/common/types/api/query";
import { type ResponseDataType, type SearchParamsType } from "@/common/types/apiTypes";
import { XApiKey } from "@/common/constants/apiKey";

// route = ADMIN_AUTH_ROUTE
const getAuthRequest = <T extends Document>(route: string) => ({
  register: (data: Partial<T>) => {
    return new Promise<ResponseDataType<T>>(async (resolve, reject) => {
      try {
        const response: Response = await fetch(`${route}/register`, {
          method: "POST",
          headers: { "x-api-key": XApiKey },
          body: JSON.stringify(data)
        });
        const responseData: ResponseDataType<T> = await response.json();

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
    });
  },
  login: (query: Query<T>, data: Partial<T>) => {
    return new Promise<ResponseDataType<T>>(async (resolve, reject) => {
      try {
        const searchParams = generateSearchParams(query as SearchParamsType);
        const URL = `${route}/login${searchParams}`;
        const response: Response = await fetch(URL, {
          method: "POST",
          headers: { "x-api-key": XApiKey },
          body: JSON.stringify(data)
        });
        const responseData: ResponseDataType<T> = await response.json();

        if (response.ok) resolve(responseData);
        else reject(responseData);
      }
      catch (error: any) {
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
    });
  },
  validate: (query: Query<T>) => {
    return new Promise<ResponseDataType<T>>(async (resolve, reject) => {
      try {
        const searchParams = generateSearchParams(query as SearchParamsType);

        const response: Response = await fetch(
          `${route}/validate${searchParams}`,
          {
            method: "GET",
            headers: { "x-api-key": XApiKey }
          }
        );
        const responseData: ResponseDataType<T> = await response.json();

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
    });
  },
  logout: () => {
    return new Promise<ResponseDataType<T>>(async (resolve, reject) => {
      try {
        const response: Response = await fetch(`${route}/logout`, {
          method: "GET",
          headers: { "x-api-key": XApiKey }
        });
        const responseData: ResponseDataType<T> = await response.json();

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
    });
  }
});

export default getAuthRequest;
