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
import { type PersonalizedReviewDocument } from "@/common/types/documentation/nestedDocuments/personalizedReview";
import { type SubSubTopicDocument } from "@/common/types/documentation/pages/subSubTopic";

export default function SubSubTopicPersonalizedReviewsForm({
  initialReviews,
  onUpdate
}: {
  initialReviews: PersonalizedReviewDocument[];
  onUpdate: (updatedDocument: Partial<SubSubTopicDocument>) => void;
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
        <div className="px-5 py-1.5 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-500 hover:text-white transition-colors duration-300 cursor-pointer">{`Count: ${initialReviews?.length}`}</div>
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
