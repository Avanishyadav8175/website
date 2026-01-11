// icons
import { Info } from "lucide-react";

// components
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

export default function CalendarColorLabel({
  onReset
}: {
  onReset: () => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className="absolute left-0 cursor-pointer px-4"
          onClick={onReset}
        >
          <Info
            strokeWidth={3}
            width={18}
            height={18}
          />
        </span>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        className="w-fit p-2 rounded-lg"
      >
        <section>
          <div className="flex items-center justify-start gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-300"></div>
            <span>Upcoming</span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-300"></div>
            <span>All India</span>
          </div>
          <div className="flex items-center justify-start gap-2">
            <div className="w-4 h-4 rounded-full bg-green-300"></div>
            <span>Delivered</span>
          </div>
        </section>
      </PopoverContent>
    </Popover>
  );
}
