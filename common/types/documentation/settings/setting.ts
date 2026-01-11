// Libraries
import { Model } from "mongoose";

// types
import { type SettingDocument as Document } from "@/common/types/documentation/_document";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type ObjectId } from "mongoose";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";
import { type SettingAuthDocument } from "@/common/types/documentation/nestedDocuments/settingAuth";
import { type SettingContactDocument } from "@/common/types/documentation/nestedDocuments/settingContact";
import { type SettingPaymentDocument } from "../nestedDocuments/settingPayment";
import { type SettingSocialDetailDocument } from "../nestedDocuments/settingSocialDetail";

// Types
export interface SettingDocument extends Document {
  auth: SettingAuthDocument;
  payment: SettingPaymentDocument;
  callback: boolean;
  contact: SettingContactDocument;
  icon?: string | ObjectId | ImageDocument;
  logo?: string | ObjectId | ImageDocument;
  serviceImage?: string | ObjectId | ImageDocument;
  social?: SettingSocialDetailDocument[];
  // homepageSEOMeta: SEOMetaDocument;
}

export interface SettingModel extends Model<SettingDocument> {}
