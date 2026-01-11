// Libraries
import { Schema } from "mongoose";

// schemas
import { seoMetaSchema } from "@/db/mongoose/schema/nestedDocuments/seoMeta";
import { settingAuthSchema } from "@/db/mongoose/schema/nestedDocuments/settingAuth";
import { settingContactSchema } from "@/db/mongoose/schema/nestedDocuments/settingContact";
import { settingSocialDetailSchema } from "../nestedDocuments/settingSocialDetail";

// types
import {
  SettingDocument,
  SettingModel
} from "@/common/types/documentation/settings/setting";
import { settingPaymentSchema } from "../nestedDocuments/settingPayment";

// schema
export const settingSchema = new Schema<SettingDocument, SettingModel>({
  auth: {
    type: settingAuthSchema,
    required: true
  },
  payment: {
    type: settingPaymentSchema,
    required: true
  },
  callback: {
    type: Boolean,
    required: true
  },
  contact: {
    type: settingContactSchema,
    required: true
  },
  icon: {
    type: Schema.Types.ObjectId,
    ref: "Image",
    required: false
  },
  logo: {
    type: Schema.Types.ObjectId,
    ref: "Image",
    required: false
  },
  serviceImage: {
    type: Schema.Types.ObjectId,
    ref: "Image",
    required: false
  },
  social: [
    {
      type: settingSocialDetailSchema,
      required: false
    }
  ],
  // homepageSEOMeta: {
  //   type: seoMetaSchema,
  //   required: true
  // },
  createdBy: {
    type: String,
    required: true
  },
  updatedBy: {
    type: String,
    required: true
  }
});
