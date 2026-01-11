// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ContentUpgradeItemDocument } from "@/common/types/documentation/nestedDocuments/contentUpgradeItem";
import { type LabelDocument } from "../presets/label";
import { type ObjectId } from "mongoose";
import { type UpgradeDocument } from "@/common/types/documentation/presets/upgrade";

// document
export interface ContentUpgradeDocument extends Document {
  label: string | ObjectId | LabelDocument;
  default: string | ObjectId | UpgradeDocument;
  options: ContentUpgradeItemDocument[];
}
