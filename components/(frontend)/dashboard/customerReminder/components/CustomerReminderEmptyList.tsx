import { BellOff, Plus } from "lucide-react";

export default function CustomerReminderEmptyList({
  onAdd
}: {
  onAdd: () => void;
}) {
  return (
    <>
      <div className="text-charcoal-3/75 text-lg flex flex-col justify-center items-center gap-4 max-sm:pt-16">
        <BellOff
          strokeWidth={1.5}
          width={48}
          height={48}
        />
        <span>Nothing to Remind</span>
      </div>
      <div
        onClick={onAdd}
        className="max-sm:mb-24 w-fit justify-self-center flex items-center justify-center gap-3 py-2.5 px-5 rounded-xl transition-all duration-300 cursor-pointer bg-sienna text-white hover:bg-sienna-2"
      >
        <Plus
          strokeWidth={1.5}
          width={20}
          height={20}
        />
        <span>Add a Reminder</span>
      </div>
    </>
  );
}
