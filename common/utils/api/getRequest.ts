// utils
import { generateSearchParams } from "@/common/utils/api/searchParam";

// types
import { type Document } from "mongoose";
import { type Query } from "@/common/types/api/query";
import {
  type ResponseDataType,
  type SearchParamsType
} from "@/common/types/apiTypes";
import { XApiKey } from "@/common/constants/apiKey";

const getRequest = <T extends Document>(route: string) => ({
  fetchDocuments: (
    query: Query<T>,
    renderingStrategy?:
      | { ssr: true; isr?: false }
      | { ssr?: false; isr: true; revalidate: number }
  ) => {
    return new Promise<ResponseDataType<T[]>>(async (resolve, reject) => {
      try {
        const searchParams = generateSearchParams(query as SearchParamsType);

        const response: Response = await fetch(`${route}${searchParams}`, {
          method: "GET",
          headers: { "x-api-key": XApiKey },
          ...(renderingStrategy && renderingStrategy.ssr
            ? { cache: "no-store" }
            : {}),
          ...(renderingStrategy &&
          renderingStrategy.isr &&
          renderingStrategy.revalidate &&
          renderingStrategy.revalidate > 0
            ? {
                next: {
                  // tags: ["cache"],
                  revalidate: renderingStrategy.revalidate
                }
              }
            : {})
        });
        const responseData: ResponseDataType<T[]> = await response.json();

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
  fetchDocument: (
    id: string,
    query: Query<T>,
    renderingStrategy?:
      | { ssr: true; isr?: false }
      | { ssr?: false; isr: true; revalidate: number }
  ) => {
    return new Promise<ResponseDataType<T>>(async (resolve, reject) => {
      try {
        const searchParams = generateSearchParams(query as SearchParamsType);

        const response: Response = await fetch(
          `${route}/${id}${searchParams}`,
          {
            method: "GET",
            headers: { "x-api-key": XApiKey },
            ...(renderingStrategy && renderingStrategy.ssr
              ? { cache: "no-store" }
              : {}),
            ...(renderingStrategy &&
            renderingStrategy.isr &&
            renderingStrategy.revalidate &&
            renderingStrategy.revalidate > 0
              ? {
                  next: {
                    revalidate: renderingStrategy.revalidate
                  }
                }
              : {})
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
  addDocuments: (
    data: Partial<T | T[]>,
    renderingStrategy?:
      | { ssr: true; isr?: false }
      | { ssr?: false; isr: true; revalidate: number }
  ) => {
    return new Promise<ResponseDataType<T>>(async (resolve, reject) => {
      try {
        const response: Response = await fetch(route, {
          method: "POST",
          headers: { "x-api-key": XApiKey },
          body: JSON.stringify(data),
          ...(renderingStrategy && renderingStrategy.ssr
            ? { cache: "no-store" }
            : {}),
          ...(renderingStrategy &&
          renderingStrategy.isr &&
          renderingStrategy.revalidate &&
          renderingStrategy.revalidate > 0
            ? {
                next: {
                  revalidate: renderingStrategy.revalidate
                }
              }
            : {})
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
  updateDocument: (
    id: string,
    query: Query<T>,
    data: Partial<T>,
    renderingStrategy?:
      | { ssr: true; isr?: false }
      | { ssr?: false; isr: true; revalidate: number }
  ) => {
    return new Promise<ResponseDataType<T>>(async (resolve, reject) => {
      try {
        const searchParams = generateSearchParams(query as SearchParamsType);

        const response: Response = await fetch(
          `${route}/${id}${searchParams}`,
          {
            method: "PATCH",
            headers: { "x-api-key": XApiKey },
            body: JSON.stringify(data),
            ...(renderingStrategy && renderingStrategy.ssr
              ? { cache: "no-store" }
              : {}),
            ...(renderingStrategy &&
            renderingStrategy.isr &&
            renderingStrategy.revalidate &&
            renderingStrategy.revalidate > 0
              ? {
                  next: {
                    revalidate: renderingStrategy.revalidate
                  }
                }
              : {})
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
  updateDocuments: (
    query: Query<T>,
    data: Partial<T>,
    renderingStrategy?:
      | { ssr: true; isr?: false }
      | { ssr?: false; isr: true; revalidate: number }
  ) => {
    return new Promise<ResponseDataType<boolean>>(async (resolve, reject) => {
      try {
        const searchParams = generateSearchParams(query as SearchParamsType);

        const response: Response = await fetch(`${route}${searchParams}`, {
          method: "PATCH",
          headers: { "x-api-key": XApiKey },
          body: JSON.stringify(data),
          ...(renderingStrategy && renderingStrategy.ssr
            ? { cache: "no-store" }
            : {}),
          ...(renderingStrategy &&
          renderingStrategy.isr &&
          renderingStrategy.revalidate &&
          renderingStrategy.revalidate > 0
            ? {
                next: {
                  revalidate: renderingStrategy.revalidate
                }
              }
            : {})
        });
        const responseData: ResponseDataType<boolean> = await response.json();

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
  swapDocumentsOrder: (
    query: Query<T>,
    renderingStrategy?:
      | { ssr: true; isr?: false }
      | { ssr?: false; isr: true; revalidate: number }
  ) => {
    return new Promise<ResponseDataType<T[]>>(async (resolve, reject) => {
      try {
        const searchParams = generateSearchParams(query as SearchParamsType);

        const response: Response = await fetch(
          `${route}/order${searchParams}`,
          {
            method: "GET",
            headers: { "x-api-key": XApiKey },
            ...(renderingStrategy && renderingStrategy.ssr
              ? { cache: "no-store" }
              : {}),
            ...(renderingStrategy &&
            renderingStrategy.isr &&
            renderingStrategy.revalidate &&
            renderingStrategy.revalidate > 0
              ? {
                  next: {
                    // tags: ["cache"],
                    revalidate: renderingStrategy.revalidate
                  }
                }
              : {})
          }
        );
        const responseData: ResponseDataType<T[]> = await response.json();

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
  deleteDocument: (
    id: string,
    query: Query<T>,
    renderingStrategy?:
      | { ssr: true; isr?: false }
      | { ssr?: false; isr: true; revalidate: number }
  ) => {
    return new Promise<ResponseDataType<T>>(async (resolve, reject) => {
      try {
        const searchParams = generateSearchParams(query as SearchParamsType);

        const response: Response = await fetch(
          `${route}/${id}${searchParams}`,
          {
            method: "DELETE",
            headers: { "x-api-key": XApiKey },
            ...(renderingStrategy && renderingStrategy.ssr
              ? { cache: "no-store" }
              : {}),
            ...(renderingStrategy &&
            renderingStrategy.isr &&
            renderingStrategy.revalidate &&
            renderingStrategy.revalidate > 0
              ? {
                  next: {
                    revalidate: renderingStrategy.revalidate
                  }
                }
              : {})
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
  deleteDocuments: (
    query: Query<T>,
    renderingStrategy?:
      | { ssr: true; isr?: false }
      | { ssr?: false; isr: true; revalidate: number }
  ) => {
    return new Promise<ResponseDataType<boolean>>(async (resolve, reject) => {
      try {
        const searchParams = generateSearchParams(query as SearchParamsType);

        const response: Response = await fetch(`${route}${searchParams}`, {
          method: "DELETE",
          headers: { "x-api-key": XApiKey },
          ...(renderingStrategy && renderingStrategy.ssr
            ? { cache: "no-store" }
            : {}),
          ...(renderingStrategy &&
          renderingStrategy.isr &&
          renderingStrategy.revalidate &&
          renderingStrategy.revalidate > 0
            ? {
                next: {
                  revalidate: renderingStrategy.revalidate
                }
              }
            : {})
        });
        const responseData: ResponseDataType<boolean> = await response.json();

        if (response.ok) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      } catch (error: any) {
        reject({
          data: null,
          status: [
            {
              type: "error",
              messages: "Response Error"
            }
          ]
        });
      }
    });
  }
});

export default getRequest;
