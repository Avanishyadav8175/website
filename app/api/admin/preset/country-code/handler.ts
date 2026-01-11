// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type CountryCodeDocument,
  type CountryCodeModel
} from "@/common/types/documentation/presets/countryCode";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<CountryCodeDocument, CountryCodeModel>(MODELS.CountryCodes);

export const handleGetCountryCodes = getDocuments();
export const handleGetCountryCode = getDocument();
export const handleAddCountryCodes = addDocuments();
export const handleUpdateCountryCode = updateDocument();
export const handleUpdateCountryCodes = updateDocuments();
export const handleDeleteCountryCode = deleteDocument();
export const handleDeleteCountryCodes = deleteDocuments();
