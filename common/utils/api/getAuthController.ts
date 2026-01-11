// utils
import {
  handleError,
  unauthenticatedErrorResponse
} from "@/common/utils/api/error";
import getQuery from "@/common/utils/api/getQuery";
import isAsync from "@/common/utils/isAsync";
import { successData } from "@/common/utils/api/data";
import withSession from "@/common/utils/api/withSession";

// types
import { type Document, type FilterQuery, type Model } from "mongoose";
import {
  type Middleware,
  type MongooseErrorType,
  type SearchParamsType,
  type SessionMiddleware
} from "@/common/types/apiTypes";
import connectDB from "@/db/mongoose/connection";

const getAuthController = <DocumentT extends Document, ModelT extends Model<DocumentT>>({ Model }: { Model: ModelT; }) => ({
  register: async ({
    credentials,
    requestDataMiddleware,
    sessionMiddleware,
    responseDataMiddleware,
    attempt
  }: {
    credentials: Partial<DocumentT>;
    requestDataMiddleware?: Middleware<DocumentT>;
    sessionMiddleware?: SessionMiddleware<DocumentT>;
    responseDataMiddleware?: Middleware<DocumentT>;
    attempt?: number;
  }) => {
    try {
      await connectDB();

      const requestData = requestDataMiddleware
        ? isAsync(requestDataMiddleware)
          ? await requestDataMiddleware(credentials as DocumentT)
          : (requestDataMiddleware(credentials as DocumentT) as DocumentT)
        : credentials;

      const newDocument = new Model(requestData);

      const document = await newDocument.save();

      // const document = await withSession<DocumentT | null>(
      //   null,
      //   async (session) => {
      //     const sessionDocument = await newDocument.save({ session });

      //     let newSessionDocument: DocumentT = sessionDocument as DocumentT;

      //     newSessionDocument = sessionMiddleware
      //       ? isAsync(sessionMiddleware)
      //         ? await sessionMiddleware(newSessionDocument, session)
      //         : (sessionMiddleware(newSessionDocument, session) as DocumentT)
      //       : newSessionDocument;

      //     return newSessionDocument;
      //   },
      //   attempt
      // );

      if (!document) {
        return unauthenticatedErrorResponse;
      }

      const responseDocument = responseDataMiddleware
        ? isAsync(responseDataMiddleware)
          ? await responseDataMiddleware(document)
          : (responseDataMiddleware(document) as DocumentT)
        : document;

      if (!responseDocument) {
        return unauthenticatedErrorResponse;
      }

      return successData<DocumentT>(responseDocument);
    } catch (error: any) {
      return handleError(error as MongooseErrorType);
    }
  },
  login: async ({
    searchParams,
    credentials,
    sessionMiddleware,
    responseDataMiddleware,
    attempt
  }: {
    searchParams: SearchParamsType;
    credentials: Partial<DocumentT>;
    sessionMiddleware?: SessionMiddleware<DocumentT>;
    responseDataMiddleware?: Middleware<DocumentT>;
    attempt?: number;
  }) => {
    const { select, populate } = getQuery(searchParams);

    try {
      await connectDB();

      const document = await Model.findOne(
        credentials as FilterQuery<DocumentT>
      )
        .select(select)
        .populate(populate);

      console.log({ document });

      if (!document) {
        return unauthenticatedErrorResponse;
      }

      const responseDocument = responseDataMiddleware
        ? isAsync(responseDataMiddleware)
          ? await responseDataMiddleware(document)
          : (responseDataMiddleware(document) as DocumentT)
        : document;

      if (!responseDocument) {
        return unauthenticatedErrorResponse;
      }

      return successData<DocumentT>(responseDocument);
    } catch (error: any) {
      console.log({ error });
      return handleError(error as MongooseErrorType);
    }
  },
  validate: async ({
    documentId,
    searchParams,
    sessionMiddleware,
    responseDataMiddleware,
    attempt
  }: {
    documentId: string;
    searchParams: SearchParamsType;
    sessionMiddleware?: SessionMiddleware<DocumentT>;
    responseDataMiddleware?: Middleware<DocumentT>;
    attempt?: number;
  }) => {
    const { filter, select, populate } = getQuery(searchParams, documentId);

    try {
      await connectDB();

      const document = await Model.findOne(filter)
        .select(select)
        .populate(populate);

      console.log({ document });

      // const document = await withSession<DocumentT | null>(
      //   null,
      //   async (session) => {
      //     const sessionDocument = await Model.findOne(filter)
      //       .select(select)
      //       .populate(populate)
      //       .session(session);

      //     let newSessionDocument: DocumentT = sessionDocument as DocumentT;

      //     newSessionDocument = sessionMiddleware
      //       ? isAsync(sessionMiddleware)
      //         ? await sessionMiddleware(newSessionDocument, session)
      //         : (sessionMiddleware(newSessionDocument, session) as DocumentT)
      //       : newSessionDocument;

      //     return newSessionDocument;
      //   },
      //   attempt
      // );

      if (!document) {
        return unauthenticatedErrorResponse;
      }

      const responseDocument = responseDataMiddleware
        ? isAsync(responseDataMiddleware)
          ? await responseDataMiddleware(document)
          : (responseDataMiddleware(document) as DocumentT)
        : document;

      if (!responseDocument) {
        return unauthenticatedErrorResponse;
      }

      return successData<DocumentT>(responseDocument);
    } catch (error: any) {
      console.log({ error });
      return handleError(error as MongooseErrorType);
    }
  }
});

export default getAuthController;
