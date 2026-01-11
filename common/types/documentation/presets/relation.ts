// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface RelationDocument extends Document {
  name: string;
}

// model
export interface RelationModel extends Model<RelationDocument> {}
