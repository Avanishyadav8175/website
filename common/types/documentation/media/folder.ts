// libraries
import { Model } from "mongoose";

// types
import { type MediaDocument as Document } from "@/common/types/documentation/_document";

// document
export interface FolderDocument extends Document {
  name: string;
  label: string;
  imageCount: number;
  colorName: "red" | "blue" | "amber" | "jade" | "purple";
}

// model
export interface FolderModel extends Model<FolderDocument> {}
