// libraries
import { createSlice } from "@reduxjs/toolkit";

// utils
import getSelectors from "@/common/utils/redux/getSelectors";
import getSliceState from "@/common/utils/redux/getSliceState";
import getThunks from "@/common/utils/redux/getThunks";
import getThunkReducers from "@/common/utils/redux/getThunkReducers";

// types
import { type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { type Document as MongooseDocument } from "mongoose";
import {
  type DocumentKeyOption,
  type DocumentKeyOptions
} from "@/common/types/utils";
import {
  type SliceInitialState,
  type SliceState
} from "@/common/types/redux/redux";

const getSlice = <Document extends MongooseDocument>({
  sliceName,
  documentName,
  apiRoute,
  initialState,
  selectKeys,
  searchKeys,
  optionLabelKey
}: {
  sliceName: string;
  documentName: string;
  apiRoute: string;
  initialState: SliceInitialState<Document>;
  selectKeys: DocumentKeyOptions<Document>;
  searchKeys: DocumentKeyOptions<Document>;
  optionLabelKey: DocumentKeyOption<Document>;
}) => {
  const {
    query: {
      default: { sort: sortBy, order: orderBy }
    }
  } = initialState;

  // thunks
  const {
    fetchDocumentList,
    fetchDocument,
    fetchOrSelectDocument,
    fetchDocuments,
    addDocuments,
    updateDocument,
    activateDocument,
    activateDocuments,
    deactivateDocument,
    deactivateDocuments,
    trashDocument,
    trashDocuments,
    restoreDocument,
    restoreDocuments,
    swapDocumentsOrder,
    deleteDocument,
    deleteDocuments
  } = getThunks<Document>({
    sliceName,
    documentName,
    apiRoute,
    select: selectKeys,
    sortBy,
    orderBy
  });

  // thunk reducers
  const {
    handleFetchDocumentList,
    handleFetchDocument,
    handleFetchDocuments,
    handleAddDocuments,
    handleUpdateDocument,
    handleActivateDocument,
    handleActivateDocuments,
    handleDeactivateDocument,
    handleDeactivateDocuments,
    handleTrashDocument,
    handleTrashDocuments,
    handleRestoreDocument,
    handleRestoreDocuments,
    handleSwapDocumentsOrder,
    handleDeleteDocument,
    handleDeleteDocuments
  } = getThunkReducers({ select: selectKeys as DocumentKeyOptions<Document> });

  // extra reducers
  const extraReducers = (
    builder: ActionReducerMapBuilder<SliceState<Document>>
  ) => {
    builder
      .addCase(fetchDocumentList.pending, handleFetchDocumentList.pending)
      .addCase(fetchDocumentList.fulfilled, handleFetchDocumentList.fulfilled)
      .addCase(fetchDocumentList.rejected, handleFetchDocumentList.rejected)
      .addCase(fetchDocument.pending, handleFetchDocument.pending)
      .addCase(fetchDocument.fulfilled, handleFetchDocument.fulfilled)
      .addCase(fetchDocument.rejected, handleFetchDocument.rejected)
      .addCase(fetchDocuments.pending, handleFetchDocuments.pending)
      .addCase(fetchDocuments.fulfilled, handleFetchDocuments.fulfilled)
      .addCase(fetchDocuments.rejected, handleFetchDocuments.rejected)
      .addCase(addDocuments.pending, handleAddDocuments.pending)
      .addCase(addDocuments.fulfilled, handleAddDocuments.fulfilled)
      .addCase(addDocuments.rejected, handleAddDocuments.rejected)
      .addCase(updateDocument.pending, handleUpdateDocument.pending)
      .addCase(updateDocument.fulfilled, handleUpdateDocument.fulfilled)
      .addCase(updateDocument.rejected, handleUpdateDocument.rejected)
      .addCase(activateDocument.pending, handleActivateDocument.pending)
      .addCase(activateDocument.fulfilled, handleActivateDocument.fulfilled)
      .addCase(activateDocument.rejected, handleActivateDocument.rejected)
      .addCase(activateDocuments.pending, handleActivateDocuments.pending)
      .addCase(activateDocuments.fulfilled, handleActivateDocuments.fulfilled)
      .addCase(activateDocuments.rejected, handleActivateDocuments.rejected)
      .addCase(deactivateDocument.pending, handleDeactivateDocument.pending)
      .addCase(deactivateDocument.fulfilled, handleDeactivateDocument.fulfilled)
      .addCase(deactivateDocument.rejected, handleDeactivateDocument.rejected)
      .addCase(deactivateDocuments.pending, handleDeactivateDocuments.pending)
      .addCase(
        deactivateDocuments.fulfilled,
        handleDeactivateDocuments.fulfilled
      )
      .addCase(deactivateDocuments.rejected, handleDeactivateDocuments.rejected)
      .addCase(trashDocument.pending, handleTrashDocument.pending)
      .addCase(trashDocument.fulfilled, handleTrashDocument.fulfilled)
      .addCase(trashDocument.rejected, handleTrashDocument.rejected)
      .addCase(trashDocuments.pending, handleTrashDocuments.pending)
      .addCase(trashDocuments.fulfilled, handleTrashDocuments.fulfilled)
      .addCase(trashDocuments.rejected, handleTrashDocuments.rejected)
      .addCase(restoreDocument.pending, handleRestoreDocument.pending)
      .addCase(restoreDocument.fulfilled, handleRestoreDocument.fulfilled)
      .addCase(restoreDocument.rejected, handleRestoreDocument.rejected)
      .addCase(restoreDocuments.pending, handleRestoreDocuments.pending)
      .addCase(restoreDocuments.fulfilled, handleRestoreDocuments.fulfilled)
      .addCase(restoreDocuments.rejected, handleRestoreDocuments.rejected)
      .addCase(swapDocumentsOrder.pending, handleSwapDocumentsOrder.pending)
      .addCase(swapDocumentsOrder.fulfilled, handleSwapDocumentsOrder.fulfilled)
      .addCase(swapDocumentsOrder.rejected, handleSwapDocumentsOrder.rejected)
      .addCase(deleteDocument.pending, handleDeleteDocument.pending)
      .addCase(deleteDocument.fulfilled, handleDeleteDocument.fulfilled)
      .addCase(deleteDocument.rejected, handleDeleteDocument.rejected)
      .addCase(deleteDocuments.pending, handleDeleteDocuments.pending)
      .addCase(deleteDocuments.fulfilled, handleDeleteDocuments.fulfilled)
      .addCase(deleteDocuments.rejected, handleDeleteDocuments.rejected);
  };

  // slice
  const slice = createSlice({
    name: sliceName,
    initialState: getSliceState(initialState),
    reducers: {
      resetNotifications: (state) => {
        state.notifications = [];
      }
    },
    extraReducers
  });

  // reducer
  const reducer = slice.reducer;

  // actions
  const { resetNotifications } = slice.actions;

  // select
  const select = getSelectors<Document>({
    sliceName,
    searchKeys,
    optionLabelKey
  });

  return {
    reducer,
    createAction: {
      resetNotifications,
      fetchDocumentList,
      fetchDocument,
      fetchOrSelectDocument,
      fetchDocuments,
      addDocuments,
      updateDocument,
      activateDocument,
      activateDocuments,
      deactivateDocument,
      deactivateDocuments,
      trashDocument,
      trashDocuments,
      restoreDocument,
      restoreDocuments,
      swapDocumentsOrder,
      deleteDocument,
      deleteDocuments
    },
    select
  };
};

export default getSlice;
