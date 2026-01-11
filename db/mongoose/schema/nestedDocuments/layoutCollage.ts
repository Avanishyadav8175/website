// libraries
import { Schema } from "mongoose";

// types
import { LayoutCollageDocument } from "@/common/types/documentation/nestedDocuments/layoutCollage";
import { clickableImageSchema } from "./clickableImage";

// schema
export const layoutCollageSchema = new Schema<LayoutCollageDocument>(
  {
    type: {
      type: String,
      enum: [
        "l4-m0-r1",
        "l1-m0-r4",
        "l2-m1-r2",
        "lt1-lb2-rt1-rb2",
        "lt2-lb1-rt2-rb1"
      ],
      required: false,
      default: "l1-m0-r4"
    },
    images: [
      {
        type: clickableImageSchema,
        required: true
      }
    ]
  },
  { timestamps: true }
);
