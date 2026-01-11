// hooks
import { useSelector } from "@/store/withType";

// redux
import { selectOccasion } from "@/store/features/presets/occasionSlice";
import { selectVenue } from "@/store/features/presets/venueSlice";

// types
import { type CartCheckoutDocument } from "@/common/types/documentation/nestedDocuments/cartCheckout";
import {
  Asterisk,
  Mail,
  MapPin,
  PartyPopper,
  Smartphone,
  UserRound
} from "lucide-react";

export default function OrderDeliveryData({
  checkout
}: {
  checkout: CartCheckoutDocument;
}) {
  // redux states
  const { documents: occasions } = useSelector(selectOccasion.documentList);
  const { documents: venues } = useSelector(selectVenue.documentList);

  // variables
  const occasion = occasions.find(({ _id }) => _id === checkout?.occasion);
  const venue = venues.find(({ _id }) => _id === checkout?.venue);

  let checkoutData = [
    {
      svg: (
        <UserRound
          strokeWidth={1.5}
          width={14}
          height={14}
        />
      ),
      label: "Name",
      value: checkout?.name || ""
    },
    {
      svg: (
        <Smartphone
          strokeWidth={1.5}
          width={14}
          height={14}
        />
      ),
      label: "Mobile",
      value: checkout?.contact.mobileNumber || ""
    },
    {
      svg: (
        <Mail
          strokeWidth={1.5}
          width={14}
          height={14}
        />
      ),
      label: "Email",
      value: checkout?.contact.mail || ""
    }
  ];

  if (checkout?.contact?.alternateMobileNumber)
    checkoutData = [
      ...checkoutData,
      {
        label: "Alternate Mobile",
        svg: (
          <Smartphone
            strokeWidth={1.5}
            width={14}
            height={14}
          />
        ),
        value: checkout?.contact?.alternateMobileNumber || ""
      }
    ];

  if (occasion)
    checkoutData = [
      ...checkoutData,
      {
        label: "Occasion",
        svg: (
          <PartyPopper
            strokeWidth={1.5}
            width={14}
            height={14}
          />
        ),
        value: occasion.name || ""
      }
    ];

  if (venue)
    checkoutData = [
      ...checkoutData,
      {
        label: "Venue",
        svg: (
          <Asterisk
            strokeWidth={1.5}
            width={14}
            height={14}
          />
        ),
        value: venue.name || ""
      }
    ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-[1fr_200px] gap-x-0">
      <span className="text-charcoal-3/95 text-xl sm:col-span-2">
        Checkout
      </span>

      <div className="grid grid-cols-[15px_auto_1fr] items-center gap-x-2.5 text-charcoal-3 py-1.5 gap-y-1">
        {checkoutData.map(({ svg, label, value }, index) => (
          <>
            <span className="text-sm flex items-center justify-center">
              {svg}
            </span>
            <span className="text-sm pr-5 sm:pr-2">{label}</span>
            <span className="text-sm">{value}</span>
          </>
        ))}
      </div>

      <div className="flex flex-col justify-start gap-2 sm:border-l sm:pl-4">
        <span className="flex items-center justify-start text-sm max-sm:text-charcoal-3 sm:font-medium gap-2.5 sm:gap-2">
          <MapPin
            strokeWidth={1.5}
            width={15}
            height={15}
          />
          <span>Delivery Address</span>
        </span>

        <div className="flex items-start justify-start gap-2">
          <span className="px-3.5 py-0.5 bg-charcoal-3/10 rounded-lg text-[13px]">
            {checkout?.location?.city || "City"}
          </span>
          <span className="px-3.5 py-0.5 bg-charcoal-3/10 rounded-lg text-[13px]">
            {checkout?.location?.pincode || "Pincode"}
          </span>
        </div>

        <div className="text-sm text-charcoal-3/95">
          {checkout?.location?.address || ""}
        </div>

        {checkout?.location?.landmark && (
          <div className="text-sm text-charcoal-3/95">
            Landmark: {checkout?.location?.landmark}
          </div>
        )}
      </div>
    </section>
  );
}
