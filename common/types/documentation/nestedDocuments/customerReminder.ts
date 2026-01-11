// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ObjectId } from "mongoose";
import { type OccasionDocument } from "@/common/types/documentation/presets/occasion";
import { type RelationDocument } from "@/common/types/documentation/presets/relation";

// document
export interface CustomerReminderDocument extends Document {
  recipientName: string;
  date: string | Date;
  occasion: string | ObjectId | OccasionDocument;
  relation: string | ObjectId | RelationDocument;
  note: string;
}
