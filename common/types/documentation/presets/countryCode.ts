// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";

// document
export interface CountryCodeDocument extends Document {
  name: string;
  code: string;
}

// model
export interface CountryCodeModel extends Model<CountryCodeDocument> {}
