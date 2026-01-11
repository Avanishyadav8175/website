import { type Document as MongooseDocument } from "mongoose";

export type AdminTableState = {
  isLoading?: boolean;
  pagination: {
    offset: number;
    limit: number;
  };
  form: {
    documentId: string;
    showForm: boolean;
  };
  query: {
    searchKeyword: string;
    filterBy: string;
    filterKeyword: string;
    sortBy: string;
    orderBy: "asc" | "desc";
  };
  trash: {
    showTrash: boolean;
  };
};

export type AdminTableMethod<Document extends MongooseDocument> = {
  onAdd: () => void;
  onAddDocuments: ({
    newDocuments
  }: {
    newDocuments: Partial<Document> | Partial<Document>[];
  }) => void;
  onUpdate: ({ documentId }: { documentId: string }) => void;
  onUpdateDocument: ({
    documentId,
    updatedDocument
  }: {
    documentId: string;
    updatedDocument: Partial<Document>;
  }) => void;
  onActivate: ({ documentId }: { documentId: string }) => void;
  onDeactivate: ({ documentId }: { documentId: string }) => void;
  onTrash: ({ documentId }: { documentId: string }) => void;
  onRestore: ({ documentId }: { documentId: string }) => void;
  onDelete: ({ documentId }: { documentId: string }) => void;
  onSort: ({ newSortBy }: { newSortBy: string }) => void;
  onShowToast: ({
    variant,
    title,
    description
  }: {
    variant: "success" | "destructive";
    title: string;
    description: string;
  }) => void;
};

export type AdminTableData<Document extends MongooseDocument> = {
  documents: Document[];
  populatedDocuments?: Document[];
  state: AdminTableState;
  method: AdminTableMethod<Document>;
};
