// next config
export const dynamic = "force-dynamic";

// handlers
import {
  handleAddVendorOfferCategories,
  handleDeleteVendorOfferCategories,
  handleGetVendorOfferCategories,
  handleUpdateVendorOfferCategories
} from "@/app/api/admin/preset/vendor-offer-category/handler";

// methods
export const GET = handleGetVendorOfferCategories;

export const POST = handleAddVendorOfferCategories;

export const PATCH = handleUpdateVendorOfferCategories;

export const DELETE = handleDeleteVendorOfferCategories;
