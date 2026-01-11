// libraries
import { Schema } from "mongoose";

// types
import { SettingAuthActiveMethodsDocument } from "@/common/types/documentation/nestedDocuments/settingAuthActiveMethods";

// schemas
export const settingAuthActiveMethodsSchema =
  new Schema<SettingAuthActiveMethodsDocument>(
    {
      mail: {
        type: Boolean,
        required: true
      },
      mobile: {
        type: Boolean,
        required: true
      },
      whatsapp: {
        type: Boolean,
        required: true
      },
      google: {
        type: Boolean,
        required: true
      }
    },
    { timestamps: true }
  );
