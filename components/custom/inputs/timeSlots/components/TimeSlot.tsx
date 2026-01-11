// icons
import { X } from "lucide-react";

// utils
import { getLabelPlaceholder } from "../utils/getLabelPlaceholderValue";

// hooks
import { useEffect } from "react";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";

export default function TimeSlot({
  index,
  timeSlot,
  onChangeTimeSlot,
  onDeleteTimeSlot
}: {
  index: number;
  timeSlot: TimeSlotDocument;
  onChangeTimeSlot: (newQuickLink: TimeSlotDocument) => void;
  onDeleteTimeSlot: () => void;
}) {
  useEffect(() => {
    if (
      timeSlot.startTime &&
      timeSlot.endTime &&
      timeSlot.label === getLabelPlaceholder(timeSlot)
    ) {
      onChangeTimeSlot({
        ...timeSlot,
        label: ""
      } as TimeSlotDocument);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeSlot]);

  return (
    <>
      <div className="font-semibold">{index + 1}</div>
      <div className="flex items-center justify-center bg-charcoal-3/10 hover:bg-charcoal-3/15 px-3 py-2 rounded-lg transition-all duration-300">
        <input
          className="bg-transparent outline-none border-none"
          type="time"
          name="startTime"
          value={timeSlot.startTime}
          onChange={(e) => {
            onChangeTimeSlot({
              ...timeSlot,
              startTime: e.target.value
            } as TimeSlotDocument);
          }}
        />
      </div>
      <div className="flex items-center justify-center bg-charcoal-3/10 hover:bg-charcoal-3/15 px-3 py-2 rounded-lg transition-all duration-300">
        <input
          className="bg-transparent outline-none border-none"
          type="time"
          name="endTime"
          min={"00:01"}
          max={"23:59"}
          value={timeSlot.endTime}
          onChange={(e) => {
            onChangeTimeSlot({
              ...timeSlot,
              endTime: e.target.value
            } as TimeSlotDocument);
          }}
        />
      </div>
      <Input
        type="text"
        name="label"
        isRequired={false}
        placeholder={getLabelPlaceholder(timeSlot)}
        customValue={{
          value: timeSlot.label,
          setValue: (label) => {
            onChangeTimeSlot({
              ...timeSlot,
              label
            } as TimeSlotDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <div
        onClick={() => {
          onDeleteTimeSlot();
        }}
        className="w-min rounded-full bg-red-600 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700"
      >
        <X
          strokeWidth={1.5}
          width={16}
          height={16}
        />
      </div>
    </>
  );
}
