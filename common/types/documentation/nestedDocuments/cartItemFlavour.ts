// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type FlavourDocument } from "@/common/types/documentation/presets/flavour";
import { type ObjectId } from "mongoose";

// document
export interface CartItemFlavourDocument extends Document {
  label: string;
  flavour: string | ObjectId | FlavourDocument;
  price: number;
}
