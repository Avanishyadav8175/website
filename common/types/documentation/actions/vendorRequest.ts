// libraries
import { Model } from "mongoose";

// types
import { type ActionDocument as Document } from "@/common/types/documentation/_document";
import { type FoundUsSourceDocument } from "@/common/types/documentation/presets/foundUsSource";
import { type ObjectId } from "mongoose";
import { type VendorOfferCategoryDocument } from "@/common/types/documentation/presets/vendorOfferCategory";
import { type VendorRequestSocialMediaDocument } from "@/common/types/documentation/nestedDocuments/vendorRequestSocialMedia";

// document
export interface VendorRequestDocument extends Document {
  status: "new" | "processing" | "registered" | "rejected";
  businessName: string;
  ownerName: string;
  mobile: string;
  whatsapp?: string;
  mail: string;
  address: string;
  city: string;
  socialMedia?: VendorRequestSocialMediaDocument[];
  website?: string;
  gstNumber?: string;
  categories: string[] | ObjectId[] | VendorOfferCategoryDocument[];
  foundUs?: string | ObjectId | FoundUsSourceDocument;
}

// model
export interface VendorRequestModel extends Model<VendorRequestDocument> {}
