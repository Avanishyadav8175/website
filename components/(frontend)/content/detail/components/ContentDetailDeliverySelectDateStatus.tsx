import { AlertTriangle, CheckCheck, CircleCheck } from "lucide-react";
import { SelectDateStatus } from "../types/delivery";

export default function ContentDetailDeliverySelectDateStatus({
  status
}: {
  status: SelectDateStatus;
}) {
  return (
    <>
      <span></span> {/* placeholder grid item */}
      <span className="grid *:row-start-1 *:col-start-1">
        <span
          className={`text-xs pt-1 px-1 transition-all duration-300 overflow-hidden`}
        >
          {status === "" && <div className="h-[19px]"></div>}
          {status === "not-selected" && (
            <div className="flex items-center justify-start gap-1.5 font-medium text-yellow-700">
              <AlertTriangle
                strokeWidth={1.5}
                height={19}
                width={19}
                className="fill-yellow-600 text-white stroke-white"
              />
              <span>Select Date & Time</span>
            </div>
          )}
          {status === "selected" && (
            <div className="flex items-center justify-start gap-1.5 text-green-700">
              <CheckCheck
                strokeWidth={1.5}
                height={19}
                width={19}
                className="text-green-600"
              />
              <span>Date and Time Available</span>
            </div>
          )}
        </span>
      </span>
    </>
  );
}
