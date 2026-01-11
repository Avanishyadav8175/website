// libraries
import { Model } from "mongoose";

// types
import { type CatalogueCategoryDocument } from "../categories/catalogueCategory";
import { type PresetDocument as Document } from "@/common/types/documentation/_document";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type ObjectId } from "mongoose";

// document
export interface CatalogueDocument extends Document {
  category: string | ObjectId | CatalogueCategoryDocument;
  name: string;
  path: string;
  icon: string | ObjectId | ImageDocument;
}

// model
export interface CatalogueModel extends Model<CatalogueDocument> {}
