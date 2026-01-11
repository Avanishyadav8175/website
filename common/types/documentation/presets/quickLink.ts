// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type ObjectId } from "mongoose";

// document
export interface QuickLinkDocument extends Document {
  label: string;
  path: string;
  image?: string | ObjectId | ImageDocument;
}

// model
export interface QuickLinkModel extends Model<QuickLinkDocument> {}
