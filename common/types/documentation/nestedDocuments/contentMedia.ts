// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type ObjectId } from "mongoose";

// document
export interface ContentMediaDocument extends Document {
  primary: string | ObjectId | ImageDocument;
  gallery: string[] | ObjectId[] | ImageDocument[];
  video?: string;
  review: string[] | ObjectId[] | ImageDocument[];
}
