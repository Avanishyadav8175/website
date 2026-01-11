// icons
import {
  Check,
  CircleCheckBig,
  EllipsisVertical,
  MapPin,
  PenLine,
  Trash2
} from "lucide-react";

// components
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

// types
import { type CustomerAddressDocument } from "@/common/types/documentation/nestedDocuments/customerAddress";

export default function CustomerAddress({
  address: { address, city, pincode, type, isDefault },
  index,
  onUpdate,
  onSetDefault,
  onDelete
}: {
  address: CustomerAddressDocument;
  index: number;
  onUpdate: () => void;
  onSetDefault: () => void;
  onDelete: () => void;
}) {
  const SHADES = [
    "bg-sky-200",
    "bg-green-200",
    "bg-amber-200",
    "bg-orange-200",
    "bg-fuchsia-200"
  ];

  return (
    <div className="relative flex overflow-hidden  items-start lg:flex-col justify-start max-lg:gap-x-4 border border-charcoal-3/25 shadow-[0px_0px_10px_#ececec] lg:shadow-[0px_0px_10px_#f1f1f1] bg-ivory-1 p-5 pt-[22px] lg:p-6 pb-7 lg:pb-9 rounded-2xl">
      <MapPin
        strokeWidth={1.5}
        width={30}
        height={30}
        className="scale-90"
      />
      <div className="flex flex-col justify-start">
        <span className="lg:pt-2 max-lg:text-lg font-medium capitalize">
          {type}
        </span>
        <span className="max-lg:pt-0.5 text-sm text-charcoal-3/90">
          {address}
        </span>
        <span className="max-lg:pt-0.5 text-sm lg:text-xs lg:pt-0.5 text-charcoal-3/90">
          {city + ", " + pincode}
        </span>
      </div>

      <div
        className="text-[13px] absolute bottom-2.5 right-3 cursor-pointer flex items-center justify-end gap-x-1"
        onClick={onSetDefault}
      >
        {isDefault && (
          <div className="flex items-center justify-center rounded-full bg-blue-500 text-white w-3.5 h-3.5">
            <Check
              width={11}
              height={11}
              strokeWidth={2.5}
              className="scale-90"
            />
          </div>
        )}
        <span
          className={
            isDefault
              ? "text-blue-500 font-medium"
              : "text-charcoal-3/50 transition-colors duration-300 hover:text-charcoal-3/85"
          }
        >
          {isDefault ? "Default" : "Mark as Default"}
        </span>
      </div>

      {/* THREE DOTS ----------- */}
      <span className="absolute right-2.5 top-2.5 z-10">
        <Popover>
          <PopoverTrigger className="rounded-full p-1.5 transition-all duration-300 hover:bg-ash/50 cursor-pointer">
            <EllipsisVertical
              strokeWidth={1.5}
              width={18}
              height={18}
            />
          </PopoverTrigger>
          <PopoverContent
            side="right"
            className="min-w-fit w-[150px] p-2 rounded-xl"
          >
            <span
              onClick={onUpdate}
              className="py-2 px-3 transition-all duration-300 hover:bg-ash/30 cursor-pointer rounded-md flex items-center justify-start gap-2.5"
            >
              <PenLine
                strokeWidth={1.5}
                width={18}
                height={18}
              />
              <span>Edit</span>
            </span>
            <span
              onClick={onDelete}
              className="py-2 px-3 transition-all duration-300 hover:bg-rose-50 hover:text-rose-500 cursor-pointer rounded-md flex items-center justify-start gap-2.5"
            >
              <Trash2
                strokeWidth={1.5}
                width={18}
                height={18}
              />
              <span>Delete</span>
            </span>
          </PopoverContent>
        </Popover>
      </span>

      <div
        className={`absolute right-0 top-0 translate-x-[calc(50%_-_18px)] -translate-y-1/2 rounded-full aspect-square h-full ${SHADES[index % SHADES.length]} -z-0`}
      />
    </div>
  );
}
