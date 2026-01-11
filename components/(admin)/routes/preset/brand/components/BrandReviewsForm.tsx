// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// hooks
import { useState } from "react";

// components
import TextareaList from "@/components/custom/inputs/textareaList/TextareaList";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { SubmitAndReset } from "@/lib/Forms/layouts/layouts";

// types
import { type BrandDocument } from "@/common/types/documentation/presets/brand";

export default function BrandReviewsForm({
  initialReviews,
  onUpdate
}: {
  initialReviews: string[];
  onUpdate: (updatedDocument: Partial<BrandDocument>) => void;
}) {
  const [reviews, setReviews] = useState<string[]>(initialReviews);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="px-5 py-1.5 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-500 hover:text-white transition-colors duration-300 cursor-pointer">{`Count: ${initialReviews?.length}`}</div>
      </DialogTrigger>
      <DialogContent
        className={`min-w-[60dvw] rounded-2xl max-sm:px-5 sm:max-h-[90dvh] overflow-auto scrollbar-hide pt-0 pb-0`}
      >
        <div className="font-light text-2xl pt-5">Update Brand Reviews</div>
        <section className="w-full px-1 overflow-y-scroll scrollbar-hide">
          <TextareaList
            name="reviews"
            label=""
            itemLabel="Review"
            value={reviews}
            onChangeValue={setReviews}
          />
        </section>
        <SubmitAndReset position="right">
          <div
            onClick={() => {
              setReviews(initialReviews);
            }}
          >
            {"Reset"}
          </div>
          <DialogClose asChild>
            <div
              className={BUTTON_STYLES.GENESIS}
              onClick={() => {
                onUpdate({ reviews });
              }}
            >
              {"Update"}
            </div>
          </DialogClose>
        </SubmitAndReset>
      </DialogContent>
    </Dialog>
  );
}
