// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createSettingAction,
  selectSetting
} from "@/store/features/setting/settingSlice";

// components
import SelectImage from "@/components/custom/inputs/image/SelectImage";

// types
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";

export default function ServiceImageSetting({
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
  const imageStatus = useSelector(selectImage.status);

  const { documents: settings } = useSelector(selectSetting.documentList);

  // states
  const [serviceImage, setServiceImage] = useState<string>("");

  // variables
  const setting = settings.length ? settings[0] : null;
  const hasChanged = setting
    ? serviceImage !== (setting.serviceImage || "")
    : false;

  // event handlers
  const handleReset = () => {
    if (setting) {
      setServiceImage(setting.serviceImage as string);
    }
  };

  const handleUpdate = () => {
    if (hasChanged && setting) {
      dispatch(
        createSettingAction.updateDocument({
          documentId: setting._id as string,
          updateData: serviceImage
            ? { serviceImage }
            : // @ts-ignore
              { $unset: { serviceImage: "" } }
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
    if (imageStatus === "idle") {
      dispatch(createImageAction.fetchDocumentList());
    }
  }, [imageStatus, dispatch]);

  useEffect(() => {
    if (setting) {
      setServiceImage((setting.serviceImage as string) || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setting]);

  return (
    <section className="flex items-center justify-center w-full h-full">
      <section className="flex flex-col gap-4">
        <span className={"text-3xl"}>Service Image Setting</span>
        <SelectImage
          name="serviceImage"
          label=""
          value={serviceImage || ""}
          onChangeValue={setServiceImage}
        />
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
