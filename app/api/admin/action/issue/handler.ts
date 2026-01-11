// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type IssueDocument,
  type IssueModel
} from "@/common/types/documentation/actions/issue";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  deleteDocument
} = getHandler<IssueDocument, IssueModel>(MODELS.Issues);

export const handleGetIssues = getDocuments();
export const handleGetIssue = getDocument();
export const handleAddIssues = addDocuments();
export const handleUpdateIssue = updateDocument();
export const handleDeleteIssue = deleteDocument();
