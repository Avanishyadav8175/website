// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type BalloonColorGroupDocument } from "@/common/types/documentation/presets/balloonColorGroup";
import { type LabelDocument } from "../presets/label";
import { type ObjectId } from "mongoose";

// document
export interface ContentBalloonColorDocument extends Document {
  label: string | ObjectId | LabelDocument;
  groups: string[] | ObjectId[] | BalloonColorGroupDocument[];
}
