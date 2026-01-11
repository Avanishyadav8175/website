// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";
import { type Model, type ObjectId } from "mongoose";

import { type ImageDocument } from "@/common/types/documentation/media/image";

// document
export interface BlogAuthorDocument extends Document {
  name: string;
  bio?: string;
  photo?: string | ObjectId | ImageDocument;
}

// model
export interface BlogAuthorModel extends Model<BlogAuthorDocument> {}
