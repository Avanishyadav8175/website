// libraries
import { Schema } from "mongoose";

// schemas
import { unitServeSchema } from "@/db/mongoose/schema/nestedDocuments/unitServe";

// types
import {
  type UnitDocument,
  type UnitModel
} from "@/common/types/documentation/presets/unit";

// schema
export const unitSchema = new Schema<UnitDocument, UnitModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    abbr: {
      type: String,
      required: true,
      unique: true
    },
    serves: [
      {
        type: unitServeSchema,
        required: false
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
unitSchema.index({
  name: "text",
  abbr: "text",
  createdBy: "text",
  updatedBy: "text"
});
