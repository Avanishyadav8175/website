// constants
import { INITIAL_LIMIT } from "@/common/constants/adminTable";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";
import { useToast } from "@/components/ui/use-toast";

// layouts
import AdminFormLayout from "@/layouts/admin/form/AdminFormLayout";
import BatchControls from "./components/BatchControls";
import TableLayout from "@/layouts/utils/table/TableLayout";

// types
import { type AdminTableData } from "@/common/types/layouts/admin/adminTableLayout";
import { type CreateActionType, type SelectType } from "@/store/types";
import { type Document as MongooseDocument } from "mongoose";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type ReactNode } from "react";
import { type TableContent } from "@/components/(_common)/TableLayout/TableContent";

export default function AdminTableLayout<
  Document extends MongooseDocument,
  FormFields extends HTMLFormControlsCollection
>({
  userName,
  isSuperAdmin,
  collectionName,
  documentName,
  createAction,
  select,
  defaultFilterBy,
  defaultFilterKeyword,
  filterFunction,
  filterKeywordOptions,
  dialogClassName,
  formClassName,
  formCustomStyle,
  customAdd,
  onClickCustomAdd,
  getContent,
  getFormFields,
  getDocumentsFromFormFields,
  customRefresh
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
  collectionName: string;
  documentName: string;
  createAction: CreateActionType<Document>;
  select: SelectType<Document>;
  defaultFilterBy?: string;
  defaultFilterKeyword?: string;
  filterFunction?: (document: Document) => boolean;
  filterKeywordOptions: FilterKeywordOptions<Document>;
  dialogClassName?: string;
  formClassName?: string;
  formCustomStyle?: string;
  customAdd?: boolean;
  onClickCustomAdd?: () => void;
  getContent: ({
    documents,
    state,
    method
  }: AdminTableData<Document>) => TableContent;
  getFormFields: ({
    initialDocument
  }: {
    initialDocument?: Document;
  }) => ReactNode;
  getDocumentsFromFormFields: (
    elements: FormFields
  ) => Partial<Document> | Partial<Document>[];
  customRefresh?: () => void;
}) {
  // hooks
  const dispatch = useDispatch();
  const { toast } = useToast();

  // redux query data
  const status = useSelector(select.status);

  const {
    options: { filter: filterOptions, sort: sortOptions },
    default: { sort: defaultSortBy, order: defaultOrderBy }
  } = useSelector((state) => select.query(state, filterKeywordOptions));

  // loading status
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // pagination states
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(INITIAL_LIMIT);

  // form states
  const [documentId, setDocumentId] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  // query states
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("");
  const [filterKeyword, setFilterKeyword] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>(defaultSortBy);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">(defaultOrderBy);

  // control states
  const [showTrash, setShowTrash] = useState<boolean>(false);

  // batch controls states
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  // redux states
  const notifications = useSelector(select.notifications);

  const { count, documents } = useSelector((state) =>
    select.documentList(state, {
      deleted: showTrash,
      offset,
      limit,
      searchKeyword,
      ...(defaultFilterBy ? { defaultFilterBy } : {}),
      ...(defaultFilterKeyword ? { defaultFilterKeyword } : {}),
      ...(filterFunction ? { filterFunction } : {}),
      filterBy,
      filterKeyword,
      sortBy,
      orderBy
    })
  );

  const populatedDocuments = useSelector(select.documents);

  // const document = documents.find(({ _id }) => _id === documentId);
  const document = useSelector((state) => select.document(state, documentId));

  // handlers
  const handleRefresh = () => {
    setIsLoading(true);

    if (customRefresh) {
      customRefresh();
    }

    dispatch(createAction.fetchDocumentList());
  };

  const handleAdd = () => {
    setDocumentId("");

    setShowForm(true);
  };

  const handleAddDocuments = ({
    newDocuments
  }: {
    newDocuments: Partial<Document> | Partial<Document>[];
  }) => {
    if (Array.isArray(newDocuments)) {
      newDocuments.forEach((newDocument) => {
        if ("createdBy" in newDocument) {
          newDocument.createdBy = userName || "Admin";
        }
        if ("updatedBy" in newDocument) {
          newDocument.updatedBy = userName || "Admin";
        }
      });
    } else {
      if ("createdBy" in newDocuments) {
        newDocuments.createdBy = userName || "Admin";
      }
      if ("updatedBy" in newDocuments) {
        newDocuments.updatedBy = userName || "Admin";
      }
    }

    dispatch(
      createAction.addDocuments({
        newDocuments: newDocuments as Document | Document[]
      })
    );

    // setShowForm(false);
  };

  const handleUpdate = ({ documentId }: { documentId: string }) => {
    setDocumentId(documentId);

    setShowForm(true);
  };

  const handleUpdateDocument = ({
    documentId,
    updatedDocument
  }: {
    documentId: string;
    updatedDocument: Partial<Document>;
  }) => {
    if ("createdBy" in updatedDocument) {
      delete updatedDocument.createdBy;
    }
    if ("updatedBy" in updatedDocument) {
      updatedDocument.updatedBy = userName || "Admin";
    }

    dispatch(
      createAction.updateDocument({
        documentId,
        updateData: updatedDocument
      })
    );

    // setShowForm(false);
  };

  const handleActivate = ({ documentId }: { documentId: string }) => {
    dispatch(
      createAction.activateDocument({
        documentId
      })
    );
  };

  const handleDeactivate = ({ documentId }: { documentId: string }) => {
    dispatch(
      createAction.deactivateDocument({
        documentId
      })
    );
  };

  const handleTrash = ({ documentId }: { documentId: string }) => {
    dispatch(
      createAction.trashDocument({
        documentId
      })
    );
  };

  const handleRestore = ({ documentId }: { documentId: string }) => {
    dispatch(
      createAction.restoreDocument({
        documentId
      })
    );
  };

  const handleDelete = ({ documentId }: { documentId: string }) => {
    dispatch(
      createAction.deleteDocument({
        documentId
      })
    );
  };

  const handleSort = ({ newSortBy }: { newSortBy: string }) => {
    setOrderBy((prevOrderBy) =>
      sortBy === newSortBy
        ? prevOrderBy === "asc"
          ? "desc"
          : "asc"
        : defaultOrderBy
    );
    setSortBy(newSortBy);
  };

  const handleShowToast = ({
    variant,
    title,
    description
  }: {
    variant: "success" | "destructive";
    title: string;
    description: string;
  }) => {
    toast({
      variant,
      title,
      description
    });
  };

  const handleReset = () => {
    setOffset(0);
    setLimit(INITIAL_LIMIT);
    setSearchKeyword("");
    setFilterBy("");
    setFilterKeyword("");
    setSortBy(defaultSortBy);
    setOrderBy(defaultOrderBy);
  };

  // side effects
  useEffect(() => {
    if (status === "idle") {
      setIsLoading(true);
      dispatch(createAction.fetchDocumentList());
    }

    if (status === "fulfilled" || status === "rejected") {
      setIsLoading(false);
    }
  }, [status, createAction, dispatch]);

  useEffect(() => {
    if (documentId && !document) {
      dispatch(createAction.fetchOrSelectDocument({ documentId }));
    }
  }, [documentId, document, createAction, dispatch]);

  useEffect(() => {
    if (notifications.length) {
      notifications.forEach((notification) => {
        toast({
          title: notification.type.toUpperCase(),
          description: notification.message,
          variant:
            notification.type === "error"
              ? "destructive"
              : notification.type === "success"
                ? "success"
                : "warning"
        });
      });

      dispatch(createAction.resetNotifications());
    }
  }, [notifications, toast, dispatch, createAction]);

  useEffect(() => {
    if (!showForm) {
      setDocumentId("");
    }
  }, [showForm]);

  useEffect(() => {
    if (offset >= count && offset - limit >= 0) {
      setOffset(offset - limit);
    }
  }, [offset, limit, count]);

  useEffect(() => {
    setFilterKeyword("");
  }, [filterBy]);

  useEffect(() => {
    setSelectedDocuments(
      selectedDocuments.filter((selectedDocument) =>
        documents.find(({ _id }) => (_id as string) === selectedDocument)
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents]);

  const uniqueActive = Array.from(
    new Set(
      selectedDocuments
        .filter((selectedDocument) =>
          documents.find(({ _id }) => (_id as string) === selectedDocument)
        )
        .map(
          (selectedDocument) =>
            documents.find(
              ({ _id }) => (_id as string) === selectedDocument
            ) as Document & { isActive: boolean }
        )
        .map(({ isActive }) => isActive)
    )
  );

  // data
  const content = getContent({
    documents,
    populatedDocuments,
    state: {
      isLoading,
      pagination: {
        offset,
        limit
      },
      form: {
        documentId,
        showForm
      },
      query: {
        searchKeyword,
        filterBy,
        filterKeyword,
        sortBy,
        orderBy
      },
      trash: {
        showTrash
      }
    },
    method: {
      onAdd: handleAdd,
      onAddDocuments: handleAddDocuments,
      onUpdate: handleUpdate,
      onUpdateDocument: handleUpdateDocument,
      onActivate: handleActivate,
      onDeactivate: handleDeactivate,
      onTrash: handleTrash,
      onRestore: handleRestore,
      onDelete: handleDelete,
      onSort: handleSort,
      onShowToast: handleShowToast
    }
  });

  return (
    <>
      <TableLayout
        title={collectionName}
        content={content}
        pagination={{
          count,
          offset,
          limit,
          onChangeOffset: setOffset,
          onChangeLimit: setLimit
        }}
        controls={{
          refresh: {
            onRefresh: handleRefresh
          },
          add: {
            onAdd:
              customAdd && onClickCustomAdd
                ? onClickCustomAdd
                : () => {
                  setDocumentId("");
                  setShowForm(true);
                }
          },
          trash: {
            showTrash,
            toggleShowTrash: () => {
              setShowTrash((prevShowTrash) => !prevShowTrash);
            }
          }
        }}
        batchControls={{
          selectedDocuments,
          onSelectDocuments: (newSelectedDocuments) => {
            setSelectedDocuments(
              newSelectedDocuments.filter((selectedDocument) =>
                documents.find(
                  ({ _id }) => (_id as string) === selectedDocument
                )
              )
            );
          },
          getComponent: (
            showBatchControls: boolean,
            toggleShowBatchControls: () => void
          ) => (
            <BatchControls
              showBatchControls={showBatchControls}
              toggleShowBatchControls={toggleShowBatchControls}
              activeInactive={
                !showTrash && uniqueActive.length === 1
                  ? {
                    isActive: uniqueActive[0] || false,
                    onToggleActiveInactive: uniqueActive[0]
                      ? () => {
                        dispatch(
                          createAction.deactivateDocuments({
                            documentIds: selectedDocuments
                          })
                        );
                      }
                      : () => {
                        dispatch(
                          createAction.activateDocuments({
                            documentIds: selectedDocuments
                          })
                        );
                      }
                  }
                  : undefined
              }
              drop={{
                showDrop: Boolean(selectedDocuments.length) && !showTrash,
                onClickDrop: () => {
                  dispatch(
                    createAction.trashDocuments({
                      documentIds: selectedDocuments
                    })
                  );
                },
                dropConfirmationDialogTitle: "Trash Selection?"
              }}
              restore={{
                showRestore:
                  Boolean(selectedDocuments.length) && showTrash,
                onClickRestore: () => {
                  dispatch(
                    createAction.restoreDocuments({
                      documentIds: selectedDocuments
                    })
                  );
                }
              }}
              delete={{
                showDelete:
                  Boolean(selectedDocuments.length) && showTrash,
                onClickDelete: () => {
                  dispatch(
                    createAction.deleteDocuments({
                      documentIds: selectedDocuments
                    })
                  );
                },
                deleteConfirmationDialogTitle: "Delete Selection?"
              }}
            />
          )
        }}
        query={{
          onReset: handleReset,
          search: {
            keyword: searchKeyword,
            onChangeKeyword: setSearchKeyword
          },
          filter: {
            options: filterOptions,
            filterBy,
            keyword: filterKeyword,
            onChangeFilterBy: setFilterBy,
            onChangeKeyword: setFilterKeyword
          },
          sort: {
            options: sortOptions,
            sortBy,
            orderBy,
            onChangeSortBy: setSortBy,
            onChangeOrderBy: setOrderBy
          }
        }}
      />
      <AdminFormLayout
        showForm={showForm}
        documentName={documentName}
        initialDocument={document}
        dialogClassName={dialogClassName}
        formClassName={formClassName}
        formCustomStyle={formCustomStyle}
        onChangeShowForm={setShowForm}
        getFormFields={getFormFields}
        onAddDocument={handleAddDocuments}
        onUpdateDocument={handleUpdateDocument}
        getDocumentsFromFormFields={getDocumentsFromFormFields}
      />
    </>
  );
}
