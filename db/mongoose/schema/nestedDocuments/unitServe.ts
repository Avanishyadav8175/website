// libraries
import { Schema } from "mongoose";

// types
import { UnitServeDocument } from "@/common/types/documentation/nestedDocuments/unitServe";

// schemas
export const unitServeSchema = new Schema<UnitServeDocument>(
  {
    value: {
      type: Number,
      required: true
    },
    minPerson: {
      type: Number,
      required: true
    },
    maxPerson: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
