// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";

// document
export interface SettingAuthActiveMethodsDocument extends Document {
  mail: boolean;
  mobile: boolean;
  whatsapp: boolean;
  google: boolean;
}
