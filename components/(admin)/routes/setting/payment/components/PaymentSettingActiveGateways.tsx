// constants
import { PAYMENT_GATEWAYS_DATA } from "../constants/data";

// types
import { type PaymentGateway } from "../types/types";
import { type SettingPaymentActiveGatewaysDocument } from "@/common/types/documentation/nestedDocuments/settingPaymentActiveGateways";

export default function PaymentSettingActiveGateways({
  defaultGateway,
  activeGateways,
  onChangeActiveGateways
}: {
  defaultGateway: PaymentGateway;
  activeGateways: SettingPaymentActiveGatewaysDocument;
  onChangeActiveGateways: (
    newActiveGateways: SettingPaymentActiveGatewaysDocument
  ) => void;
}) {
  const handleToggleActive = (method: PaymentGateway) => {
    if (method !== defaultGateway) {
      onChangeActiveGateways({
        ...activeGateways,
        [method]: !activeGateways[method]
      } as SettingPaymentActiveGatewaysDocument);
    }
  };

  return (
    <section className="grid grid-cols-[80px_1fr] items-center gap-5">
      <span className="text-xl">Active</span>
      <section className="flex gap-3">
        {PAYMENT_GATEWAYS_DATA.map(({ name, label, icon }, i) => (
          <article
            key={i}
            className={`flex items-center gap-2 px-5 py-2 ${activeGateways[name] ? "bg-teal-200" : "bg-charcoal-3/15"} rounded-md transition-colors duration-200 cursor-pointer`}
            onClick={() => {
              handleToggleActive(name);
            }}
          >
            {icon}
            {/* <span>{label}</span> */}
          </article>
        ))}
      </section>
    </section>
  );
}
