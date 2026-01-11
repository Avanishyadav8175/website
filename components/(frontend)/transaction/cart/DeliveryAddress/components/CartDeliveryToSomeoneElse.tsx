import { ClassNameType } from "@/common/types/reactTypes";
import { DeliveryDetailsType } from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";
import { PhoneOutgoing, UserPen } from "lucide-react";

export default function DeliverToSomeoneElse({
  deliveryDetails,
  updateDeliveryDetails,
  className
}: {
  deliveryDetails: DeliveryDetailsType;
  updateDeliveryDetails: (updatedDeliveryDetails: DeliveryDetailsType) => void;
  className?: ClassNameType;
}) {
  return (
    <>
      {/* DELIVERING A GIFT ? -------------------------------------------------------- */}
      <div
        onClick={() =>
          updateDeliveryDetails(
            deliveryDetails.type === "default"
              ? {
                  ...deliveryDetails,
                  type: "gift",
                  receiverName: "",
                  receiverMobile: ""
                }
              : {
                  address: deliveryDetails.address,
                  pincode: deliveryDetails.pincode,
                  city: deliveryDetails.city,
                  name: deliveryDetails.name,
                  email: deliveryDetails.email,
                  mobile: deliveryDetails.mobile,
                  occasion: deliveryDetails.occasion,
                  type: "default"
                }
          )
        }
        className={`flex items-center justify-start gap-2 text-charcoal-3/80 text-sm cursor-pointer pt-3.5 pb-2 ${className || ""}`}
      >
        <div
          className={`relative rounded-full p-1 w-9 flex items-center transition-all duration-300 ${deliveryDetails.type === "gift" ? "bg-green-200/70" : "bg-ash/70"}`}
        >
          <div
            className={`rounded-full h-3 aspect-square transition-all duration-300 ${deliveryDetails.type === "gift" ? "translate-x-4 bg-green-500" : "bg-charcoal-3"}`}
          />
        </div>
        <span>Deliver to someone else</span>
      </div>

      {deliveryDetails.type === "gift" ? (
        <>
          <div
            className={`grid max-sm:grid-cols-[130px_calc(100dvw_-_158px)] grid-cols-[135px_1fr] justify-start gap-y-1 ${className || ""}`}
          >
            <span className="flex items-center justify-start gap-2">
              <UserPen
                strokeWidth={1.5}
                width={14}
                className="text-charcoal-3/80"
              />
              <span className="text-charcoal-3/80 text-sm">
                Receiver Name
              </span>
            </span>
            <input
              type="text"
              value={deliveryDetails.receiverName}
              onChange={(e) =>
                updateDeliveryDetails({
                  ...deliveryDetails,
                  receiverName: e.target.value
                })
              }
              placeholder=""
              className="outline-none border-none rounded-xl px-3.5 py-3 text-charcoal-3 bg-ash-3/15 placeholder-charcoal-3/40 transition-all duration-300 hover:bg-ash-3/20 focus:outline-1 focus:outline-charcoal/30 autofill:bg-transparent"
            />
          </div>

          <div
            className={`grid max-sm:grid-cols-[130px_calc(100dvw_-_158px)] grid-cols-[135px_1fr] justify-start gap-y-1 ${className || ""}`}
          >
            <span className="flex items-center justify-start gap-2">
              <PhoneOutgoing
                strokeWidth={1.5}
                width={14}
                className="text-charcoal-3/80"
              />
              <span className="text-charcoal-3/80 text-sm">
                Receiver Mobile
              </span>
            </span>
            <input
              type="text"
              placeholder=""
              value={deliveryDetails.receiverMobile}
              onChange={(e) =>
                updateDeliveryDetails({
                  ...deliveryDetails,
                  receiverMobile: e.target.value
                    .replace(/[^0-9]/g, "")
                    .substring(0, 10)
                })
              }
              className="outline-none border-none rounded-xl px-3.5 py-3 text-charcoal-3 bg-ash-3/15 placeholder-charcoal-3/40 transition-all duration-300 hover:bg-ash-3/20 focus:outline-1 focus:outline-charcoal/30 autofill:bg-transparent"
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
