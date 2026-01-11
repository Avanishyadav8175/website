// types
import { type ContentDocument as Document } from "@/common/types/documentation/_document";
import { type Model, type ObjectId } from "mongoose";

import { type AddonCategoryDocument } from "@/common/types/documentation/categories/addonCategory";
import { type EdibleDocument } from "@/common/types/documentation/nestedDocuments/edible";
import { type ImageDocument } from "@/common/types/documentation/media/image";

// document
export interface AddonDocument extends Document {
  category: string | ObjectId | AddonCategoryDocument;
  name: string;
  price: number;
  image: string | ObjectId | ImageDocument;
  edible: EdibleDocument;
  isCustomizable: boolean;
  customizationLabel?: string;
}

// model
export interface AddonModel extends Model<AddonDocument> {}
