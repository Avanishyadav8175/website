// icons
import {
  EllipsisVertical,
  NotebookPen,
  PenLine,
  Trash2,
  UserRound
} from "lucide-react";

// libraries
import moment from "moment";

// components
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

// types
import { type CustomerReminderDocument } from "@/common/types/documentation/nestedDocuments/customerReminder";
import { type OccasionDocument } from "@/common/types/documentation/presets/occasion";
import { type RelationDocument } from "@/common/types/documentation/presets/relation";

export default function CustomerReminder({
  occasions,
  relations,
  reminder: { recipientName, date, occasion, relation, note },
  index,
  onUpdate,
  onDelete
}: {
  occasions: OccasionDocument[];
  relations: RelationDocument[];
  reminder: CustomerReminderDocument;
  index: number;
  onUpdate: () => void;
  onDelete: () => void;
}) {
  const occasionName =
    occasions.find(({ _id }) => _id === occasion)?.name || "";
  const relationName =
    relations.find(({ _id }) => _id === relation)?.name || "";

  const SHADES = [
    "bg-fuchsia-200",
    "bg-amber-200",
    "bg-green-200",
    "bg-red-200",
    "bg-sky-200"
  ];

  return (
    <div className="relative overflow-hidden grid grid-cols-[30px_1fr] grid-rows-[repeat(3,auto)] max-sm:gap-x-4 sm:flex sm:flex-col sm:items-start sm:justify-start border border-charcoal-3/25 shadow-[0px_0px_10px_#ececec] sm:shadow-[0px_0px_10px_#f1f1f1] bg-ivory-1 p-6 rounded-2xl">
      <span className="max-sm:col-span-2 sm:pt-4 font-medium capitalize">
        {moment(date).format("DD MMM")}
      </span>
      <span className="sm:pt-1.5 sm:pb-2.5 text-sm text-charcoal-3/90 sm:text-charcoal-3/70 max-sm:mb-2 max-sm:mt-0.5">
        {occasionName}
      </span>
      <span className="max-sm:col-span-2 grid grid-cols-[20px_1fr] gap-y-0.5 gap-x-1 items-center max-sm:!text-charcoal-3/70">
        <UserRound
          strokeWidth={2}
          width={15}
          height={15}
        />
        <span className="max-sm:pt-0.5 text-sm text-charcoal-3/90 max-sm:!text-charcoal-3/7">{`${recipientName} (${relationName})`}</span>
      </span>
      {note && (
        <span className="max-sm:col-span-2 grid grid-cols-[20px_1fr] gap-y-0.5 gap-x-1 items-center pt-1 max-sm:!text-charcoal-3/70">
          <NotebookPen
            strokeWidth={2}
            width={15}
            height={15}
          />
          <span className="line-clamp-1 max-sm:pt-0.5 text-sm text-charcoal-3/90 max-sm:!text-charcoal-3/7">
            {note}
          </span>
        </span>
      )}
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
