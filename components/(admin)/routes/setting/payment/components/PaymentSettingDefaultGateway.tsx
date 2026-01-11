// constants
import { PAYMENT_GATEWAYS_DATA } from "../constants/data";

// types
import { type PaymentGateway } from "../types/types";

export default function PaymentSettingDefaultGateway({
  defaultGateway,
  onChangeDefaultGateway
}: {
  defaultGateway: PaymentGateway;
  onChangeDefaultGateway: (newDefaultGateway: PaymentGateway) => void;
}) {
  return (
    <section className="grid grid-cols-[80px_1fr] items-center gap-5">
      <span className="text-xl">Default</span>
      <section className="flex gap-3">
        {PAYMENT_GATEWAYS_DATA.map(({ name, label, icon }, i) => (
          <article
            key={i}
            className={`flex items-center gap-2 px-5 py-2 ${defaultGateway === name ? "bg-teal-200" : "bg-charcoal-3/15"} rounded-md transition-colors duration-200 cursor-pointer`}
            onClick={() => {
              onChangeDefaultGateway(name);
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
