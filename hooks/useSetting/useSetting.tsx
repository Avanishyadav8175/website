"use client";

// requests
import { fetchSetting } from "@/request/setting/setting";

// utils
import { createContext, useEffect } from "react";

// hooks
import { useContext, useState } from "react";

// types
import { type ReactNode } from "react";
import { type SettingDocument } from "@/common/types/documentation/settings/setting";
import { type SettingAuthDocument } from "@/common/types/documentation/nestedDocuments/settingAuth";
import { type SettingPaymentDocument } from "@/common/types/documentation/nestedDocuments/settingPayment";

type Setting = {
  status: "initial" | "idle" | "pending";
  auth: SettingAuthDocument | null;
  payment: SettingPaymentDocument | null;
};

const Setting = createContext<Setting | undefined>(undefined);

export function SettingProvider({ children }: { children: ReactNode }) {
  // states
  const [status, setStatus] = useState<"initial" | "idle" | "pending">(
    "initial"
  );
  const [setting, setSetting] = useState<SettingDocument | null>(null);

  // side effects
  useEffect(() => {
    if (status === "initial") {
      fetchSetting()
        .then(({ data: setting }) => {
          setStatus("idle");
          setSetting(setting as SettingDocument);
        })
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Setting.Provider
      value={{
        status,
        auth: setting?.auth || null,
        payment: setting?.payment || null
      }}
    >
      {children}
    </Setting.Provider>
  );
}

export const useSetting = (): Setting => {
  const setting = useContext(Setting);

  if (!setting) {
    throw new Error("useSetting must be used within a SettingProvider");
  }

  return setting;
};
