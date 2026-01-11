import { type Document as MongooseDocument } from "mongoose";
import { type DocumentKeyOptions } from "@/common/types/utils";
import { type PayloadAction } from "@reduxjs/toolkit";
import { type ResponseDataType } from "@/common/types/apiTypes";
import { type SliceState } from "@/common/types/redux/redux";
import { type ToastType } from "@/common/types/toast";
import { type Draft, type WritableDraft } from "immer";

const getThunkReducers = <Document extends MongooseDocument>({
  select
}: {
  select: DocumentKeyOptions<Document>;
}) => {
  const handlePending = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<any>
  ) => {
    state.status = "pending";
  };

  const handleRejected = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<undefined | ToastType[]>
  ) => {
    state.status = "rejected";

    state.notifications.push(...(action?.payload || []));
  };

  const handleFetchDocumentList = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<ResponseDataType<Document[]>>
  ) => {
    state.status = "fulfilled";

    state.documentList = action.payload.data as WritableDraft<Document[]>;
    state.documents = [];
  };

  const handleFetchDocument = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<ResponseDataType<Document>>
  ) => {
    state.status = "fulfilled";

    state.documents.push(action.payload.data as Draft<Document>);
  };

  const handleFetchDocuments = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<ResponseDataType<Document[]>>
  ) => {
    state.status = "fulfilled";

    state.documents = action.payload.data as WritableDraft<Document[]>;
  };

  const handleAddDocuments = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<ResponseDataType<Document | Document[]>>
  ) => {
    state.status = "fulfilled";

    if (Array.isArray(action.payload.data)) {
      state.documentList.push(
        ...((action.payload.data as Document[])
          .filter((newDocument) => newDocument)
          .map((newDocument) => {
            const documentListItem = { _id: newDocument._id } as Document;

            for (let key of select) {
              let validKey = key.toString();

              if (validKey.includes(".")) {
                validKey = validKey.split(".")[0];
              }

              // @ts-ignore
              documentListItem[validKey] = newDocument[validKey];
            }

            return documentListItem;
          }) as WritableDraft<Document[]>)
      );

      state.documents.push(
        ...((action.payload.data as Document[]).filter(
          (newDocument) => newDocument
        ) as WritableDraft<Document[]>)
      );

      const addedCount = action?.payload.data.filter((item) => item).length;

      state.notifications.push(...(action?.payload.messages || []), {
        type: addedCount ? "success" : "error",
        message: `${addedCount ? "" : "Not "}Added!${action?.payload.data.length > 1 ? ` (${action?.payload.data.filter((item) => item).length}/${action.payload.data.length})` : ""}`
      });
    } else {
      state.documentList.push(
        ...([action.payload.data as Document].map((newDocument) => {
          const documentListItem = { _id: newDocument._id } as Document;

          for (let key of select) {
            let validKey = key.toString();

            if (validKey.includes(".")) {
              validKey = validKey.split(".")[0];
            }

            // @ts-ignore
            documentListItem[validKey] = newDocument[validKey];
          }

          return documentListItem;
        }) as WritableDraft<Document[]>)
      );

      state.documents.push(action.payload.data as Draft<Document>);
      state.notifications.push({ type: "success", message: "Added!" });
    }
  };

  const handleUpdateDocument = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<ResponseDataType<Document>>
  ) => {
    state.status = "fulfilled";

    const newDocument = action.payload.data as Draft<Document>;

    state.documents = [...state.documents].map((document) =>
      document._id === newDocument._id ? newDocument : document
    );

    const existingListItem = state.documentList.find(
      (document) => document._id === newDocument._id
    );

    if (existingListItem) {
      for (let key of select) {
        let validKey = key.toString();

        if (validKey.includes(".")) {
          validKey = validKey.split(".")[0];
        }

        // @ts-ignore
        existingListItem[validKey] = newDocument[validKey];
      }
    }

    state.notifications.push({ type: "success", message: "Updated!" });
  };

  const handleActivateDocument = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<ResponseDataType<Document>>
  ) => {
    state.status = "fulfilled";

    const { _id } = action.payload.data as Document;

    const existingItem = state.documents.find(
      (document) => document._id === _id
    );

    if (existingItem) {
      (existingItem as Draft<Document> & { isActive: boolean }).isActive = true;
    }

    const existingListItem = state.documentList.find(
      (document) => document._id === _id
    );

    if (existingListItem) {
      (existingListItem as Draft<Document> & { isActive: boolean }).isActive =
        true;
    }

    state.notifications.push({ type: "success", message: "Activated!" });
  };

  const handleActivateDocuments = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<{
      documentIds: string[];
      response: ResponseDataType<boolean>;
    }>
  ) => {
    state.status = "fulfilled";

    const { documentIds, response } = action.payload;

    if (response.data) {
      documentIds.forEach((_id) => {
        const existingItem = state.documents.find(
          (document) => document._id === _id
        );

        if (existingItem) {
          (existingItem as Draft<Document> & { isActive: boolean }).isActive =
            true;
        }

        const existingListItem = state.documentList.find(
          (document) => document._id === _id
        );

        if (existingListItem) {
          (
            existingListItem as Draft<Document> & { isActive: boolean }
          ).isActive = true;
        }
      });
    }

    state.notifications.push({ type: "success", message: "Activated!" });
  };

  const handleDeactivateDocument = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<ResponseDataType<Document>>
  ) => {
    state.status = "fulfilled";

    const { _id } = action.payload.data as Document;

    const existingItem = state.documents.find(
      (document) => document._id === _id
    );

    if (existingItem) {
      (existingItem as Draft<Document> & { isActive: boolean }).isActive =
        false;
    }

    const existingListItem = state.documentList.find(
      (document) => document._id === _id
    );

    if (existingListItem) {
      (existingListItem as Draft<Document> & { isActive: boolean }).isActive =
        false;
    }

    state.notifications.push({ type: "success", message: "Deactivated!" });
  };

  const handleDeactivateDocuments = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<{
      documentIds: string[];
      response: ResponseDataType<boolean>;
    }>
  ) => {
    state.status = "fulfilled";

    const { documentIds, response } = action.payload;

    if (response.data) {
      documentIds.forEach((_id) => {
        const existingItem = state.documents.find(
          (document) => document._id === _id
        );

        if (existingItem) {
          (existingItem as Draft<Document> & { isActive: boolean }).isActive =
            false;
        }

        const existingListItem = state.documentList.find(
          (document) => document._id === _id
        );

        if (existingListItem) {
          (
            existingListItem as Draft<Document> & { isActive: boolean }
          ).isActive = false;
        }
      });
    }

    state.notifications.push({ type: "success", message: "Deactivated!" });
  };

  const handleTrashDocument = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<ResponseDataType<Document>>
  ) => {
    state.status = "fulfilled";

    const { _id } = action.payload.data as Document;

    const existingItem = state.documents.find(
      (document) => document._id === _id
    );

    if (existingItem) {
      (existingItem as Draft<Document> & { isActive: boolean }).isActive =
        false;
      (existingItem as Draft<Document> & { isDeleted: boolean }).isDeleted =
        true;
    }

    const existingListItem = state.documentList.find(
      (document) => document._id === _id
    );

    if (existingListItem) {
      (existingListItem as Draft<Document> & { isActive: boolean }).isActive =
        false;
      (existingListItem as Draft<Document> & { isDeleted: boolean }).isDeleted =
        true;
    }

    state.notifications.push({ type: "success", message: "Trashed!" });
  };

  const handleTrashDocuments = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<{
      documentIds: string[];
      response: ResponseDataType<boolean>;
    }>
  ) => {
    state.status = "fulfilled";

    const { documentIds, response } = action.payload;

    if (response.data) {
      documentIds.forEach((_id) => {
        const existingItem = state.documents.find(
          (document) => document._id === _id
        );

        if (existingItem) {
          (existingItem as Draft<Document> & { isActive: boolean }).isActive =
            false;
          (existingItem as Draft<Document> & { isDeleted: boolean }).isDeleted =
            true;
        }

        const existingListItem = state.documentList.find(
          (document) => document._id === _id
        );

        if (existingListItem) {
          (
            existingListItem as Draft<Document> & { isActive: boolean }
          ).isActive = false;
          (
            existingListItem as Draft<Document> & { isDeleted: boolean }
          ).isDeleted = true;
        }
      });
    }

    state.notifications.push({ type: "success", message: "Trashed!" });
  };

  const handleRestoreDocument = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<ResponseDataType<Document>>
  ) => {
    state.status = "fulfilled";

    const { _id } = action.payload.data as Document;

    const existingItem = state.documents.find(
      (document) => document._id === _id
    );

    if (existingItem) {
      (existingItem as Draft<Document> & { isDeleted: boolean }).isDeleted =
        false;
    }

    const existingListItem = state.documentList.find(
      (document) => document._id === _id
    );

    if (existingListItem) {
      (existingListItem as Draft<Document> & { isDeleted: boolean }).isDeleted =
        false;
    }

    state.notifications.push({ type: "success", message: "Restored!" });
  };

  const handleRestoreDocuments = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<{
      documentIds: string[];
      response: ResponseDataType<boolean>;
    }>
  ) => {
    state.status = "fulfilled";

    const { documentIds, response } = action.payload;

    if (response.data) {
      documentIds.forEach((_id) => {
        const existingItem = state.documents.find(
          (document) => document._id === _id
        );

        if (existingItem) {
          (existingItem as Draft<Document> & { isDeleted: boolean }).isDeleted =
            false;
        }

        const existingListItem = state.documentList.find(
          (document) => document._id === _id
        );

        if (existingListItem) {
          (
            existingListItem as Draft<Document> & { isDeleted: boolean }
          ).isDeleted = false;
        }
      });
    }

    state.notifications.push({ type: "success", message: "Restored!" });
  };

  const handleSwapDocumentsOrder = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<{
      response: ResponseDataType<Document[]>;
    }>
  ) => {
    state.status = "fulfilled";

    const {
      response: { data }
    } = action.payload;

    if (data) {
      (data as Draft<Document[]>).forEach((updatedDocument) => {
        const existingItem = state.documents.find(
          (document) => document._id === updatedDocument._id
        );

        if (existingItem) {
          (existingItem as Draft<Document> & { order: number }).order = (
            updatedDocument as Draft<Document> & { order: number }
          ).order;
        }

        const existingListItem = state.documentList.find(
          (document) => document._id === updatedDocument._id
        );

        if (existingListItem) {
          (existingListItem as Draft<Document> & { order: number }).order = (
            updatedDocument as Draft<Document> & { order: number }
          ).order;
        }
      });
    }

    state.notifications.push({ type: "success", message: "Reordered!" });
  };

  const handleDeleteDocument = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<ResponseDataType<Document>>
  ) => {
    state.status = "fulfilled";

    const { _id } = action.payload.data as Document;

    const index = state.documents.findIndex((document) => document._id === _id);

    if (index !== -1) {
      state.documents.splice(index, 1);
    }

    const listIndex = state.documentList.findIndex(
      (document) => document._id === _id
    );

    if (listIndex !== -1) {
      state.documentList.splice(listIndex, 1);
    }

    state.notifications.push({ type: "success", message: "Deleted!" });
  };

  const handleDeleteDocuments = (
    state: WritableDraft<SliceState<Document>>,
    action: PayloadAction<{
      documentIds: string[];
      response: ResponseDataType<boolean>;
    }>
  ) => {
    state.status = "fulfilled";

    const { documentIds, response } = action.payload;

    if (response.data) {
      documentIds.forEach((_id) => {
        const index = state.documents.findIndex(
          (document) => document._id === _id
        );

        if (index !== -1) {
          state.documents.splice(index, 1);
        }

        const listIndex = state.documentList.findIndex(
          (document) => document._id === _id
        );

        if (listIndex !== -1) {
          state.documentList.splice(listIndex, 1);
        }
      });
    }

    state.notifications.push({ type: "success", message: "Deleted!" });
  };

  return {
    handleFetchDocumentList: {
      pending: handlePending,
      fulfilled: handleFetchDocumentList,
      rejected: handleRejected
    },
    handleFetchDocument: {
      pending: handlePending,
      fulfilled: handleFetchDocument,
      rejected: handleRejected
    },
    handleFetchDocuments: {
      pending: handlePending,
      fulfilled: handleFetchDocuments,
      rejected: handleRejected
    },
    handleAddDocuments: {
      pending: handlePending,
      fulfilled: handleAddDocuments,
      rejected: handleRejected
    },
    handleUpdateDocument: {
      pending: handlePending,
      fulfilled: handleUpdateDocument,
      rejected: handleRejected
    },
    handleActivateDocument: {
      pending: handlePending,
      fulfilled: handleActivateDocument,
      rejected: handleRejected
    },
    handleActivateDocuments: {
      pending: handlePending,
      fulfilled: handleActivateDocuments,
      rejected: handleRejected
    },
    handleDeactivateDocument: {
      pending: handlePending,
      fulfilled: handleDeactivateDocument,
      rejected: handleRejected
    },
    handleDeactivateDocuments: {
      pending: handlePending,
      fulfilled: handleDeactivateDocuments,
      rejected: handleRejected
    },
    handleTrashDocument: {
      pending: handlePending,
      fulfilled: handleTrashDocument,
      rejected: handleRejected
    },
    handleTrashDocuments: {
      pending: handlePending,
      fulfilled: handleTrashDocuments,
      rejected: handleRejected
    },
    handleRestoreDocument: {
      pending: handlePending,
      fulfilled: handleRestoreDocument,
      rejected: handleRejected
    },
    handleRestoreDocuments: {
      pending: handlePending,
      fulfilled: handleRestoreDocuments,
      rejected: handleRejected
    },
    handleSwapDocumentsOrder: {
      pending: handlePending,
      fulfilled: handleSwapDocumentsOrder,
      rejected: handleRejected
    },
    handleDeleteDocument: {
      pending: handlePending,
      fulfilled: handleDeleteDocument,
      rejected: handleRejected
    },
    handleDeleteDocuments: {
      pending: handlePending,
      fulfilled: handleDeleteDocuments,
      rejected: handleRejected
    }
  };
};

export default getThunkReducers;
