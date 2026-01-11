// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ContentCustomVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategory";
import { type ContentReferenceVariantDocument } from "@/common/types/documentation/nestedDocuments/contentReferenceVariant";
import { type LabelDocument } from "../presets/label";
import { type ObjectId } from "mongoose";

// document
export interface ContentVariantCategoryDocument extends Document {
  type: "custom" | "reference";
  label: string | ObjectId | LabelDocument;
  reference?: ContentReferenceVariantDocument[];
  custom?: ContentCustomVariantCategoryDocument;
}
