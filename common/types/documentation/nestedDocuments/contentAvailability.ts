// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type ObjectId } from "mongoose";

// document
export interface ContentAvailabilityDocument extends Document {
  availableAt: "all-india" | "cities";
  limitAvailability?: boolean;
  cities?: string[] | ObjectId[] | CityDocument[];
}
