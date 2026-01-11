// libraries
import { Schema } from "mongoose";

// schemas
import { contentListItemDataImageSchema } from "@/db/mongoose/schema/nestedDocuments/contentListItemDataImage";
import { contentListItemDataTagSchema } from "@/db/mongoose/schema/nestedDocuments/contentListItemDataTag";

// types
import { type ContentListItemDataDocument } from "@/common/types/documentation/nestedDocuments/contentListItemData";

// schemas
export const contentListItemDataSchema =
  new Schema<ContentListItemDataDocument>(
    {
      name: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true
      },
      image: {
        type: contentListItemDataImageSchema,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      discount: {
        type: Number,
        required: true
      },
      ratingValue: {
        type: Number,
        required: false
      },
      ratingCount: {
        type: Number,
        required: false
      },
      processingTime: {
        type: Number,
        required: true
      },
      lastDeliverySlot: {
        type: String,
        required: false
      },
      edible: {
        type: String,
        enum: ["veg", "non-veg"],
        required: false
      },
      tag: {
        type: contentListItemDataTagSchema,
        required: false
      },
      createdDate: {
        type: Date,
        required: true
      }
    },
    { timestamps: true }
  );
