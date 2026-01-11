// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type CityDocument,
  type CityModel
} from "@/common/types/documentation/presets/city";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<CityDocument, CityModel>(MODELS.Cities);

export const handleGetCities = getDocuments();
export const handleGetCity = getDocument();
export const handleAddCities = addDocuments();
export const handleUpdateCity = updateDocument();
export const handleUpdateCities = updateDocuments();
export const handleDeleteCity = deleteDocument();
export const handleDeleteCities = deleteDocuments();
