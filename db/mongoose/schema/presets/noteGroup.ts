// libraries
import { Schema } from "mongoose";

// types
import {
  type NoteGroupDocument,
  type NoteGroupModel
} from "@/common/types/documentation/presets/noteGroup";

// schema
export const noteGroupSchema = new Schema<NoteGroupDocument, NoteGroupModel>(
  {
    occasion: {
      type: Schema.Types.ObjectId,
      ref: "Occasion",
      required: true
    },
    name: {
      type: String,
      required: true,
      unique: true
    },
    templates: [
      {
        type: String,
        required: true
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
noteGroupSchema.index({
  name: "text",
  createdBy: "text",
  updatedBy: "text"
});
