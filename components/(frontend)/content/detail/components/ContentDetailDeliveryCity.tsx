// icons
import { LocateFixed, MapPin } from "lucide-react";

// components
import ContentDetailDeliverySelectCity from "./ContentDetailDeliverySelectCity";
import ContentDetailDeliverySelectCityStatus from "./ContentDetailDeliverySelectCityStatus";

// types
import { type SelectCityStatus } from "../types/delivery";

export default function ContentDetailDeliveryCity({
  status
}: {
  status: SelectCityStatus;
}) {
  return (
    <div className="grid grid-cols-[110px_1fr] sm:grid-cols-1 sm:grid-rows-[repeat(3,auto)] gap-x-1.5 text-charcoal-3/95">
      <span
        className={
          "text-left flex items-center justify-start gap-1.5 text-sm sm:mb-1.5"
        }
      >
        <LocateFixed
          strokeWidth={1}
          width={18}
          height={18}
        />
        <span>Select City</span>
      </span>
      <ContentDetailDeliverySelectCity />
      <ContentDetailDeliverySelectCityStatus status={status} />
    </div>
  );
}
