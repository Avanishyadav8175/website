// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface StateDocument extends Document {
  name: string;
}

// model
export interface StateModel extends Model<StateDocument> {}
