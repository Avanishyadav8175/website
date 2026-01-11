// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ContentCustomVariantDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariant";
import { type ContentCustomVariantCategoryOptionDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategoryOption";
import { type ObjectId } from "mongoose";
import { type UnitDocument } from "@/common/types/documentation/presets/unit";

// document
export interface ContentCustomVariantCategoryDocument extends Document {
  options: ContentCustomVariantCategoryOptionDocument;
  unit?: string | ObjectId | UnitDocument;
  variants: ContentCustomVariantDocument[];
}
