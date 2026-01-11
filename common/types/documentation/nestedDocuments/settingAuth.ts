// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type SettingAuthActiveMethodsDocument } from "@/common/types/documentation/nestedDocuments/settingAuthActiveMethods";

// document
export interface SettingAuthDocument extends Document {
  default: "mail" | "mobile" | "whatsapp" | "google";
  active: SettingAuthActiveMethodsDocument;
}
