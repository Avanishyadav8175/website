// libraries
import { Schema } from "mongoose";

// types
import {
  type BalloonColorGroupDocument,
  type BalloonColorGroupModel
} from "@/common/types/documentation/presets/balloonColorGroup";

// schema
export const balloonColorGroupSchema = new Schema<
  BalloonColorGroupDocument,
  BalloonColorGroupModel
>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    colors: [
      {
        type: String,
        required: true
      }
    ],
    isActive: {
      type: Boolean,
      required: false,
      default: false
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false
    },
    createdBy: {
      type: String,
      required: true
    },
    updatedBy: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// search index
balloonColorGroupSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
