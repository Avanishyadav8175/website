// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ObjectId } from "mongoose";
import { type UpgradeDocument } from "@/common/types/documentation/presets/upgrade";

// document
export interface ContentUpgradeItemDocument extends Document {
  upgrade: string | ObjectId | UpgradeDocument;
  price: number;
}
