// icons
import { Clock } from "lucide-react";

// types
import { TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

export default function ContentDetailDeliverySelectTimeDeliveryTypeTimeSlot({
  timeSlot,
  isActive,
  onSelect
}: {
  timeSlot: TimeSlotDocument;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`relative group py-1.5 text-[14px] flex items-center justify-start gap-2 rounded-md cursor-pointer border-[1px] border-l-0 border-transparent transition-all duration-300 ${isActive ? "bg-gradient-to-r from-transparent to-sienna/30 border-sienna/20 font-medium text-sienna" : "hover:bg-gradient-to-r hover:from-transparent hover:to-ash/60 hover:border-ash/30"}`}
      onClick={onSelect}
    >
      <span>
        <Clock
          strokeWidth={1}
          height={17}
          width={17}
          className={isActive ? `stroke-sienna brightness-75` : ""}
        />
      </span>
      <span>{timeSlot.label}</span>
      {isActive && <span className="absolute right-2 text-sienna">Selected</span>}
    </div>
  );
}
