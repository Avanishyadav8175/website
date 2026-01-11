// icons
import { X } from "lucide-react";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type UnitServeDocument } from "@/common/types/documentation/nestedDocuments/unitServe";
import { useEffect } from "react";

export default function UnitServe({
  index,
  unitServe,
  onChangeUnitServe,
  onDeleteUnitServe
}: {
  index: number;
  unitServe: UnitServeDocument;
  onChangeUnitServe: (newUnitServe: UnitServeDocument) => void;
  onDeleteUnitServe: () => void;
}) {
  useEffect(() => {
    console.log(unitServe);
  }, [unitServe]);

  return (
    <>
      <div className="font-semibold">{index + 1}</div>
      <Input
        type="number"
        name="value"
        isRequired={false}
        customValue={{
          value: unitServe.value ? unitServe.value.toString() : "",
          setValue: (value) => {
            onChangeUnitServe({
              ...unitServe,
              value: Number(value)
            } as UnitServeDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="number"
        name="minPerson"
        isRequired={false}
        customValue={{
          value: unitServe.minPerson ? unitServe.minPerson.toString() : "",
          setValue: (minPerson) => {
            onChangeUnitServe({
              ...unitServe,
              minPerson: Number(minPerson)
            } as UnitServeDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="number"
        name="maxPerson"
        isRequired={false}
        customValue={{
          value: unitServe.maxPerson ? unitServe.maxPerson.toString() : "",
          setValue: (maxPerson) => {
            onChangeUnitServe({
              ...unitServe,
              maxPerson: Number(maxPerson)
            } as UnitServeDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <div
        onClick={() => {
          onDeleteUnitServe();
        }}
        className="w-min rounded-full bg-red-500 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700"
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
