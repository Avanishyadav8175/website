// libraries
import { NextRequest } from "next/server";

// constants
import { successData } from "./data";

// utils
import authCookie from "@/common/utils/api/authCookie";
import { extractSearchParams } from "@/common/utils/api/searchParam";
import getAuthController from "@/common/utils/api/getAuthController";
import { getRequestBody } from "@/common/utils/api/request";
import { Response } from "@/common/utils/api/next";
import {
  serverErrorResponse,
  unauthenticatedErrorResponse
} from "@/common/utils/api/error";

// types
import {
  type APIResponseType,
  type Middleware,
  type ResponseType,
  type SessionMiddleware
} from "@/common/types/apiTypes";
import { type Document, type Model } from "mongoose";

type RegisterHandlerProps<T> = {
  requestDataMiddleware?: Middleware<T>;
  sessionMiddleware?: SessionMiddleware<T>;
  responseDataMiddleware?: Middleware<T>;
  attempt?: number;
};

type LoginHandlerProps<T> = {
  requestDataMiddleware?: Middleware<T>;
  sessionMiddleware?: SessionMiddleware<T>;
  responseDataMiddleware?: Middleware<T>;
  attempt?: number;
};

type ValidateHandlerProps<T> = {
  sessionMiddleware?: SessionMiddleware<T>;
  responseDataMiddleware?: Middleware<T>;
  attempt?: number;
};

const getAuthHandler = <DocumentT extends Document, ModelT extends Model<DocumentT>>({ Model, cookieName: name }: { Model: ModelT; cookieName: string; }) => {
  const { register, login, validate } = getAuthController<DocumentT, ModelT>({ Model });

  return {
    register:
      (args?: RegisterHandlerProps<DocumentT>) =>
        async (req: NextRequest): Promise<APIResponseType<DocumentT | null>> => {
          try {
            const credentials = await getRequestBody<Partial<DocumentT>>(req);

            const response: ResponseType<DocumentT> = await register({
              credentials,
              requestDataMiddleware: args?.requestDataMiddleware,
              sessionMiddleware: args?.sessionMiddleware,
              responseDataMiddleware: args?.responseDataMiddleware,
              attempt: args?.attempt
            });

            if (response.data.data) {
              authCookie.set({
                name,
                payload: { id: response.data.data._id as string },
                expiresIn: 86400
              });
            }

            return Response<DocumentT>(response);
          } catch (error: any) {
            console.error("Error", error);

            return Response<null>(serverErrorResponse);
          }
        },
    login:
      (args?: LoginHandlerProps<DocumentT>) =>
        async (req: NextRequest): Promise<APIResponseType<DocumentT | null>> => {
          try {
            const searchParams = extractSearchParams(req);

            const credentials = await getRequestBody<Partial<DocumentT>>(req);

            const response: ResponseType<DocumentT> = await login({
              searchParams,
              credentials,
              sessionMiddleware: args?.sessionMiddleware,
              responseDataMiddleware: args?.responseDataMiddleware,
              attempt: args?.attempt
            });

            if (response.data.data) {
              authCookie.set({
                name,
                payload: { id: response.data.data._id as string },
                expiresIn: 86400
              });
            }

            return Response<DocumentT>(response);
          } catch (error: any) {
            console.error("Error", error);

            return Response<null>(serverErrorResponse);
          }
        },
    validate:
      (args?: ValidateHandlerProps<DocumentT>) =>
        async (req: NextRequest): Promise<APIResponseType<DocumentT | null>> => {
          try {
            const searchParams = extractSearchParams(req);

            const tokenData = authCookie.get({
              name
            });

            if (!tokenData || !tokenData?.id) {
              authCookie.set({
                name,
                payload: { id: "" },
                expiresIn: -1
              });

              return Response<null>(unauthenticatedErrorResponse);
            }

            const response: ResponseType<DocumentT> = await validate({
              documentId: tokenData.id,
              searchParams,
              sessionMiddleware: args?.sessionMiddleware,
              responseDataMiddleware: args?.responseDataMiddleware,
              attempt: args?.attempt
            });

            return Response<DocumentT>(response);
          } catch (error: any) {
            console.error("Error", error);

            return Response<null>(serverErrorResponse);
          }
        },
    logout:
      () =>
        async (req: NextRequest): Promise<APIResponseType<DocumentT | null>> => {
          try {
            authCookie.set({
              name,
              payload: { id: "" },
              expiresIn: -1
            });

            return Response<null>(successData<null>(null));
          } catch (error: any) {
            console.error("Error", error);

            return Response<null>(serverErrorResponse);
          }
        }
  };
};

export default getAuthHandler;
