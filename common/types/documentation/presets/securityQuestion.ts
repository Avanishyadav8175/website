// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface SecurityQuestionDocument extends Document {
  question: string;
}

// model
export interface SecurityQuestionModel
  extends Model<SecurityQuestionDocument> {}
