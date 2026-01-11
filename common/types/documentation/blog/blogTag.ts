// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";
import { type Model } from "mongoose";

// document
export interface BlogTagDocument extends Document {
  name: string;
}

// model
export interface BlogTagModel extends Model<BlogTagDocument> {}
