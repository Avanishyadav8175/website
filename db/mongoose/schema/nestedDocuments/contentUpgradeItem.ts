// libraries
import { Schema } from "mongoose";

// types
import { ContentUpgradeItemDocument } from "@/common/types/documentation/nestedDocuments/contentUpgradeItem";

// schemas
export const contentUpgradeItemSchema = new Schema<ContentUpgradeItemDocument>(
  {
    upgrade: {
      type: Schema.Types.ObjectId,
      ref: "Upgrade",
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
