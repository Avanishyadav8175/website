// icons
import {
  ArrowDown,
  Building2,
  Mail,
  MapPin,
  PartyPopper,
  Pin,
  Smartphone,
  UserRound
} from "lucide-react";

// requests
import { fetchOccasions } from "@/request/preset/occasion";

// hooks
import { useEffect, useState } from "react";
import { useAppStates } from "@/hooks/useAppState/useAppState";
import { useCart } from "@/hooks/useOptimizedCart/useCart";

// components
import CartCheckoutSaveButton from "./CartCheckoutSaveButton";
import CartCheckoutDifferentReceiver from "./CartCheckoutDifferentReceiver";

// types
import { type CartCheckoutDocument } from "@/common/types/documentation/nestedDocuments/cartCheckout";
import { type ChangeEvent } from "react";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type OccasionDocument } from "@/common/types/documentation/presets/occasion";
import { type ReceiverInfo } from "../types/differentReceiver";

export default function CartCheckoutDetail({
  onClose
}: {
  onClose: () => void;
}) {
  // hooks
  const {
    isReady,
    location: {
      data: { selectedCity }
    },
    profile: {
      data: { addresses: customerAddresses, detail: customerDetail }
    }
  } = useAppStates();
  const {
    items: cartItems,
    checkout: cartCheckout,
    onChangeCheckout
  } = useCart();

  // states
  const [checkout, setCheckout] = useState<CartCheckoutDocument>({
    name: "",
    contact: {
      mobileNumber: "",
      mail: ""
    },
    location: {
      address: "",
      city: "",
      pincode: ""
    },
    deliverToSomeoneElse: false,
    receiverName: "",
    receiverMobileNumber: ""
  } as CartCheckoutDocument);
  const [occasions, setOccasions] = useState<OccasionDocument[]>([]);

  // variables
  const isOnlyAllIndiaDeliverableItems =
    cartItems?.length ===
    cartItems.filter(
      ({ content }) =>
        (content as ContentDocument)?.availability?.availableAt === "all-india"
    )?.length;

  const canSave =
    checkout.name &&
    checkout.contact.mobileNumber &&
    checkout.contact.mail &&
    checkout.location.address &&
    checkout.location.city &&
    checkout.location.pincode;

  // event handlers
  const handleSave = () => {
    onChangeCheckout(checkout);
    onClose();
  };

  const handleChangeHasDifferentReceiver = (hasDifferentReceiver: boolean) => {
    if (hasDifferentReceiver) {
      setCheckout({
        ...checkout,
        deliverToSomeoneElse: true
      } as CartCheckoutDocument);
    } else {
      setCheckout({
        ...checkout,
        deliverToSomeoneElse: false,
        receiverName: "",
        receiverMobileNumber: ""
      } as CartCheckoutDocument);
    }
  };

  const handleChangeReceiverInfo = ({ name, mobile }: ReceiverInfo) => {
    setCheckout({
      ...checkout,
      receiverName: name,
      receiverMobileNumber: mobile
    } as CartCheckoutDocument);
  };

  // side effects
  useEffect(() => {
    if (!occasions.length) {
      fetchOccasions({
        active: true,
        orderBy: "asc",
        sortBy: "name"
      })
        .then((response) => {
          if (response.data) {
            setOccasions(response.data as OccasionDocument[]);
          }
        })
        .catch((err) => {
          // console.error("Failed to fetch occasions: ", err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isReady) {
      setCheckout({
        name: cartCheckout?.name || customerDetail?.name || "",
        contact: {
          mobileNumber:
            cartCheckout?.contact?.mobileNumber ||
            customerDetail?.mobileNumber?.split("-")[1] ||
            "",
          mail: cartCheckout?.contact?.mail || customerDetail?.mail || ""
        },
        location: {
          address:
            cartCheckout?.location?.address ||
            customerAddresses?.find(({ isDefault }) => isDefault)?.address ||
            "",
          city: isOnlyAllIndiaDeliverableItems
            ? cartCheckout?.location?.city
            : selectedCity?.name || "",
          pincode: cartCheckout?.location?.pincode || ""
        },
        ...(cartCheckout?.occasion ? { occasion: cartCheckout?.occasion } : {}),
        deliverToSomeoneElse: cartCheckout?.deliverToSomeoneElse || false,
        receiverName: cartCheckout?.receiverName || "",
        receiverMobileNumber: cartCheckout?.receiverMobileNumber || ""
      } as CartCheckoutDocument);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  const customStyles = "outline-none py-2.5 border-b border-ash-3/60 text-charcoal-3 placeholder-charcoal-3/40 transition-all duration-300 hover:border-ash-3/80 focus:border-sienna-1/50";

  return (
    <section className="relative bg-ivory-1 overflow-hidden max-sm:overflow-y-scroll scrollbar-hide grid grid-cols-1 sm:w-[500px]">
      <div className="relative px-3.5 sm:pl-5 pt-5 grid grid-cols-1 auto-rows-min gap-4 gap-y-3 sm:overflow-y-scroll scrollbar-hide">
        <span className="text-2xl flex flex-col items-start py-2 max-sm:py-3">
          <span>Checkout</span>
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] justify-start sm:gap-y-1 max-sm:mb-3">
          <span className="flex items-center justify-start gap-2">
            {/* <UserRound
              strokeWidth={1.5}
              width={14}
              className="text-charcoal-3/80"
            /> */}
            <span className="text-charcoal-3/80 text-sm">Receiver Name</span>
            <span className="text-red-400 -translate-x-1">*</span>
          </span>
          <input
            type="text"
            value={checkout.name}
            onChange={({
              target: { value: name }
            }: ChangeEvent<HTMLInputElement>) =>
              setCheckout({
                ...checkout,
                name
              } as CartCheckoutDocument)
            }
            placeholder="Full Name"
            className={customStyles}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] justify-start sm:gap-y-1 max-sm:mb-3">
          <span className="flex items-center justify-start gap-2">
            {/* <Mail
              strokeWidth={1.5}
              width={14}
              className="text-charcoal-3/80"
            /> */}
            <span className="text-charcoal-3/80 text-sm">Receiver Email</span>
            <span className="text-red-400 -translate-x-1">*</span>
          </span>
          <input
            type="text"
            value={checkout.contact.mail}
            onChange={({
              target: { value: mail }
            }: ChangeEvent<HTMLInputElement>) =>
              setCheckout({
                ...checkout,
                contact: {
                  ...checkout.contact,
                  mail
                }
              } as CartCheckoutDocument)
            }
            placeholder="Email Address"
            className={customStyles}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] justify-start sm:gap-y-1 max-sm:mb-3">
          <span className="flex items-center justify-start gap-2">
            {/* <Smartphone
              strokeWidth={1.5}
              width={14}
              className="text-charcoal-3/80"
            /> */}
            <span className="text-charcoal-3/80 text-sm">Receiver Mobile</span>
            <span className="text-red-400 -translate-x-1">*</span>
          </span>
          <input
            type="text"
            value={checkout.contact.mobileNumber}
            onChange={({
              target: { value: mobileNumber }
            }: ChangeEvent<HTMLInputElement>) =>
              setCheckout({
                ...checkout,
                contact: {
                  ...checkout.contact,
                  mobileNumber
                }
              } as CartCheckoutDocument)
            }
            placeholder="Mobile No."
            className={customStyles}
          />
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] justify-start sm:gap-y-1 max-sm:mb-3">
          <span className="flex items-center justify-start gap-2">
            <PartyPopper
              strokeWidth={1.5}
              width={14}
              className="text-charcoal-3/80"
            />
            <span className="text-charcoal-3/80 text-sm">Occasion</span>
          </span>
          <select
            onChange={({
              target: { value: occasion }
            }: ChangeEvent<HTMLSelectElement>) =>
              setCheckout({
                ...checkout,
                ...(occasion ? { occasion } : { occasion: undefined })
              } as CartCheckoutDocument)
            }
            value={(checkout.occasion as string) || ""}
            className="cursor-pointer outline-none border-none rounded-xl px-3.5 py-3 text-charcoal-3 bg-ash-3/15 placeholder-charcoal-3/40 transition-all duration-300 hover:bg-ash-3/20 focus:outline-1 focus:outline-charcoal/30 autofill:bg-transparent"
          >
            <option
              value=""
              disabled
            >
              Select Occasion
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
        </div> */}
      </div>
      <div className="flex flex-col justify-start sm:gap-y-1 max-sm:mb-3 px-5 py-3 space-y-2">

        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] justify-start sm:gap-y-1 max-sm:mb-3">
          <span className="flex items-center justify-start gap-2 self-center">
            {/* <span>
            <Building2
              strokeWidth={1.5}
              width={14}
            />
          </span> */}
            <span className="text-sm sm:whitespace-nowrap text-charcoal-3/80">
              {/* {`${checkout.deliverToSomeoneElse ? "Receiver's " : ""}City`} */}
              City
            </span>
            <span className="text-red-400 -translate-x-1">*</span>
          </span>
          <input
            type="text"
            value={checkout.location.city ? checkout.location.city : ""}
            onChange={({
              target: { value: city }
            }: ChangeEvent<HTMLInputElement>) =>
              setCheckout({
                ...checkout,
                location: {
                  ...checkout.location,
                  city
                }
              } as CartCheckoutDocument)
            }
            disabled={!isOnlyAllIndiaDeliverableItems}
            className={customStyles}
          />
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] justify-start sm:gap-y-1 max-sm:mb-3">
          <span className="flex items-center justify-start gap-2 self-center">
            {/* <span>
            <Pin
              strokeWidth={1.5}
              width={14}
            />
          </span> */}
            <span className="text-sm sm:whitespace-nowrap text-charcoal-3/80">
              {/* {`${checkout.deliverToSomeoneElse ? "Receiver's " : ""} Pincode`} */}
              Receiver Pincode
            </span>
            <span className="text-red-400 -translate-x-1">*</span>
          </span>
          <input
            type="text"
            value={checkout.location.pincode}
            onChange={({
              target: { value: pincode }
            }: ChangeEvent<HTMLInputElement>) =>
              setCheckout({
                ...checkout,
                location: {
                  ...checkout.location,
                  pincode
                }
              } as CartCheckoutDocument)
            }
            className={customStyles}
          />
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] justify-start sm:gap-y-1 max-sm:mb-3">
          <span className="flex items-start justify-start gap-2 pt-3">
            {/* <Smartphone
              strokeWidth={1.5}
              width={14}
              className="text-charcoal-3/80"
            /> */}
            <span className="text-charcoal-3/80 text-sm">Receiver Address</span>
            <span className="text-red-400 -translate-x-1">*</span>
          </span>
          <textarea
            title="address"
            value={checkout.location.address}
            onChange={({
              target: { value: address }
            }: ChangeEvent<HTMLTextAreaElement>) =>
              setCheckout({
                ...checkout,
                location: {
                  ...checkout.location,
                  address
                }
              } as CartCheckoutDocument)
            }
            placeholder="Your Address"
            className={customStyles + " resize-none h-20"}
          />
        </div>
      </div>
      {/* <div className="relative sm:min-h-[200px] px-3.5 sm:pl-5 sm:py-5 grid grid-cols-1 auto-rows-min gap-4 gap-y-3 sm:overflow-y-scroll scrollbar-hide">
        <CartCheckoutDifferentReceiver
          hasDifferentReceiver={checkout.deliverToSomeoneElse!}
          receiverInfo={{
            name: checkout.receiverName!,
            mobile: checkout.receiverMobileNumber!
          }}
          onChangeHasDifferentReceiver={handleChangeHasDifferentReceiver}
          onChangeReceiverInfo={handleChangeReceiverInfo}
        />
      </div> */}
      {/* <div className="sticky bottom-5 sm:hidden bg-transparent z-10 flex items-center justify-end pr-4 -mb-14">
        <div className="rounded-full border border-charcoal-3/60 p-1.5  backdrop-blur-sm text-charcoal-3/60">
          <ArrowDown
            width={18}
            height={18}
          />
        </div>
      </div> */}
      <CartCheckoutSaveButton
        disabled={!canSave}
        onSave={handleSave}
      />
    </section>
  );
}
