// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type ObjectId } from "mongoose";

// document
export interface ContentCityPriceDocument extends Document {
  city: string | ObjectId | CityDocument;
  mrp: number;
  price: number;
}
