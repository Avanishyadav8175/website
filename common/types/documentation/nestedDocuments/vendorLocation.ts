// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type ObjectId } from "mongoose";
import { type StateDocument } from "@/common/types/documentation/presets/state";

// document
export interface VendorLocationDocument extends Document {
  address: string;
  state: string | ObjectId | StateDocument;
  city: string | ObjectId | CityDocument;
}
