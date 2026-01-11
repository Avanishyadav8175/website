// libraries
import { Model } from "mongoose";

// types
import { type MediaDocument as Document } from "@/common/types/documentation/_document";

// document
export interface CustomizationImageDocument extends Document {
  name: string;
  data?: string; // base64 encoded string
  extension: string;
  width: number;
  height: number;
  size: number;
  url: string;
  contentName: string;
  isInCart: boolean;
  isOrdered: boolean;
  isDelivered: boolean;
}

// model
export interface CustomizationImageModel
  extends Model<CustomizationImageDocument> {}
