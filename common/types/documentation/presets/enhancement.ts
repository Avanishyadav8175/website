// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type ObjectId } from "mongoose";

// document
export interface EnhancementDocument extends Document {
  image: string | ObjectId | ImageDocument;
  label: string;
}

// model
export interface EnhancementModel extends Model<EnhancementDocument> {}
