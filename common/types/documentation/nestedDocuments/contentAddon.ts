// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type AddonDocument } from "@/common/types/documentation/contents/addon";
import { type ObjectId } from "mongoose";

// document
export interface ContentAddonDocument extends Document {
  addon: string | ObjectId | AddonDocument;
  isPopular: boolean;
}
