// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ContentFlavourItemDocument } from "@/common/types/documentation/nestedDocuments/contentFlavourItem";
import { type FlavourDocument } from "@/common/types/documentation/presets/flavour";
import { type LabelDocument } from "../presets/label";
import { type ObjectId } from "mongoose";

// document
export interface ContentFlavourDocument extends Document {
  label: string | ObjectId | LabelDocument;
  default: string | ObjectId | FlavourDocument;
  options: ContentFlavourItemDocument[];
}
