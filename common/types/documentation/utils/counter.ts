// Libraries
import { Model } from "mongoose";

// types
import { type UtilDocument as Document } from "@/common/types/documentation/_document";

// Types
export interface CounterDocument extends Document {
  counting: string;
  seq: number;
}

export interface CounterModel extends Model<CounterDocument> {}
