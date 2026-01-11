// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";

// document
export interface FAQGroupDocument extends Document {
  name: string;
  faqs: QADocument[];
}

// model
export interface FAQGroupModel extends Model<FAQGroupDocument> {}
