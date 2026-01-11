// libraries
import { Schema } from "mongoose";

// schemas
import { contentUpgradeItemSchema } from "@/db/mongoose/schema/nestedDocuments/contentUpgradeItem";

// types
import { ContentUpgradeDocument } from "@/common/types/documentation/nestedDocuments/contentUpgrade";

// schemas
export const contentUpgradeSchema = new Schema<ContentUpgradeDocument>(
  {
    label: {
      type: Schema.Types.ObjectId,
      ref: "Label",
      required: true
    },
    default: {
      type: Schema.Types.ObjectId,
      ref: "Upgrade",
      required: true
    },
    options: [
      {
        type: contentUpgradeItemSchema,
        required: true
      }
    ]
  },
  { timestamps: true }
);
