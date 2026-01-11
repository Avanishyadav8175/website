// libraries
import mongoose from "mongoose";

// icons
import { Plus, PlusCircle } from "lucide-react";

// utils
import { getInitialTimeSlotValue } from "./utils/getInitialTimeSlotValue";
import { getInitialTimeSlotsValue } from "./utils/getInitialTimeSlotsValue";

// hooks
import { useEffect, useState } from "react";

// components
import TimeSlot from "./components/TimeSlot";

// types
import { type TimeSlotDocument } from "@/common/types/documentation/nestedDocuments/timeSlot";
import { getLabelPlaceholder } from "./utils/getLabelPlaceholderValue";

export default function TimeSlots(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    defaultValue?: TimeSlotDocument[];
  } & (
    | {
        isRequired?: undefined;
      }
    | {
        isRequired?: boolean;
        label: string;
      }
  ) &
    (
      | {
          value?: undefined;
          defaultValue?: TimeSlotDocument[];
        }
      | {
          value?: TimeSlotDocument[];
          defaultValue?: undefined;
          onChangeValue: (newValue: TimeSlotDocument[]) => void;
        }
    )
) {
  // props
  const { name, label, isRequired, performReset, defaultValue, value } = props;

  // states
  const [timeSlots, setTimeSlots] = useState<TimeSlotDocument[]>(
    defaultValue && defaultValue.length
      ? defaultValue.map((timeSlot) =>
          timeSlot.label === getLabelPlaceholder(timeSlot)
            ? ({
                ...timeSlot,
                label: ""
              } as TimeSlotDocument)
            : timeSlot
        )
      : getInitialTimeSlotsValue()
  );

  // variables
  const returnValue = timeSlots
    .map((timeSlot) => {
      const validTimeSlot = { ...timeSlot };

      if (!mongoose.Types.ObjectId.isValid(validTimeSlot._id as string)) {
        delete validTimeSlot._id;
      }

      return validTimeSlot;
    })
    .filter(({ startTime, endTime }) => startTime && endTime)
    .map((timeSlot) => {
      if (timeSlot.label) {
        return timeSlot;
      } else {
        return {
          ...timeSlot,
          label: getLabelPlaceholder(timeSlot as TimeSlotDocument)
        } as TimeSlotDocument;
      }
    });

  // handlers
  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, getInitialTimeSlotValue()]);
  };

  const handleDeleteTimeSlot = (quickLinkId: string) => {
    if (timeSlots.length === 1) {
      setTimeSlots(getInitialTimeSlotsValue());
    } else {
      setTimeSlots([...timeSlots].filter(({ _id }) => _id !== quickLinkId));
    }
  };

  // effects
  useEffect(() => {
    if (defaultValue) {
      if (defaultValue.length) {
        setTimeSlots(
          defaultValue.map((timeSlot) =>
            timeSlot.label === getLabelPlaceholder(timeSlot)
              ? ({
                  ...timeSlot,
                  label: ""
                } as TimeSlotDocument)
              : timeSlot
          )
        );
      } else {
        setTimeSlots(getInitialTimeSlotsValue());
      }
    }
  }, [defaultValue]);

  return (
    <section className="space-y-3 mt-5">
      {label && (
        <div className="text-2xl text-center pt-3 pb-1.5 font-light">
          {label}
        </div>
      )}
      <section className="grid grid-cols-[10px_1fr_1fr_2fr_30px] items-center justify-center gap-3 *:text-center">
        <span>No</span>
        <span>Start Time</span>
        <span>End Time</span>
        <span>Label</span>
        <span></span>
        {timeSlots.map((timeSlot, i) => (
          <TimeSlot
            key={i}
            index={i}
            timeSlot={timeSlot}
            onChangeTimeSlot={(newTimeSlot) => {
              setTimeSlots(
                [...timeSlots].map((timeSlot) =>
                  timeSlot._id === newTimeSlot._id ? newTimeSlot : timeSlot
                )
              );
            }}
            onDeleteTimeSlot={() => {
              handleDeleteTimeSlot(timeSlot._id as string);
            }}
          />
        ))}
        <div
          onClick={handleAddTimeSlot}
          className="rounded-lg py-2 text-teal-600 w-full flex items-center justify-center col-span-5 cursor-pointer gap-1.5 transition-all duration-300 bg-teal-200 hover:bg-teal-600 hover:text-white border border-teal-400 hover:border-teal-600"
        >
          <Plus
            strokeWidth={1.5}
            width={20}
            height={20}
          />
          <span>Add another</span>
        </div>
      </section>
      <input
        className="hidden"
        type="text"
        name={name}
        value={returnValue.length ? JSON.stringify(returnValue) : ""}
        onChange={() => {}}
      />
    </section>
  );
}
