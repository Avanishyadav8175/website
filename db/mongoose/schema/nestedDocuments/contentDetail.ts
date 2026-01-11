// libraries
import { Schema } from "mongoose";

// types
import { ContentDetailDocument } from "@/common/types/documentation/nestedDocuments/contentDetail";

// schemas
export const contentDetailSchema = new Schema<ContentDetailDocument>(
  {
    includes: [
      {
        type: String,
        required: true
      }
    ],
    excludes: [
      {
        type: String,
        required: false
      }
    ],
    deliveryDetail: {
      type: Schema.Types.ObjectId,
      ref: "DeliveryDetail",
      required: true
    },
    careInfo: {
      type: Schema.Types.ObjectId,
      ref: "CareInfo",
      required: true
    },
    cancellationPolicy: {
      type: Schema.Types.ObjectId,
      ref: "CancellationPolicy",
      required: true
    },
    faqGroup: {
      type: Schema.Types.ObjectId,
      ref: "FAQGroup",
      required: true
    },
    colors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Color",
        required: false
      }
    ],
    occasions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Occasion",
        required: false
      }
    ],
    relations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Relation",
        required: false
      }
    ]
  },
  { timestamps: true }
);
