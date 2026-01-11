// types
import { type SettingAuthDocument } from "@/common/types/documentation/nestedDocuments/settingAuth";
import { type SettingAuthActiveMethodsDocument } from "@/common/types/documentation/nestedDocuments/settingAuthActiveMethods";

export const getInitialAuthValue = () =>
  ({
    default: "mobile",
    active: {
      mail: true,
      mobile: true,
      whatsapp: true,
      google: true
    } as SettingAuthActiveMethodsDocument
  }) as SettingAuthDocument;
