// libraries
import { Schema } from "mongoose";

// types
import { SettingContactDetailDocument } from "@/common/types/documentation/nestedDocuments/settingContactDetail";

// schemas
export const settingContactDetailSchema =
  new Schema<SettingContactDetailDocument>(
    {
      label: {
        type: String,
        required: true
      },
      contact: {
        type: String,
        required: true
      },
      icon: {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: false
      },
      description: {
        type: String,
        required: false
      }
    },
    { timestamps: true }
  );
