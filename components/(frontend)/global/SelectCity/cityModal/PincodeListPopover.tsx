import { Children, ClassNameType } from "@/common/types/reactTypes";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { LocalPincodeDocument } from "../static/types";

export default function PincodeListPopover({
  children,
  forceHide,
  keepInvisible,
  popoverClassName,
  availablePincodes,
  onPincodeSelect
}: {
  children: Children;
  forceHide?: boolean;
  keepInvisible?: boolean;
  popoverClassName?: ClassNameType;
  availablePincodes: LocalPincodeDocument[];
  onPincodeSelect: (selectedPincode: LocalPincodeDocument) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      {forceHide ? (
        <></>
      ) : (
        <PopoverContent
          side="bottom"
          avoidCollisions={false}
          onOpenAutoFocus={(e) => e.preventDefault()}
          className={`${keepInvisible ? "scale-0 min-h-0 max-h-0 h-0" : ""} overflow-y-scroll scrollbar-hide max-h-[270px] flex flex-col justify-start p-2 py-2.5 transition-all duration-300 ${popoverClassName || ""}`}
        >
          {availablePincodes.map(({ _id, pincode, city }, index) => (
            <div
              className="cursor-pointer py-1.5 px-1 border-b-[1.5px] border-ash/60"
              key={index}
              onClick={() => onPincodeSelect({ _id, pincode, city })}
            >
              {pincode}, {city}
            </div>
          ))}
        </PopoverContent>
      )}
    </Popover>
  );
}
