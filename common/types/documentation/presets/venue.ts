// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface VenueDocument extends Document {
  name: string;
}

// model
export interface VenueModel extends Model<VenueDocument> {}
