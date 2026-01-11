// Libraries
import { Schema } from "mongoose";

// types
import {
  CounterDocument,
  CounterModel
} from "@/common/types/documentation/utils/counter";

// schema
export const counterSchema = new Schema<CounterDocument, CounterModel>(
  {
    counting: {
      type: String,
      required: true,
      unique: true
    },
    seq: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
);
