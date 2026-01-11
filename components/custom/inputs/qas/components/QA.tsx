// icons
import { X } from "lucide-react";

// components
import Input from "@/lib/Forms/Input/Input";
import Textarea from "@/lib/Forms/Textarea/Textarea";

// types
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";

export default function QA({
  index,
  qa,
  label,
  onChangeQA,
  onDeleteQA
}: {
  index: number;
  qa: QADocument;
  label?: string;
  onChangeQA: (newQA: QADocument) => void;
  onDeleteQA: () => void;
}) {
  return (
    <section className="relative grid grid-cols-1 w-full rounded-xl gap-5 bg-ash/30 border border-ash p-5">
      <div
        onClick={onDeleteQA}
        className="rounded-full absolute -top-1.5 -right-1.5 bg-red-600 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700"
      >
        <X
          strokeWidth={1.5}
          width={16}
          height={16}
        />
      </div>
      <Input
        type="text"
        name="question"
        isRequired={false}
        labelConfig={{
          label: "Question"
        }}
        customValue={{
          value: qa.question,
          setValue: (question) => {
            onChangeQA({ ...qa, question } as QADocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <Textarea
        name="answer"
        isRequired={false}
        labelConfig={{
          label: "Answer",
          labelStyle: "",
          layoutStyle: ""
        }}
        customValue={{
          value: qa.answer,
          setValue: (answer) => {
            onChangeQA({ ...qa, answer } as QADocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
    </section>
  );
}
