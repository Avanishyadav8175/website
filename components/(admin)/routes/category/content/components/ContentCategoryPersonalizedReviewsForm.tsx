// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// hooks
import { useEffect, useState } from "react";

// components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import PersonalizedReviews from "@/components/custom/inputs/personalizedReviews/PersonalizedReviews";
import { SubmitAndReset } from "@/lib/Forms/layouts/layouts";

// types
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type PersonalizedReviewDocument } from "@/common/types/documentation/nestedDocuments/personalizedReview";

export default function ContentCategoryPersonalizedReviewsForm({
  initialReviews,
  onUpdate
}: {
  initialReviews: PersonalizedReviewDocument[];
  onUpdate: (updatedDocument: Partial<ContentCategoryDocument>) => void;
}) {
  // states
  const [reviews, setReviews] =
    useState<PersonalizedReviewDocument[]>(initialReviews);

  // side effects
  useEffect(() => {
    setReviews(initialReviews);
  }, [initialReviews]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center bg-teal-100 hover:bg-teal-300 text-teal-800 p-1 px-4 rounded-lg font-semibold gap-1 transition-all duration-300 cursor-pointer">
          <span>{initialReviews?.length} reviews</span>
        </div>
      </DialogTrigger>
      <DialogContent
        className={`min-w-[60dvw] rounded-2xl max-sm:px-5 sm:max-h-[90dvh] overflow-auto scrollbar-hide pt-0 pb-0`}
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="font-light text-2xl pt-5">
          Update Reviews
        </div>
        <section className="w-full px-1 overflow-y-scroll scrollbar-hide">
          <PersonalizedReviews
            name="reviews"
            label=""
            itemLabel="Review"
            value={reviews}
            onChangeValue={setReviews}
          />
        </section>
        <SubmitAndReset position="right">
          <div
            className={BUTTON_STYLES.GHOST}
            onClick={() => {
              setReviews(initialReviews);
            }}
          >
            {"Reset"}
          </div>
          <DialogClose asChild>
            <div className={BUTTON_STYLES.GHOST}>Close</div>
          </DialogClose>
          <div
            className={BUTTON_STYLES.GENESIS}
            onClick={() => {
              onUpdate({ personalizedReviews: reviews });
            }}
          >
            {"Update"}
          </div>
        </SubmitAndReset>
      </DialogContent>
    </Dialog>
  );
}
