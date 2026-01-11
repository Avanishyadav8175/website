// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface SearchTagDocument extends Document {
  name: string;
}

// model
export interface SearchTagModel extends Model<SearchTagDocument> {}
