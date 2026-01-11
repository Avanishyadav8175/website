// icons
import { Trash2, X } from "lucide-react";

// components
import Textarea from "@/lib/Forms/Textarea/Textarea";

export default function TextareaListItem({
  index,
  content,
  label,
  onChangeContent,
  onDeleteContent
}: {
  index: number;
  content: string;
  label?: string;
  onChangeContent: (newContent: string) => void;
  onDeleteContent: () => void;
}) {
  return (
    <section className="flex flex-col gap-5 relative mb-5">
      <section className="flex items-center justify-start gap-5">
        <div className="text-teal-500 font-medium text-xl">{`${label || "Item"} ${index + 1}:`}</div>
        <div
          onClick={onDeleteContent}
          className="rounded-full absolute right-0 text-red-600 cursor-pointer transition-all duration-300"
        >
          <Trash2
            strokeWidth={1.5}
            width={20}
            height={20}
          />
        </div>
      </section>

      <Textarea
        className="rounded-lg"
        name="answer"
        isRequired={false}
        customValue={{
          value: content,
          setValue: (newContent) => {
            onChangeContent(newContent);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
    </section>
  );
}
