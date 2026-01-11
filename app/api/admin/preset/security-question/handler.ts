// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type SecurityQuestionDocument,
  type SecurityQuestionModel
} from "@/common/types/documentation/presets/securityQuestion";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<SecurityQuestionDocument, SecurityQuestionModel>(
  MODELS.SecurityQuestions
);

export const handleGetSecurityQuestions = getDocuments();
export const handleGetSecurityQuestion = getDocument();
export const handleAddSecurityQuestions = addDocuments();
export const handleUpdateSecurityQuestion = updateDocument();
export const handleUpdateSecurityQuestions = updateDocuments();
export const handleDeleteSecurityQuestion = deleteDocument();
export const handleDeleteSecurityQuestions = deleteDocuments();
