// libraries
import { Model } from "mongoose";

// types
import { type CategoryDocument } from "@/common/types/documentation/_document";
import { type CatalogueDocument } from "../presets/catalogue";
import { type ImageDocument } from "../media/image";
import { type ObjectId } from "mongoose";

// document
export interface CatalogueCategoryDocument extends CategoryDocument {
  name: string;
  title: string;
  icon: string | ObjectId | ImageDocument;
  _catalogues?: CatalogueDocument[];
}

// model
export interface CatalogueCategoryModel
  extends Model<CatalogueCategoryDocument> {}
