// icons
import { PhoneOutgoing, UserPen } from "lucide-react";

// components
import CartCheckoutDifferentReceiverToggle from "./CartCheckoutDifferentReceiverToggle";

// types
import { type ChangeEvent } from "react";
import { type ReceiverInfo } from "../types/differentReceiver";

export default function CartCheckoutDifferentReceiver({
  hasDifferentReceiver,
  receiverInfo,
  onChangeHasDifferentReceiver,
  onChangeReceiverInfo
}: {
  hasDifferentReceiver: boolean;
  receiverInfo: ReceiverInfo;
  onChangeHasDifferentReceiver: (hasDifferentReceiver: boolean) => void;
  onChangeReceiverInfo: (receiverInfo: ReceiverInfo) => void;
}) {
  return (
    <>
      <CartCheckoutDifferentReceiverToggle
        isActive={hasDifferentReceiver}
        onToggleActive={() => {
          onChangeHasDifferentReceiver(!hasDifferentReceiver);
        }}
      />
      {hasDifferentReceiver && (
        <>
          <div
            className={`grid max-sm:grid-cols-[130px_calc(100dvw_-_158px)] grid-cols-[135px_1fr] justify-start gap-y-1`}
          >
            <span className="flex items-center justify-start gap-2">
              <UserPen
                strokeWidth={1.5}
                width={14}
                className="text-charcoal-3/80"
              />
              <span className="text-charcoal-3/80 text-sm whitespace-nowrap">
                Receiver Name
              </span>
              <span className="text-red-400 -translate-x-1">*</span>
            </span>
            <input
              type="text"
              value={receiverInfo?.name || ""}
              onChange={({
                target: { value: name }
              }: ChangeEvent<HTMLInputElement>) =>
                onChangeReceiverInfo({
                  ...receiverInfo,
                  name
                })
              }
              placeholder=""
              className="outline-none border-none rounded-xl px-3.5 py-3 text-charcoal-3 bg-ash-3/15 placeholder-charcoal-3/40 transition-all duration-300 hover:bg-ash-3/20 focus:outline-1 focus:outline-charcoal/30 autofill:bg-transparent"
            />
          </div>
          <div
            className={`grid max-sm:grid-cols-[130px_calc(100dvw_-_158px)] grid-cols-[135px_1fr] justify-start gap-y-1`}
          >
            <span className="flex items-center justify-start gap-2">
              <PhoneOutgoing
                strokeWidth={1.5}
                width={14}
                className="text-charcoal-3/80"
              />
              <span className="text-charcoal-3/80 text-sm whitespace-nowrap">
                Receiver Mobile
              </span>
              <span className="text-red-400 -translate-x-1">*</span>
            </span>
            <input
              type="text"
              placeholder=""
              value={receiverInfo.mobile}
              onChange={({
                target: { value: mobile }
              }: ChangeEvent<HTMLInputElement>) =>
                onChangeReceiverInfo({
                  ...receiverInfo,
                  mobile: mobile.replace(/[^0-9]/g, "").substring(0, 10)
                })
              }
              className="outline-none border-none rounded-xl px-3.5 py-3 text-charcoal-3 bg-ash-3/15 placeholder-charcoal-3/40 transition-all duration-300 hover:bg-ash-3/20 focus:outline-1 focus:outline-charcoal/30 autofill:bg-transparent"
            />
          </div>
        </>
      )}
    </>
  );
}
