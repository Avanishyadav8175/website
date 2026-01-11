// utils
import { getInitialEdibleValue } from "./utils/getInitialEdibleValue";

// hooks
import { useEffect, useState } from "react";

// components
import Input from "@/lib/Forms/Input/Input";
import Toggle from "@/lib/Forms/Toggle/Toggle";

// types
import { type EdibleDocument } from "@/common/types/documentation/nestedDocuments/edible";

export default function Edible(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    defaultValue?: EdibleDocument;
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
          defaultValue?: EdibleDocument;
        }
      | {
          value?: EdibleDocument;
          defaultValue?: undefined;
          onChangeValue: (newValue: EdibleDocument) => void;
        }
    )
) {
  // props
  const { name, label, isRequired, performReset, defaultValue, value } = props;

  // states
  const [edible, setEdible] = useState<EdibleDocument>(
    defaultValue || value || getInitialEdibleValue()
  );

  // variables
  const returnValue = {
    isEdible: edible.isEdible,
    ...(edible.isEdible
      ? {
          type: edible.type
        }
      : {})
  } as EdibleDocument;

  // effects
  useEffect(() => {
    if (value && JSON.stringify(value) !== JSON.stringify(edible)) {
      setEdible(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (value) {
      props.onChangeValue(returnValue as EdibleDocument);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edible]);

  return (
    <section className="flex flex-col gap-3 w-full">
      {label && <div className="text-lg font-semibold">{label}</div>}
      <section className="flex flex-col gap-3">
        <Toggle
          name="isEdible"
          label="Is Edible"
          isActive={edible.isEdible}
          onChangeIsActive={(isEdible) => {
            setEdible({
              ...edible,
              isEdible
            } as EdibleDocument);
          }}
        />
        {edible.isEdible && (
          <Input
            type="dropdown"
            name="edibleType"
            labelConfig={{
              label: "Edible Type"
            }}
            isRequired
            nullOption={false}
            options={[
              {
                label: "Unspecified",
                value: "unspecified"
              },
              {
                label: "Veg",
                value: "veg"
              },
              {
                label: "Non Veg",
                value: "non-veg"
              }
            ]}
            customValue={{
              value: edible.type as string,
              setValue: (type) => {
                setEdible({
                  ...edible,
                  type: type as "unspecified" | "veg" | "non-veg"
                } as EdibleDocument);
              }
            }}
            errorCheck={false}
            validCheck={false}
          />
        )}
      </section>
      <input
        className="hidden"
        type="text"
        name={name}
        value={JSON.stringify(returnValue)}
        onChange={() => {}}
      />
    </section>
  );
}
