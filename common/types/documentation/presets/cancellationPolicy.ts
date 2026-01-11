// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface CancellationPolicyDocument extends Document {
  label: string;
  content: string;
}

// model
export interface CancellationPolicyModel
  extends Model<CancellationPolicyDocument> {}
