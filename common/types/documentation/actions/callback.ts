// libraries
import { Model } from "mongoose";

// types
import { type ActionDocument as Document } from "@/common/types/documentation/_document";

// document
export interface CallbackDocument extends Document {
  status: "new" | "in-progress" | "interested" | "not-interested";
  contact: string;
  times: number;
  submittedAt: string | Date;
}

// model
export interface CallbackModel extends Model<CallbackDocument> {}
