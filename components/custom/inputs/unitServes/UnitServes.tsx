// libraries
import mongoose from "mongoose";

// icons
import { Plus, PlusCircle } from "lucide-react";

// utils
import { getInitialUnitServeValue } from "./utils/getInitialUnitServeValue";
import { getInitialUnitServesValue } from "./utils/getInitialUnitServesValue";

// hooks
import { useEffect, useState } from "react";

// components
import UnitServe from "./components/UnitServe";

// types
import { type UnitServeDocument } from "@/common/types/documentation/nestedDocuments/unitServe";

export default function UnitServes(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    defaultValue?: UnitServeDocument[];
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
          defaultValue?: UnitServeDocument[];
        }
      | {
          value?: UnitServeDocument[];
          defaultValue?: undefined;
          onChangeValue: (newValue: UnitServeDocument[]) => void;
        }
    )
) {
  // props
  const { name, label, isRequired, performReset, defaultValue, value } = props;

  // states
  const [unitServes, setUnitServes] = useState<UnitServeDocument[]>(
    defaultValue && defaultValue.length
      ? defaultValue
      : getInitialUnitServesValue()
  );

  // variables
  const returnValue = unitServes
    .map((unitServe) => {
      const validUnitServe = { ...unitServe };

      if (!mongoose.Types.ObjectId.isValid(validUnitServe._id as string)) {
        delete validUnitServe._id;
      }

      return validUnitServe;
    })
    .filter(
      ({ value, minPerson, maxPerson }) => value && minPerson && maxPerson
    );

  // handlers
  const handleAddUnitServe = () => {
    setUnitServes([...unitServes, getInitialUnitServeValue()]);
  };

  const handleDeleteUnitServe = (unitServeId: string) => {
    if (unitServes.length === 1) {
      setUnitServes(getInitialUnitServesValue());
    } else {
      setUnitServes([...unitServes].filter(({ _id }) => _id !== unitServeId));
    }
  };

  // effects
  useEffect(() => {
    if (defaultValue) {
      if (defaultValue.length) {
        setUnitServes(defaultValue);
      } else {
        setUnitServes(getInitialUnitServesValue());
      }
    }
  }, [defaultValue]);

  return (
    <section className="flex flex-col gap-3 w-full">
      {label && (
        <div className="text-2xl text-center font-light pt-5 pb-3">{label}</div>
      )}
      <section className="grid grid-cols-[10px_1fr_1fr_1fr_30px] items-center justify-center gap-3 *:text-center">
        <span className="font-medium">No</span>
        <span className="font-medium">Unit Value</span>
        <span className="font-medium">Serves Min. People</span>
        <span className="font-medium">Serves Max. People</span>
        <span></span>
        {unitServes.map((unitServe, i) => (
          <UnitServe
            key={i}
            index={i}
            unitServe={unitServe}
            onChangeUnitServe={(newUnitServe) => {
              setUnitServes(
                [...unitServes].map((timeSlot) =>
                  timeSlot._id === newUnitServe._id ? newUnitServe : timeSlot
                )
              );
            }}
            onDeleteUnitServe={() => {
              handleDeleteUnitServe(unitServe._id as string);
            }}
          />
        ))}
        <div
          onClick={handleAddUnitServe}
          className="col-span-5 rounded-lg py-2 text-teal-600 w-full flex items-center justify-center cursor-pointer gap-1.5 transition-all duration-300 bg-teal-200 hover:bg-teal-600 hover:text-white border border-teal-400 hover:border-teal-600"
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
