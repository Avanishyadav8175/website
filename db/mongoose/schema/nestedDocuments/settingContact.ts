// libraries
import { Schema } from "mongoose";

// schemas
import { settingContactDetailSchema } from "@/db/mongoose/schema/nestedDocuments/settingContactDetail";

// types
import { SettingContactDocument } from "@/common/types/documentation/nestedDocuments/settingContact";

// schemas
export const settingContactSchema = new Schema<SettingContactDocument>(
  {
    mobile: {
      type: settingContactDetailSchema,
      required: true
    },
    whatsapp: {
      type: settingContactDetailSchema,
      required: true
    },
    mail: {
      type: settingContactDetailSchema,
      required: true
    },
    address: {
      type: settingContactDetailSchema,
      required: true
    }
  },
  { timestamps: true }
);
