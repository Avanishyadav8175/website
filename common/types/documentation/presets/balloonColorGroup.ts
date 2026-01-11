// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface BalloonColorGroupDocument extends Document {
  name: string;
  colors: string[];
}

// model
export interface BalloonColorGroupModel
  extends Model<BalloonColorGroupDocument> {}
