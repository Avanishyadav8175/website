// icons
import { CheckCheck, CircleAlert, OctagonX } from "lucide-react";

// types
import { type SelectCityStatus } from "../types/delivery";

export default function ContentDetailDeliverySelectCityStatus({
  status
}: {
  status: SelectCityStatus;
}) {
  return (
    <>
      <span></span> {/* placeholder grid item */}
      <div className="grid *:row-start-1 *:col-start-1">
        <span
          className={`text-xs pt-1 px-1 transition-all duration-300 overflow-hidden`}
        >
          {status === "" && <div className="h-[19px]"></div>}
          {status === "not-selected" && (
            <div className="flex items-center justify-start gap-1.5 font-medium text-yellow-700">
              <CircleAlert
                strokeWidth={1.5}
                height={19}
                width={19}
                className="fill-yellow-600 text-white stroke-white"
              />
              <span>City is required</span>
            </div>
          )}
          {status === "available" && (
            <div className="flex items-center justify-start gap-1.5 text-green-700">
              <CheckCheck
                strokeWidth={1.5}
                height={19}
                width={19}
                className="stroke-green-600"
              />
              <span>Delivery done here</span>
            </div>
          )}
          {status === "not-available" && (
            <div className="flex items-center justify-start gap-1.5 font-medium text-red-700">
              <OctagonX
                strokeWidth={1.5}
                height={19}
                width={19}
                className="stroke-red-500"
              />
              <span>We dont deliver here</span>
            </div>
          )}
        </span>
      </div>
    </>
  );
}
