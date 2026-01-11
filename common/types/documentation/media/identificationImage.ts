// libraries
import { Model } from "mongoose";

// types
import { type MediaDocument as Document } from "@/common/types/documentation/_document";

// document
export interface IdentificationImageDocument extends Document {
  name: string;
  data?: string; // base64 encoded string
  extension: string;
  width: number;
  height: number;
  size: number;
  url: string;
  inUse: boolean;
}

// model
export interface IdentificationImageModel
  extends Model<IdentificationImageDocument> {}
