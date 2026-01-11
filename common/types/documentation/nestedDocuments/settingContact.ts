// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type SettingContactDetailDocument } from "@/common/types/documentation/nestedDocuments/settingContactDetail";

// document
export interface SettingContactDocument extends Document {
  mobile: SettingContactDetailDocument;
  whatsapp: SettingContactDetailDocument;
  mail: SettingContactDetailDocument;
  address: SettingContactDetailDocument;
}
