// models
import MODELS from "@/db/mongoose/models";

// utils
import getHandler from "@/common/utils/api/getHandler";

// types
import {
  type VenueDocument,
  type VenueModel
} from "@/common/types/documentation/presets/venue";

const {
  getDocuments,
  getDocument,
  addDocuments,
  updateDocument,
  updateDocuments,
  deleteDocument,
  deleteDocuments
} = getHandler<VenueDocument, VenueModel>(MODELS.Venues);

export const handleGetVenues = getDocuments();
export const handleGetVenue = getDocument();
export const handleAddVenues = addDocuments();
export const handleUpdateVenue = updateDocument();
export const handleUpdateVenues = updateDocuments();
export const handleDeleteVenue = deleteDocument();
export const handleDeleteVenues = deleteDocuments();
