// icons
import { Trash2 } from "lucide-react";

// components
import Textarea from "@/lib/Forms/Textarea/Textarea";
import Input from "@/lib/Forms/Input/Input";

export default function PersonalizedReview({
  index,
  area,
  review,
  label,
  onChangeArea,
  onChangeReview,
  onDelete
}: {
  index: number;
  area?: string;
  review: string;
  label?: string;
  onChangeArea: (newArea: string) => void;
  onChangeReview: (newReview: string) => void;
  onDelete: () => void;
}) {
  return (
    <section className="flex flex-col gap-5 relative mb-5">
      <section className="flex items-center justify-start gap-5">
        <div className="text-teal-500 font-medium text-xl">{`${label || "Item"} ${index + 1}:`}</div>
        <div
          onClick={onDelete}
          className="rounded-full absolute right-0 text-red-600 cursor-pointer transition-all duration-300"
        >
          <Trash2
            strokeWidth={1.5}
            width={20}
            height={20}
          />
        </div>
      </section>
      <Input
        type="text"
        name="area"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        placeholder="City"
        customValue={{
          value: area || "",
          setValue: (newArea) => {
            onChangeArea(newArea);
          }
        }}
      />
      <Textarea
        className="rounded-lg"
        name={`review-${index}`}
        isRequired={false}
        placeholder="Comment"
        customValue={{
          value: review,
          setValue: (newContent) => {
            onChangeReview(newContent);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
    </section>
  );
}
