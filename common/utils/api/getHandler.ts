// libraries
import { NextRequest } from "next/server";

// utils
import { serverErrorResponse } from "@/common/utils/api/error";
import getController from "@/common/utils/api/getController";
import { Response } from "@/common/utils/api/next";
import { getRequestBody } from "@/common/utils/api/request";
import { extractSearchParams } from "@/common/utils/api/searchParam";

// types
import {
  type APIResponseType,
  type Middleware,
  type SessionMiddleware
} from "@/common/types/apiTypes";
import { type Document, type Model } from "mongoose";

type GetDocumentsHandlerProps<T> = {
  sessionMiddleware?: SessionMiddleware<T[]>;
  responseDataMiddleware?: Middleware<T[]>;
  attempt?: number;
};

type GetDocumentHandlerProps<T> = {
  sessionMiddleware?: SessionMiddleware<T>;
  responseDataMiddleware?: Middleware<T>;
  attempt?: number;
};

type AddDocumentsHandlerProps<T> = {
  requestDataMiddleware?: Middleware<T>;
  sessionMiddleware?: SessionMiddleware<T>;
  responseDataMiddleware?: Middleware<T>;
  attempt?: number;
};

type UpdateDocumentHandlerProps<T> = {
  requestDataMiddleware?: Middleware<T>;
  sessionMiddleware?: SessionMiddleware<T>;
  responseDataMiddleware?: Middleware<T>;
  attempt?: number;
};

type UpdateDocumentsHandlerProps<T> = {
  requestDataMiddleware?: Middleware<T>;
  attempt?: number;
};

type DeleteDocumentHandlerProps<T> = {
  sessionMiddleware?: SessionMiddleware<T>;
  responseDataMiddleware?: Middleware<T>;
  attempt?: number;
};

type DeleteDocumentsHandlerProps<T> = {
  responseDataMiddleware?: Middleware<T[]>;
  attempt?: number;
};

const getHandler = <
  DocumentT extends Document,
  ModelT extends Model<DocumentT>
>(
  Model: ModelT
) => {
  const {
    getDocuments,
    getDocument,
    addDocuments,
    updateDocument,
    updateDocuments,
    swapDocumentsOrder,
    deleteDocument,
    deleteDocuments
  } = getController<DocumentT, ModelT>(Model);

  return {
    getDocuments:
      (args?: GetDocumentsHandlerProps<DocumentT>) =>
        async (req: NextRequest): Promise<APIResponseType<DocumentT[]>> => {
          try {
            const searchParams = extractSearchParams(req);

            const response = await getDocuments(
              searchParams,
              args?.sessionMiddleware,
              args?.responseDataMiddleware,
              args?.attempt
            );

            return Response<DocumentT[]>(response);
          } catch (error: any) {
            console.error("Error", error);

            return Response<null>(serverErrorResponse);
          }
        },
    getDocument:
      (args?: GetDocumentHandlerProps<DocumentT>) =>
        async (
          req: NextRequest,
          { params: { id } }: { params: { id: string } }
        ): Promise<APIResponseType<DocumentT>> => {
          try {
            const searchParams = extractSearchParams(req);

            const response = await getDocument(
              id,
              searchParams,
              args?.sessionMiddleware,
              args?.responseDataMiddleware,
              args?.attempt
            );

            return Response<DocumentT>(response);
          } catch (error: any) {
            console.error("Error", error);

            return Response<null>(serverErrorResponse);
          }
        },
    addDocuments:
      (args?: AddDocumentsHandlerProps<DocumentT>) =>
        async (
          req: NextRequest
        ): Promise<APIResponseType<DocumentT | (DocumentT | null)[]>> => {
          try {
            const addData = await getRequestBody<Partial<DocumentT>>(req);

            const response = await addDocuments(
              addData,
              args?.requestDataMiddleware,
              args?.sessionMiddleware,
              args?.responseDataMiddleware,
              args?.attempt
            );

            return Response<DocumentT | (DocumentT | null)[]>(response);
          } catch (error: any) {
            console.error("Error", error);

            return Response<null>(serverErrorResponse);
          }
        },
    updateDocument:
      (args?: UpdateDocumentHandlerProps<DocumentT>) =>
        async (
          req: NextRequest,
          { params: { id } }: { params: { id: string } }
        ): Promise<APIResponseType<DocumentT>> => {
          try {
            const searchParams = extractSearchParams(req);

            const updateData = await getRequestBody<Partial<DocumentT>>(req);

            const response = await updateDocument(
              id,
              searchParams,
              updateData,
              args?.requestDataMiddleware,
              args?.sessionMiddleware,
              args?.responseDataMiddleware,
              args?.attempt
            );

            return Response<DocumentT>(response);
          } catch (error: any) {
            console.error("Error", error);

            return Response<null>(serverErrorResponse);
          }
        },
    updateDocuments:
      (args?: UpdateDocumentsHandlerProps<DocumentT>) =>
        async (req: NextRequest): Promise<APIResponseType<boolean>> => {
          try {
            const searchParams = extractSearchParams(req);

            const updateData = await getRequestBody<Partial<DocumentT>>(req);

            const response = await updateDocuments(
              searchParams,
              updateData,
              args?.requestDataMiddleware,
              args?.attempt
            );

            return Response<boolean>(response);
          } catch (error: any) {
            console.error("Error", error);

            return Response<null>(serverErrorResponse);
          }
        },
    swapDocumentsOrder:
      () =>
        async (
          req: NextRequest
        ): Promise<APIResponseType<DocumentT[] | null>> => {
          try {
            const searchParams = extractSearchParams(req);

            const response = await swapDocumentsOrder(searchParams);

            return Response<DocumentT[] | null>(response);
          } catch (error: any) {
            console.error("Error", error);

            return Response<null>(serverErrorResponse);
          }
        },
    deleteDocument:
      (args?: DeleteDocumentHandlerProps<DocumentT>) =>
        async (
          req: NextRequest,
          { params: { id } }: { params: { id: string } }
        ): Promise<APIResponseType<DocumentT>> => {
          try {
            const searchParams = extractSearchParams(req);

            const response = await deleteDocument(
              id,
              searchParams,
              args?.sessionMiddleware,
              args?.responseDataMiddleware,
              args?.attempt
            );

            return Response<DocumentT>(response);
          } catch (error: any) {
            console.error("Error", error);

            return Response<null>(serverErrorResponse);
          }
        },
    deleteDocuments:
      (args?: DeleteDocumentsHandlerProps<DocumentT>) =>
        async (req: NextRequest): Promise<APIResponseType<boolean>> => {
          try {
            const searchParams = extractSearchParams(req);

            const response = await deleteDocuments(
              searchParams,
              args?.responseDataMiddleware,
              args?.attempt
            );

            return Response<boolean>(response);
          } catch (error: any) {
            console.error("Error", error);

            return Response<null>(serverErrorResponse);
          }
        }
  };
};

export default getHandler;
