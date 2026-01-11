// libraries
import { Schema } from "mongoose";

// types
import { BlogLayoutImageDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutImage";

// schema
export const blogLayoutImageSchema = new Schema<BlogLayoutImageDocument>(
  {
    shape: {
      type: String,
      enum: [
        "default",
        "square",
        "sticker",
        "start-thumbnail",
        "end-thumbnail",
        "banner"
      ],
      required: false,
      default: "default"
    },
    style: {
      type: String,
      enum: [
        "",
        "duo-default",
        "duo-h",
        "duo-v",
        "trio-default",
        "trio-h",
        "trio-v",
        "trio-l-collage",
        "trio-r-collage",
        "trio-t-collage",
        "trio-b-collage",
        "quad-default",
        "quad-h",
        "quad-v",
        "quad-l-collage",
        "quad-r-collage",
        "quad-t-collage",
        "quad-b-collage"
      ],
      required: false,
      default: ""
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: false
      }
    ]
  },
  { timestamps: true }
);
