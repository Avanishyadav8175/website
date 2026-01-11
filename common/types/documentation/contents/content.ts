// types
import { type ContentDocument as Document } from "@/common/types/documentation/_document";
import { type Model, type ObjectId } from "mongoose";

import { type BrandDocument } from "@/common/types/documentation/presets/brand";
import { type ContentAddonDocument } from "@/common/types/documentation/nestedDocuments/contentAddon";
import { type ContentAvailabilityDocument } from "@/common/types/documentation/nestedDocuments/contentAvailability";
import { type ContentClassificationDocument } from "@/common/types/documentation/nestedDocuments/contentClassification";
import { type ContentCustomizationDocument } from "@/common/types/documentation/nestedDocuments/contentCustomization";
import { type ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { type ContentDetailDocument } from "@/common/types/documentation/nestedDocuments/contentDetail";
import { type ContentListItemDataDocument } from "../nestedDocuments/contentListItemData";
import { type ContentMediaDocument } from "@/common/types/documentation/nestedDocuments/contentMedia";
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { type ContentQualityDocument } from "@/common/types/documentation/nestedDocuments/contentQuality";
import { type ContentSuggestionDocument } from "@/common/types/documentation/nestedDocuments/contentSuggestion";
import { type ContentTagDocument } from "@/common/types/documentation/nestedDocuments/contentTag";
import { type ContentVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentVariantCategory";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import { type EdibleDocument } from "@/common/types/documentation/nestedDocuments/edible";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";

// document
export interface ContentDocument extends Document {
  type: "product" | "service";
  sku: string;
  name: string;
  slug: string;
  redirectFrom?: string;
  category: ContentClassificationDocument;
  media: ContentMediaDocument;
  isBestseller: boolean;
  isCorporate: boolean;
  brand?: string | ObjectId | BrandDocument;
  availability?: ContentAvailabilityDocument;
  detail?: ContentDetailDocument;
  tag?: ContentTagDocument;
  quality?: ContentQualityDocument;
  seoMeta?: SEOMetaDocument;
  delivery?: ContentDeliveryDocument;
  price?: ContentPriceDocument;
  edible?: EdibleDocument;
  customization?: ContentCustomizationDocument;
  addons?: ContentAddonDocument[];
  variants?: ContentVariantCategoryDocument[];
  _coupons?: string[] | ObjectId[] | CouponDocument[];
  _suggestions?: ContentSuggestionDocument;
  _listItemData?: ContentListItemDataDocument;
}

// model
export interface ContentModel extends Model<ContentDocument> {}
