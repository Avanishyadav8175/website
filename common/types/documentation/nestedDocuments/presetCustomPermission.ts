// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

// document
export interface PresetCustomPermissionDocument extends Document {
  advancePayment?: PermissionDocument;
  aiTag?: PermissionDocument;
  balloonColorGroup?: PermissionDocument;
  brand?: PermissionDocument;
  cancellationPolicy?: PermissionDocument;
  careInfo?: PermissionDocument;
  catalogue?: PermissionDocument;
  city?: PermissionDocument;
  color?: PermissionDocument;
  commission?: PermissionDocument;
  countryCode?: PermissionDocument;
  deliveryDetail?: PermissionDocument;
  deliveryType?: PermissionDocument;
  enhancement?: PermissionDocument;
  faqGroup?: PermissionDocument;
  flavour?: PermissionDocument;
  foundUsSource?: PermissionDocument;
  gst?: PermissionDocument;
  label?: PermissionDocument;
  noteGroup?: PermissionDocument;
  occasion?: PermissionDocument;
  paymentCycle?: PermissionDocument;
  processingTime?: PermissionDocument;
  promotionTag?: PermissionDocument;
  quickLink?: PermissionDocument;
  relation?: PermissionDocument;
  reviewGroup?: PermissionDocument;
  searchTag?: PermissionDocument;
  securityQuestion?: PermissionDocument;
  state?: PermissionDocument;
  trendingSearchKeyword?: PermissionDocument;
  unit?: PermissionDocument;
  upgrade?: PermissionDocument;
  vendorOfferCategory?: PermissionDocument;
  venue?: PermissionDocument;
}
