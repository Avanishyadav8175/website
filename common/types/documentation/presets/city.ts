// libraries
import { Model } from "mongoose";

// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type ObjectId } from "mongoose";
import { type StateDocument } from "@/common/types/documentation/presets/state";

// document
export interface CityDocument extends Document {
  state: string | ObjectId | StateDocument;
  name: string;
  aliases?: string[];
  isTopCity: boolean;
  icon?: string | ObjectId | ImageDocument;
}

// model
export interface CityModel extends Model<CityDocument> {}
