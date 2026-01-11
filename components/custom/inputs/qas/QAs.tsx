// libraries
import mongoose from "mongoose";

// icons
import { Plus, PlusCircle } from "lucide-react";

// utils
import { getInitialQAsValue } from "./utils/getInitialQAsValue";
import { getInitialQAValue } from "./utils/getInitialQAValue";

// hooks
import { useEffect, useState } from "react";

// components
import QA from "./components/QA";

// types
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";
import { FormSubTitle } from "../title/Form";

export default function QAs(
  props: {
    name: string;
    label?: string;
    itemLabel?: string;
    performReset?: boolean;
    defaultValue?: QADocument[];
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
        defaultValue?: QADocument[];
      }
      | {
        value?: QADocument[];
        defaultValue?: undefined;
        onChangeValue: (newValue: QADocument[]) => void;
      }
    )
) {
  // props
  const {
    name,
    label,
    itemLabel,
    isRequired,
    performReset,
    defaultValue,
    value
  } = props;

  // states
  const [qas, setQAs] = useState<QADocument[]>(
    defaultValue || getInitialQAsValue()
  );

  // variables
  const returnValue = qas
    .map((qa) => {
      const validQA = { ...qa };

      if (!mongoose.Types.ObjectId.isValid(validQA._id as string)) {
        delete validQA._id;
      }

      return validQA;
    })
    .filter(({ question, answer }) => question && answer);

  // handlers
  const handleAddQA = () => {
    setQAs([...qas, getInitialQAValue()]);
  };

  const handleDeleteQA = (qaId: string) => {
    if (qas.length === 1) {
      setQAs(getInitialQAsValue());
    } else {
      setQAs([...qas].filter(({ _id }) => _id !== qaId));
    }
  };

  // effects
  useEffect(() => {
    if (defaultValue) {
      setQAs(defaultValue);
    }
  }, [defaultValue]);

  return (
    <>
      {label && (
        <FormSubTitle subtitle={label} />
      )}
      <section className="flex flex-col gap-5">
        {qas.map((qa, i) => (
          <QA
            key={i}
            index={i}
            qa={qa}
            label={itemLabel}
            onChangeQA={(newQA) => {
              setQAs([...qas].map((qa) => (qa._id === newQA._id ? newQA : qa)));
            }}
            onDeleteQA={() => {
              handleDeleteQA(qa._id as string);
            }}
          />
        ))}

        <div
          onClick={handleAddQA}
          className="rounded-lg py-2 text-teal-600 w-full flex items-center justify-center col-span-4 cursor-pointer gap-1.5 transition-all duration-300 bg-teal-200 hover:bg-teal-600 hover:text-white border border-teal-400 hover:border-teal-600"
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
        onChange={() => { }}
      />
    </>
  );
}
