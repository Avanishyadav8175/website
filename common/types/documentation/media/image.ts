// libraries
import { Model } from "mongoose";

// types
import { type MediaDocument as Document } from "@/common/types/documentation/_document";

// document
export interface ImageDocument extends Document {
  folderId: string;
  folderName: string;
  name: string;
  defaultAlt: string;
  alt: string;
  data?: string; // base64 encoded string
  extension: string;
  width: number;
  height: number;
  size: number;
  url: string;
  usagesCount: number;
}

// model
export interface ImageModel extends Model<ImageDocument> {}
