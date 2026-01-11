// libraries
import { Schema } from "mongoose";

// schemas
import { blogLayoutImageSchema } from "@/db/mongoose/schema/nestedDocuments/blogLayoutImage";
import { qaSchema } from "@/db/mongoose/schema/nestedDocuments/qa";

// types
import { BlogLayoutDocument } from "@/common/types/documentation/nestedDocuments/blogLayout";

// schema
export const blogLayoutSchema = new Schema<BlogLayoutDocument>(
  {
    content: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
        required: false
      }
    ],
    faq: [
      {
        type: qaSchema,
        required: false
      }
    ],
    image: {
      type: blogLayoutImageSchema,
      required: false
    },
    text: {
      type: String,
      required: false
    },
    video: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);
