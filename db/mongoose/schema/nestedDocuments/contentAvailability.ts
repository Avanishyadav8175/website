// libraries
import { Schema } from "mongoose";

// types
import { ContentAvailabilityDocument } from "@/common/types/documentation/nestedDocuments/contentAvailability";

// schemas
export const contentAvailabilitySchema =
  new Schema<ContentAvailabilityDocument>(
    {
      availableAt: {
        type: String,
        enum: ["all-india", "cities"],
        required: true
      },
      limitAvailability: {
        type: Boolean,
        required: false
      },
      cities: [
        {
          type: Schema.Types.ObjectId,
          ref: "City",
          required: false
        }
      ]
    },
    { timestamps: true }
  );
