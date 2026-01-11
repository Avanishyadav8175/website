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
import PaymentSettingActiveGateways from "./components/PaymentSettingActiveGateways";
import PaymentSettingDefaultGateway from "./components/PaymentSettingDefaultGateway";

// types
import { type PaymentGateway } from "./types/types";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { type SettingPaymentDocument } from "@/common/types/documentation/nestedDocuments/settingPayment";
import { type SettingPaymentActiveGatewaysDocument } from "@/common/types/documentation/nestedDocuments/settingPaymentActiveGateways";

export default function PaymentSetting({
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
  const [payment, setPayment] = useState<SettingPaymentDocument | null>(null);

  // variables
  const setting = settings.length ? settings[0] : null;
  const hasChanged =
    setting && payment
      ? JSON.stringify(payment) !== JSON.stringify(setting.payment)
      : false;

  // event handlers
  const handleChangeDefaultGateway = (newDefaultGateway: PaymentGateway) => {
    if (payment) {
      setPayment({
        ...payment,
        default: newDefaultGateway,
        active: {
          ...payment.active,
          [newDefaultGateway]: true
        }
      } as SettingPaymentDocument);
    }
  };

  const handleChangeActiveMethods = (
    newActiveGateways: SettingPaymentActiveGatewaysDocument
  ) => {
    if (payment) {
      setPayment({
        ...payment,
        active: newActiveGateways
      } as SettingPaymentDocument);
    }
  };

  const handleReset = () => {
    if (setting) {
      setPayment(setting.payment);
    }
  };

  const handleUpdate = () => {
    if (hasChanged && setting && payment) {
      dispatch(
        createSettingAction.updateDocument({
          documentId: setting._id as string,
          updateData: { payment }
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
      setPayment(setting.payment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setting]);

  return (
    <section className="flex items-center justify-center w-full h-full">
      <section className="flex flex-col gap-4">
        <span className={"text-3xl"}>Payment Setting</span>
        {payment ? (
          <>
            <PaymentSettingDefaultGateway
              defaultGateway={payment.default}
              onChangeDefaultGateway={handleChangeDefaultGateway}
            />
            <PaymentSettingActiveGateways
              defaultGateway={payment.default}
              activeGateways={payment.active}
              onChangeActiveGateways={handleChangeActiveMethods}
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
