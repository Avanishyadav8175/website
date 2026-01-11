// config
import { RENDERING_STRATEGY } from "@/config/renderingStrategy";

// requests
import { fetchSetting } from "@/request/setting/setting";

// components
import SettingDataAssign from "./SettingDataAssign";

// types
import { type SettingDocument } from "@/common/types/documentation/settings/setting";

async function getSetting() {
  try {
    const response = await fetchSetting(RENDERING_STRATEGY);

    if (response?.data) {
      return response.data as SettingDocument;
    }
  } catch (error) {
    return {} as SettingDocument;
  }

  return {} as SettingDocument;
}

export default async function SettingDataLoader() {
  const setting = await getSetting();

  return <SettingDataAssign setting={setting} />;
}
