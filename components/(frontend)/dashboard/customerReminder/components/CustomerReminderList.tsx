// icons
import { Plus } from "lucide-react";

// components
import CustomerReminder from "./CustomerReminder";

// types
import { type OccasionDocument } from "@/common/types/documentation/presets/occasion";
import { type RelationDocument } from "@/common/types/documentation/presets/relation";
import { CustomerReminderDocument } from "@/common/types/documentation/nestedDocuments/customerReminder";

export default function CustomerReminderList({
  reminders,
  occasions,
  relations,
  onAdd,
  onUpdate,
  onDelete
}: {
  reminders: CustomerReminderDocument[];
  occasions: OccasionDocument[];
  relations: RelationDocument[];
  onAdd: () => void;
  onUpdate: (reminderId: string) => void;
  onDelete: (reminderId: string) => void;
}) {
  return (
    <section className="grid grid-cols-1 auto-rows-min sm:px-6">
      <div className="flex max-sm:flex-col max-sm:text-center items-center justify-start sm:justify-between pt-10 pb-6">
        <span className="flex flex-col justify-start sm:gap-1">
          <span className="text-2xl">My Reminders</span>
          <span className="text-sm text-charcoal-3/70">
            Total Reminders: {reminders.length}
          </span>
        </span>
        <div
          onClick={onAdd}
          className="w-fit justify-self-center flex items-center justify-center gap-2 sm:gap-3 py-2 sm:py-2.5 px-5 max-sm:mt-5 rounded-full sm:rounded-xl transition-all duration-300 cursor-pointer bg-sienna text-white hover:bg-sienna-2"
        >
          <Plus
            strokeWidth={1.5}
            width={20}
            height={20}
          />
          <span>Add A Reminder</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8 pt-2 pb-5 sm:py-5">
        {reminders.map((reminder, index) => (
          <CustomerReminder
            key={index}
            index={index}
            occasions={occasions}
            relations={relations}
            reminder={reminder}
            onUpdate={() => {
              onUpdate(reminder._id as string);
            }}
            onDelete={() => {
              onDelete(reminder._id as string);
            }}
          />
        ))}
      </div>
    </section>
  );
}
