// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type UpgradeDocument } from "@/common/types/documentation/presets/upgrade";
import { type ObjectId } from "mongoose";

// document
export interface CartItemUpgradeDocument extends Document {
  label: string;
  upgrade: string | ObjectId | UpgradeDocument;
  price: number;
}
