// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";
import { type UnitServeDocument } from "@/common/types/documentation/nestedDocuments/unitServe";

// document
export interface UnitDocument extends Document {
  name: string;
  abbr: string;
  serves?: UnitServeDocument[];
}

// model
export interface UnitModel extends Model<UnitDocument> {}
