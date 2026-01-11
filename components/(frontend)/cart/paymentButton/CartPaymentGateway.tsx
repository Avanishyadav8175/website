// icons
import { Check, ChevronRight } from "lucide-react";

// components
import Image from "next/image";

export default function CartPaymentGateway({
  gateway,
  onChangeGateway
}: {
  gateway: "razorpay" | "payu";
  onChangeGateway: (gateway: "razorpay" | "payu") => void;
}) {
  return (
    <div className="pt-2 pb-4 text-sm max-sm:shadow-sm -z-0 rounded-t-xl grid grid-cols-[37px_1fr_auto] gap-x-2.5 overflow-hidden">
      <div className="border border-charcoal-3/40 rounded-lg overflow-hidden relative aspect-square grid place-items-center p-1.5">
        <Image
          src={
            gateway === "razorpay" ? "/logo/razorpay.png" : "/logo/payu.webp"
          }
          alt="payment gateway"
          decoding="async"
          draggable={false}
          width={40}
          height={40}
          className="w-full h-full object-cover object-center scale-105"
          unoptimized
        />
      </div>
      <div className="flex flex-col justify-start">
        <span className="text-charcoal-3/80">Payment Partner</span>
        <span className="font-medium leading-tight flex items-center justify-start gap-x-1">
          <span>{gateway === "razorpay" ? "Razorpay" : "PayU"}</span>
          <span className="p-[3px] text-white bg-green-500 scale-[0.75] rounded-full grid place-items-center">
            <Check
              strokeWidth={1.5}
              width={12}
              height={12}
            />
          </span>
        </span>
      </div>
      <div className="group flex items-center justify-end">
        <div className="flex items-center justify-end gap-x-0.5 font-medium text-blue-600 cursor-pointer hover:underline hover:underline-offset-2 group-hover:opacity-0 transition-all duration-300">
          <span>Change</span>
          <ChevronRight
            width={15}
            height={15}
            className="translate-y-px"
          />
        </div>
        <div className="*:cursor-pointer text-[13px] grid grid-cols-[auto_20px] gap-y-px text-right font-medium items-center transition-all duration-300 w-0 group-hover:w-20 opacity-0 group-hover:opacity-100">
          <span
            onClick={() => {
              onChangeGateway("razorpay");
            }}
            className="pr-2.5"
          >
            Razorpay
          </span>
          <span
            onClick={() => {
              onChangeGateway("razorpay");
            }}
            className={`rounded-full aspect-square w-2  ${gateway === "razorpay" ? "ring-1 ring-offset-1 ring-blue-500 bg-blue-500" : "bg-charcoal-3/55"} transition-all duration-300`}
          />
          <span
            onClick={() => {
              onChangeGateway("payu");
            }}
            className="pr-2.5"
          >
            PayU
          </span>
          <span
            onClick={() => {
              onChangeGateway("payu");
            }}
            className={`rounded-full aspect-square w-2  ${gateway === "payu" ? "ring-1 ring-offset-1 ring-blue-500 bg-blue-500" : "bg-charcoal-3/55"} transition-all duration-300`}
          />
        </div>
      </div>
    </div>
  );
}
