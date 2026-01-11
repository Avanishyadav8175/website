// types
import { type PresetDocument as Document } from "@/common/types/documentation/_document";
import { type Model, type ObjectId } from "mongoose";

import { OccasionDocument } from "@/common/types/documentation/presets/occasion";

// document
export interface NoteGroupDocument extends Document {
  occasion: string | ObjectId | OccasionDocument;
  name: string;
  templates: string[];
}

// model
export interface NoteGroupModel extends Model<NoteGroupDocument> {}
