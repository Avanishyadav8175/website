// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// utils
import { getInitialAuthValue } from "./utils/getInitialAuthValue";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createSettingAction,
  selectSetting
} from "@/store/features/setting/settingSlice";

// components
import AuthSettingActiveMethods from "./components/AuthSettingActiveMethods";
import AuthSettingDefaultMethod from "./components/AuthSettingDefaultMethod";

// types
import { type AuthMethod } from "./types/types";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type SettingAuthDocument } from "@/common/types/documentation/nestedDocuments/settingAuth";
import { type SettingAuthActiveMethodsDocument } from "@/common/types/documentation/nestedDocuments/settingAuthActiveMethods";

export default function AuthSetting({
  userName,
  isSuperAdmin,
  permission
}: {
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux states
  const settingStatus = useSelector(selectSetting.status);

  const { documents: settings } = useSelector(selectSetting.documentList);

  // states
  const [auth, setAuth] = useState<SettingAuthDocument | null>(null);

  // variables
  const setting = settings.length ? settings[0] : null;
  const hasChanged =
    setting && auth
      ? JSON.stringify(auth) !== JSON.stringify(setting.auth)
      : false;

  // event handlers
  const handleChangeDefaultMethod = (newDefaultMethod: AuthMethod) => {
    if (auth) {
      setAuth({
        ...auth,
        default: newDefaultMethod,
        active: {
          ...auth.active,
          [newDefaultMethod]: true
        }
      } as SettingAuthDocument);
    }
  };

  const handleChangeActiveMethods = (
    newActiveMethods: SettingAuthActiveMethodsDocument
  ) => {
    if (auth) {
      setAuth({
        ...auth,
        active: newActiveMethods
      } as SettingAuthDocument);
    }
  };

  const handleReset = () => {
    if (setting) {
      setAuth(setting.auth);
    }
  };

  const handleUpdate = () => {
    if (hasChanged && setting && auth) {
      dispatch(
        createSettingAction.updateDocument({
          documentId: setting._id as string,
          updateData: { auth }
        })
      );
    }
  };

  // side effects
  useEffect(() => {
    if (settingStatus === "idle") {
      dispatch(createSettingAction.fetchDocumentList());
    }
  }, [settingStatus, dispatch]);

  useEffect(() => {
    if (setting) {
      setAuth(setting.auth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setting]);

  return (
    <section className="flex items-center justify-center w-full h-full">
      <section className="flex flex-col gap-4">
        <span className={"text-3xl"}>Auth Setting</span>
        {auth ? (
          <>
            <AuthSettingDefaultMethod
              defaultMethod={auth.default}
              onChangeDefaultAuth={handleChangeDefaultMethod}
            />
            <AuthSettingActiveMethods
              defaultMethod={auth.default}
              activeMethods={auth.active}
              onChangeActiveMethods={handleChangeActiveMethods}
            />
          </>
        ) : (
          <span>Loading...</span>
        )}
        {hasChanged && (
          <section className="flex items-center justify-end gap-4">
            <div
              className={BUTTON_STYLES.GHOST}
              onClick={handleReset}
            >
              Reset
            </div>
            <div
              className={BUTTON_STYLES.PRIMARY}
              onClick={handleUpdate}
            >
              Update
            </div>
          </section>
        )}
      </section>
    </section>
  );
}
