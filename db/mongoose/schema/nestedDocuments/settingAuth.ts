// libraries
import { Schema } from "mongoose";

// schemas
import { settingAuthActiveMethodsSchema } from "@/db/mongoose/schema/nestedDocuments/settingAuthActiveMethods";

// types
import { SettingAuthDocument } from "@/common/types/documentation/nestedDocuments/settingAuth";

// schemas
export const settingAuthSchema = new Schema<SettingAuthDocument>(
  {
    default: {
      type: String,
      enum: ["mail", "mobile", "whatsapp", "google"],
      required: true
    },
    active: {
      type: settingAuthActiveMethodsSchema,
      required: true
    }
  },
  { timestamps: true }
);
