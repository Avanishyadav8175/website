// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleGetVendorOfferCategory,
  handleUpdateVendorOfferCategory,
  handleDeleteVendorOfferCategory
} from "@/app/api/admin/preset/vendor-offer-category/handler";

// methods
export const GET = handleGetVendorOfferCategory;

export const PATCH = handleUpdateVendorOfferCategory;

export const DELETE = handleDeleteVendorOfferCategory;
