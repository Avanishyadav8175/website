// utils
import { type ContentReviewDocument } from "@/common/types/documentation/nestedDocuments/contentReview";

// redux
import {
  createReviewGroupAction,
  selectReviewGroup
} from "@/store/features/presets/reviewGroupSlice";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// components
import Input from "@/lib/Forms/Input/Input";
import TextareaList from "../../textareaList/TextareaList";

export default function Review({
  review,
  onChangeReview
}: {
  review: ContentReviewDocument;
  onChangeReview: (newReview: ContentReviewDocument) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const reviewGroupStatus = useSelector(selectReviewGroup.status);

  const { options: reviewGroupOptions } = useSelector((state) =>
    selectReviewGroup.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // effects
  useEffect(() => {
    if (reviewGroupStatus === "idle") {
      dispatch(createReviewGroupAction.fetchDocumentList());
    }
  }, [reviewGroupStatus, dispatch]);
  return (
    <section className="flex flex-col gap-3 w-full">
      <div className="text-lg font-semibold">{"Review"}</div>
      <section className="flex flex-col gap-3">
        {/* <TextareaList
          name="personalized"
          label=""
          itemLabel="Review"
          value={review.personalized}
          onChangeValue={(personalized) => {
            onChangeReview({
              ...review,
              personalized
            } as ContentReviewDocument);
          }}
        /> */}
        <Input
          type="dropdown"
          name="group"
          labelConfig={{
            label: "Reviews"
          }}
          isRequired
          nullOption
          customInitialValuePlaceholderLabel="Select Reviews"
          options={reviewGroupOptions}
          customValue={{
            value: review.group as string,
            setValue: (group) => {
              onChangeReview({
                ...review,
                group
              } as ContentReviewDocument);
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        <Input
          type="number"
          name="count"
          isRequired
          labelConfig={{
            label: "Review Count"
          }}
          customValue={{
            value:
              review.count === 0 || review.count ? review.count.toString() : "",
            setValue: (count) => {
              onChangeReview({
                ...review,
                count: count ? Number(count) : NaN
              } as ContentReviewDocument);
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
      </section>
    </section>
  );
}
