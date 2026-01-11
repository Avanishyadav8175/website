import { BellOff, Plus } from "lucide-react";

export default function SavedRemindersNoReminderField({
  onClick
}: {
  onClick: () => void;
}) {
  return (
    <>
      <div className="text-charcoal-3/75 text-lg flex flex-col justify-center items-center gap-4">
        <BellOff
          strokeWidth={1.5}
          width={48}
          height={48}
        />
        <span>Nothing to Remind</span>
      </div>
      <div
        onClick={onClick}
        className="w-fit justify-self-center flex items-center justify-center gap-3 py-2.5 px-5 rounded-xl transition-all duration-300 cursor-pointer bg-sienna text-white hover:bg-sienna-2"
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
