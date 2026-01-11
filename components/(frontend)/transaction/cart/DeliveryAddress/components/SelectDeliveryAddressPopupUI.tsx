/* eslint-disable react-hooks/exhaustive-deps */
import { DrawerClose } from "@/components/ui/drawer";
import {
  Mail,
  MapPinIcon,
  PartyPopper,
  Pin,
  Smartphone,
  UserRound
} from "lucide-react";
import DeliverToSomeoneElse from "./CartDeliveryToSomeoneElse";
import { DeliveryDetailsType } from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";
// import { ModernDropdown } from "@/components/(_common)/Input/ModernInput";
import { OccasionDocument } from "@/common/types/documentation/presets/occasion";
import { useLocation } from "@/hooks/useLocation/useLocation";
import { useAppStates } from "@/hooks/useAppState/useAppState";

export default function SelectDeliveryAddressPopupUI({
  closeDialog,
  deliveryDetails,
  updateDeliveryDetails,
  onCloseAction,
  occasions
}: {
  closeDialog: () => void;
  deliveryDetails: DeliveryDetailsType;
  updateDeliveryDetails: (updatedDeliveryDetails: DeliveryDetailsType) => void;
  onCloseAction: () => void;
  occasions: OccasionDocument[];
}) {
  const {
    location: {
      // data: { selectedPincode },
      methods: { onChangeCity: onChangePincode }
    }
  } = useAppStates();
  const { onSearch } = useLocation();

  return (
    <section className="relative bg-ivory-1 rounded-2xl max-sm:rounded-b-none overflow-hidden max-sm:overflow-y-scroll scrollbar-hide grid grid-cols-1 sm:grid-cols-[3fr_2fr] sm:min-h-[500px] sm:max-h-[500px] sm:w-[740px]">
      {/* LEFT SIDE ----------------------------------------------- */}
      <div className="relative px-3.5 sm:pl-5 pt-5 sm:py-5 grid grid-cols-1 auto-rows-min gap-4 gap-y-3 sm:overflow-y-scroll scrollbar-hide">
        <span className="text-2xl flex flex-col items-start py-2 max-sm:py-3">
          <span>Delivery Details</span>
        </span>
        {/* NAME ============================================================ */}
        <div className="grid grid-cols-[95px_1fr] justify-start gap-y-1">
          <span className="flex items-center justify-start gap-2">
            <UserRound
              strokeWidth={1.5}
              width={14}
              className="text-charcoal-3/80"
            />
            <span className="text-charcoal-3/80 text-sm">Name</span>
          </span>
          <input
            type="text"
            value={deliveryDetails.name}
            onChange={(e) =>
              updateDeliveryDetails({
                ...deliveryDetails,
                name: e.target.value
              })
            }
            placeholder="Enter Full Name"
            className="outline-none border-none rounded-xl px-3.5 py-3 text-charcoal-3 bg-ash-3/15 placeholder-charcoal-3/40 transition-all duration-300 hover:bg-ash-3/20 focus:outline-1 focus:outline-charcoal/30 autofill:bg-transparent"
          />
        </div>

        {/* EMAIL ============================================================ */}
        <div className="grid grid-cols-[95px_1fr] justify-start gap-y-1">
          <span className="flex items-center justify-start gap-2">
            <Mail
              strokeWidth={1.5}
              width={14}
              className="text-charcoal-3/80"
            />
            <span className="text-charcoal-3/80 text-sm">Email</span>
          </span>
          <input
            type="text"
            value={deliveryDetails.email}
            onChange={(e) =>
              updateDeliveryDetails({
                ...deliveryDetails,
                email: e.target.value
              })
            }
            placeholder="Enter Email Address"
            className="outline-none border-none rounded-xl px-3.5 py-3 text-charcoal-3 bg-ash-3/15 placeholder-charcoal-3/40 transition-all duration-300 hover:bg-ash-3/20 focus:outline-1 focus:outline-charcoal/30 autofill:bg-transparent"
          />
        </div>

        {/* MOBILE ============================================================ */}
        <div className="grid grid-cols-[95px_1fr] justify-start gap-y-1">
          <span className="flex items-center justify-start gap-2">
            <Smartphone
              strokeWidth={1.5}
              width={14}
              className="text-charcoal-3/80"
            />
            <span className="text-charcoal-3/80 text-sm">Mobile</span>
          </span>
          <input
            type="text"
            value={deliveryDetails.mobile}
            onChange={(e) =>
              updateDeliveryDetails({
                ...deliveryDetails,
                mobile: e.target.value.replace(/\D/g, "").substring(0, 10)
              })
            }
            placeholder="Enter Mobile No."
            className="outline-none border-none rounded-xl px-3.5 py-3 text-charcoal-3 bg-ash-3/15 placeholder-charcoal-3/40 transition-all duration-300 hover:bg-ash-3/20 focus:outline-1 focus:outline-charcoal/30 autofill:bg-transparent"
          />
        </div>

        {/* OCCASION ============================================================ */}
        <div className="grid grid-cols-[95px_1fr] justify-start gap-y-1">
          <span className="flex items-center justify-start gap-2">
            <PartyPopper
              strokeWidth={1.5}
              width={14}
              className="text-charcoal-3/80"
            />
            <span className="text-charcoal-3/80 text-sm">Occasion</span>
          </span>
          <select
            onChange={(e) =>
              updateDeliveryDetails({
                ...deliveryDetails,
                occasion: e.target.value
              })
            }
            value={deliveryDetails.occasion || "0"}
            className="cursor-pointer outline-none border-none rounded-xl px-3.5 py-3 text-charcoal-3 bg-ash-3/15 placeholder-charcoal-3/40 transition-all duration-300 hover:bg-ash-3/20 focus:outline-1 focus:outline-charcoal/30 autofill:bg-transparent"
          >
            <option
              value="0"
              selected
              disabled
            >
              Select Value
            </option>
            {occasions.map(({ _id, name }, index) => (
              <option
                value={_id as string}
                key={index}
              >
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* DELIVER TO SOMEONE ELSE (TRIGGER) ============================================================ */}
        <DeliverToSomeoneElse
          className="max-sm:hidden"
          deliveryDetails={deliveryDetails}
          updateDeliveryDetails={updateDeliveryDetails}
        />
      </div>

      {/* RIGHT SIDE ---------------------------------------------- */}
      <div className="*:px-3.5 *:sm:pr-5 sm:pt-5 sm:bg-ash-3/15 text-charcoal-3/80 flex flex-col justify-between sm:gap-4">
        <div className="grid grid-cols-[95px_1fr] sm:grid-cols-[22px_1fr] grid-rows-[repeat(4,auto)] gap-y-3 sm:gap-y-1.5 items-start sm:items-center max-sm:mt-3">
          {/* ADDRESS ============================================================ */}
          <span className="flex items-center justify-start gap-2 pt-1 max-sm:pt-3">
            <span>
              <MapPinIcon
                strokeWidth={1.5}
                width={14}
              />
            </span>
            <span className="text-sm sm:whitespace-nowrap">
              {deliveryDetails.type === "gift" ? "Receiver Address" : "Address"}
            </span>
          </span>

          <textarea
            title="address"
            value={deliveryDetails.address}
            onChange={(e) =>
              updateDeliveryDetails({
                ...deliveryDetails,
                address: e.target.value
              })
            }
            placeholder="Your Address"
            className="sm:col-span-2 rounded-xl px-3.5 py-3 h-[100px] sm:h-[140px] outline-none scrollbar-hide bg-ash-3/20 sm:mb-3 resize-none focus:outline-1 focus:outline-charcoal/30 autofill:bg-transparent max-sm:text-charcoal-3 max-sm:bg-ash-3/15 max-sm:placeholder-charcoal-3/40 max-sm:transition-all max-sm:duration-300 max-sm:hover:bg-ash-3/20"
          />

          {/* PINCODE ============================================================ */}
          <span className="flex items-center justify-start gap-2 self-center">
            <span>
              <Pin
                strokeWidth={1.5}
                width={14}
              />
            </span>
            <span className="text-sm sm:whitespace-nowrap">
              {deliveryDetails.type === "gift" ? "Receiver Pincode" : "Pincode"}
            </span>
          </span>

          {/* <ModernDropdown
            name=""
            placeholder={""}
            isDisabled={deliveryDetails.type === "gift" ? false : true}
            distinctStyle="!z-[999] sm:col-span-2 px-3.5 py-3 rounded-xl outline-none scrollbar-hide bg-ash-3/20 focus:outline-1 focus:outline-charcoal/30 autofill:bg-transparent max-sm:text-charcoal-3 max-sm:bg-ash-3/15 max-sm:placeholder-charcoal-3/40 max-sm:transition-all max-sm:duration-300 max-sm:hover:bg-ash-3/20"
            onSearchPincode={onSearch}
            onSelectPincode={onChangePincode}
            selectedPincode={selectedPincode}
          /> */}
        </div>

        {/* CONFIRM ============================================================ */}
        <div
          className="max-sm:hidden pb-5"
          onClick={() => {
            onCloseAction();
            closeDialog();
          }}
        >
          <div className="bg-charcoal-3 text-white text-center px-5 py-2.5 rounded-xl cursor-pointer">
            Confirm
          </div>
        </div>

        <DeliverToSomeoneElse
          className="sm:hidden mb-3"
          deliveryDetails={deliveryDetails}
          updateDeliveryDetails={updateDeliveryDetails}
        />
      </div>

      <div className="sm:hidden py-2 max-sm:border-t border-charcoal-3/10 px-3.5 bg-ivory-1 max-sm:sticky max-sm:bottom-0">
        <DrawerClose
          asChild
          className="sm:hidden"
        >
          <div
            onClick={onCloseAction}
            className="bg-charcoal-3 text-white text-center px-5 py-3 rounded-xl cursor-pointer"
          >
            Confirm
          </div>
        </DrawerClose>
      </div>
    </section>
  );
}
