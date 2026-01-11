// utils
import {
  badRequestErrorResponse,
  handleError,
  notFoundErrorResponse,
  notUpdatedErrorResponse,
  serverErrorResponse
} from "@/common/utils/api/error";
import getQuery from "@/common/utils/api/getQuery";
import isAsync from "@/common/utils/isAsync";
import { partialSuccessData, successData } from "@/common/utils/api/data";
import withSession from "@/common/utils/api/withSession";

// types
import { type Document, type Model, type UpdateWriteOpResult } from "mongoose";
import {
  SwapOrderType,
  type Middleware,
  type MongooseErrorType,
  type ResponseType,
  type SearchParamsType,
  type SessionMiddleware
} from "@/common/types/apiTypes";
import connectDB from "@/db/mongoose/connection";
import { ToastType } from "@/common/types/toast";

const getController = <
  DocumentT extends Document,
  ModelT extends Model<DocumentT>
>(
  Model: ModelT
) => ({
  getDocuments: async (
    searchParams: SearchParamsType,
    sessionMiddleware?: SessionMiddleware<DocumentT[]>,
    responseDataMiddleware?: Middleware<DocumentT[]>,
    attempt?: number
  ): Promise<ResponseType<DocumentT[]>> => {
    const { filter, sort, offset, limit, select, populate } =
      getQuery(searchParams);

    try {
      // !session behaviour is unpredictable
      // !session is causing error in population
      // const [count, documents] = await withSession<[number, DocumentT[]]>(
      //   [NaN, []],
      //   // @ts-ignore
      //   async (session) => {
      //     const [sessionCount, sessionDocuments] = await Promise.all([
      //       await Model.find(filter).session(session).countDocuments(),
      //       await Model.find(filter)
      //         .skip(offset)
      //         .limit(limit)
      //         .sort(sort)
      //         .select(select)
      //         .populate(populate)
      //         .session(session)
      //     ]);

      //     let newSessionDocuments: DocumentT[] =
      //       sessionDocuments as DocumentT[];

      //     newSessionDocuments = sessionMiddleware
      //       ? isAsync(sessionMiddleware)
      //         ? await sessionMiddleware(newSessionDocuments, session)
      //         : (sessionMiddleware(newSessionDocuments, session) as DocumentT[])
      //       : sessionDocuments;

      //     return [sessionCount, newSessionDocuments];
      //   },
      //   attempt
      // );

      await connectDB();

      const [count, documents] = await Promise.all([
        await Model.find(filter).countDocuments(),
        await Model.find(filter)
          .skip(offset)
          .limit(limit)
          .sort(sort)
          .select(select)
          .populate(populate)
      ]);

      const responseDocuments = responseDataMiddleware
        ? isAsync(responseDataMiddleware)
          ? await responseDataMiddleware(documents)
          : (responseDataMiddleware(documents) as DocumentT[])
        : documents;

      return successData<DocumentT[]>(responseDocuments as DocumentT[], count);
    } catch (error) {
      return handleError(error as MongooseErrorType);
    }
  },
  getDocument: async (
    documentId: string,
    searchParams: SearchParamsType,
    sessionMiddleware?: SessionMiddleware<DocumentT>,
    responseDataMiddleware?: Middleware<DocumentT>,
    attempt?: number
  ): Promise<ResponseType<DocumentT>> => {
    const { filter, select, populate } = getQuery(searchParams, documentId);

    try {
      // !session behaviour is unpredictable
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

      await connectDB();

      const document = await Model.findOne(filter)
        .select(select)
        .populate(populate);

      if (!document) {
        return notFoundErrorResponse;
      }

      const responseDocument = responseDataMiddleware
        ? isAsync(responseDataMiddleware)
          ? await responseDataMiddleware(document)
          : (responseDataMiddleware(document) as DocumentT)
        : document;

      if (!responseDocument) {
        return notFoundErrorResponse;
      }

      return successData<DocumentT>(responseDocument);
    } catch (error: any) {
      return handleError(error as MongooseErrorType);
    }
  },
  addDocuments: async (
    addData: Partial<DocumentT | DocumentT[]>,
    requestDataMiddleware?: Middleware<DocumentT>,
    sessionMiddleware?: SessionMiddleware<DocumentT>,
    responseDataMiddleware?: Middleware<DocumentT>,
    attempt?: number
  ): Promise<ResponseType<DocumentT | (DocumentT | null)[]>> => {
    const addDocument = async (data: Partial<DocumentT>) => {
      try {
        const requestData = requestDataMiddleware
          ? isAsync(requestDataMiddleware)
            ? await requestDataMiddleware(data as DocumentT)
            : (requestDataMiddleware(data as DocumentT) as DocumentT)
          : data;

        if (!requestData) {
          return {
            status: 409,
            data: {
              data: null,
              messages: [
                {
                  type: "error",
                  message: `Already exists`
                } as ToastType
              ]
            }
          };
        }

        const newDocument = new Model(requestData);

        // !session behaviour is unpredictable
        // !session is causing error for multiple upload
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

        await connectDB();

        const document = await newDocument.save();

        if (!document) {
          return badRequestErrorResponse;
        }

        const responseDocument = responseDataMiddleware
          ? isAsync(responseDataMiddleware)
            ? await responseDataMiddleware(document)
            : (responseDataMiddleware(document) as DocumentT)
          : document;

        if (!responseDocument) {
          return badRequestErrorResponse;
        }

        return successData<DocumentT>(responseDocument);
      } catch (error: unknown) {
        return handleError(error as MongooseErrorType);
      }
    };

    if (Array.isArray(addData)) {
      const promises = addData.map(
        async (data) => await addDocument(data as DocumentT)
      );

      const results = await Promise.all(promises);

      const response: ResponseType<(DocumentT | null)[]> = {
        status: 200,
        data: {
          data: [],
          messages: []
        }
      };

      for (let {
        status,
        data: { data, messages }
      } of results) {
        if (status !== 200 && response.status === 200) {
          response.status = 207;
        }

        response.data.data?.push(data as DocumentT | null);
        response.data.messages.push(...messages);
      }

      return response;
    } else {
      return await addDocument(addData);
    }
  },
  updateDocument: async (
    documentId: string,
    searchParams: SearchParamsType,
    updateData: Partial<DocumentT>,
    requestDataMiddleware?: Middleware<DocumentT>,
    sessionMiddleware?: SessionMiddleware<DocumentT>,
    responseDataMiddleware?: Middleware<DocumentT>,
    attempt?: number
  ): Promise<ResponseType<DocumentT>> => {
    const { filter, select, populate } = getQuery(searchParams, documentId);

    try {
      const requestData = requestDataMiddleware
        ? isAsync(requestDataMiddleware)
          ? await requestDataMiddleware(updateData as DocumentT)
          : (requestDataMiddleware(updateData as DocumentT) as DocumentT)
        : updateData;

      // !session behaviour is unpredictable
      // const document = await withSession<DocumentT | null>(
      //   null,
      //   async (session) => {
      //     const sessionDocument = await Model.findOneAndUpdate(
      //       filter,
      //       requestData as Partial<DocumentT>,
      //       {
      //         new: true,
      //         session
      //       }
      //     )
      //       .select(select)
      //       .populate(populate);

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

      await connectDB();

      const document = await Model.findOneAndUpdate(
        filter,
        requestData as Partial<DocumentT>,
        {
          ...("updatedAt" in (requestData as Partial<DocumentT>)
            ? { timestamps: false }
            : {}),
          new: true
        }
      )
        .select(select)
        .populate(populate);

      if (!document) {
        return notFoundErrorResponse;
      }

      const responseDocument = responseDataMiddleware
        ? isAsync(responseDataMiddleware)
          ? await responseDataMiddleware(document)
          : (responseDataMiddleware(document) as DocumentT)
        : document;

      if (!responseDocument) {
        return notFoundErrorResponse;
      }

      return successData<DocumentT>(responseDocument);
    } catch (error) {
      return handleError(error as MongooseErrorType);
    }
  },
  updateDocuments: async (
    searchParams: SearchParamsType,
    updateData: Partial<DocumentT>,
    requestDataMiddleware?: Middleware<DocumentT>,
    attempt?: number
  ): Promise<ResponseType<boolean>> => {
    const { filter } = getQuery(searchParams);

    try {
      const requestData = requestDataMiddleware
        ? isAsync(requestDataMiddleware)
          ? await requestDataMiddleware(updateData as DocumentT)
          : (requestDataMiddleware(updateData as DocumentT) as DocumentT)
        : updateData;

      // !session behaviour is unpredictable
      // const result = await withSession<UpdateWriteOpResult | null>(
      //   null,
      //   async (session) => {
      //     const sessionDocument = await Model.updateMany(
      //       filter,
      //       requestData as Partial<DocumentT>,
      //       {
      //         new: true,
      //         session
      //       }
      //     );

      //     return sessionDocument;
      //   },
      //   attempt
      // );

      await connectDB();

      const result = await Model.updateMany(
        filter,
        requestData as Partial<DocumentT>,
        {
          new: true
        }
      );

      if (!result || !result.modifiedCount) {
        return notUpdatedErrorResponse;
      }

      if (result.modifiedCount !== searchParams.ids?.length) {
        return partialSuccessData<boolean>(false);
      }

      return successData<boolean>(true);
    } catch (error) {
      return handleError(error as MongooseErrorType);
    }
  },
  swapDocumentsOrder: async (
    searchParams: SearchParamsType
  ): Promise<ResponseType<DocumentT[] | null>> => {
    let response: ResponseType<DocumentT[] | null> = badRequestErrorResponse;

    const swapOrder = searchParams.swapOrder;

    if (!swapOrder || !swapOrder.id1 || !swapOrder.id2) {
      return response;
    }

    const session = await (await connectDB()).startSession();

    try {
      // DB query
      await session.withTransaction(async () => {
        const [document1, document2] = await Promise.all([
          Model.findById(swapOrder.id1),
          Model.findById(swapOrder.id2)
        ]);

        if (!document1 || !document2) {
          response = notFoundErrorResponse;
          return;
        }

        // reorder
        const tempOrder1 = "order" in document1 ? document1?.order : null;
        const tempOrder2 = "order" in document2 ? document2?.order : null;

        if (!tempOrder1 || !tempOrder2) {
          response = badRequestErrorResponse;
          return;
        }

        if ("order" in document1 && "order" in document2) {
          [document1.order, document2.order] = [999999998, 999999999];
        }

        // DB update
        await Promise.all([document1.save(), document2.save()]);

        if ("order" in document1 && "order" in document2) {
          [document1.order, document2.order] = [tempOrder2, tempOrder1];
        }

        const updatedDocuments = await Promise.all([
          document1.save(),
          document2.save()
        ]);

        await session.commitTransaction();

        response = successData<DocumentT[]>(updatedDocuments);
      });

      session.endSession();

      return response;
    } catch (error) {
      return handleError(error as MongooseErrorType);
    }
  },
  deleteDocument: async (
    documentId: string,
    searchParams: SearchParamsType,
    sessionMiddleware?: SessionMiddleware<DocumentT>,
    responseDataMiddleware?: Middleware<DocumentT>,
    attempt?: number
  ): Promise<ResponseType<DocumentT>> => {
    const { filter } = getQuery(searchParams, documentId);

    try {
      // !session behaviour is unpredictable
      // const document = await withSession<DocumentT | null>(
      //   null,
      //   async (session) => {
      //     const sessionDocument = await Model.findOneAndDelete(filter, {
      //       new: true,
      //       session
      //     });

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

      await connectDB();

      const document = await Model.findOneAndDelete(filter, {
        new: true
      });

      if (!document) {
        return notFoundErrorResponse;
      }

      const responseDocument = responseDataMiddleware
        ? isAsync(responseDataMiddleware)
          ? await responseDataMiddleware(document)
          : (responseDataMiddleware(document) as DocumentT)
        : document;

      if (!responseDocument) {
        return notFoundErrorResponse;
      }

      return successData<DocumentT>(responseDocument);
    } catch (error) {
      return handleError(error as MongooseErrorType);
    }
  },
  deleteDocuments: async (
    searchParams: SearchParamsType,
    responseDataMiddleware?: Middleware<DocumentT[]>,
    attempt?: number
  ): Promise<ResponseType<boolean>> => {
    const { filter } = getQuery(searchParams);

    try {
      // !session behaviour is unpredictable
      // const result = await withSession<{
      //   acknowledged: boolean;
      //   deletedCount: number;
      // } | null>(
      //   null,
      //   async (session) => {
      //     const sessionDocument = await Model.deleteMany(filter, {
      //       new: true,
      //       session
      //     });

      //     return sessionDocument;
      //   },
      //   attempt
      // );

      await connectDB();

      if (responseDataMiddleware) {
        const documents = await Model.find(filter);

        isAsync(responseDataMiddleware)
          ? await responseDataMiddleware(documents)
          : responseDataMiddleware(documents);
      }

      const result = await Model.deleteMany(filter, {
        new: true
      });

      if (!result || !result.deletedCount) {
        return serverErrorResponse;
      }

      if (result.deletedCount !== searchParams.ids?.length) {
        return partialSuccessData<boolean>(false);
      }

      return successData<boolean>(true);
    } catch (error) {
      return handleError(error as MongooseErrorType);
    }
  }
});

export default getController;
