// utils
import { getInitialQualityValue } from "./utils/getInitialQualityValue";

// hooks
import { useDeferredValue, useEffect, useState } from "react";

// components
import Rating from "./components/Rating";
import Review from "./components/Review";
import Toggle from "@/lib/Forms/Toggle/Toggle";

// types
import { type ContentQualityDocument } from "@/common/types/documentation/nestedDocuments/contentQuality";
import { getInitialRatingValue } from "./utils/getInitialRatingValue";
import { getInitialReviewValue } from "./utils/getInitialReviewValue";

export default function ContentQuality(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    defaultValue?: ContentQualityDocument;
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
        defaultValue?: ContentQualityDocument;
      }
      | {
        value?: ContentQualityDocument;
        defaultValue?: undefined;
        onChangeValue: (newValue: ContentQualityDocument) => void;
      }
    )
) {
  // props
  const { name, label, isRequired, performReset, defaultValue, value } = props;

  // states
  const [quality, setQuality] = useState<ContentQualityDocument>(
    defaultValue || value || getInitialQualityValue()
  );

  const [includeRating, setIncludeRating] = useState<boolean>(
    Boolean(quality?.rating?.count)
  );
  const [includeReview, setIncludeReview] = useState<boolean>(
    Boolean(quality?.review?.count)
  );

  // variables
  const returnValue = {
    ...(quality?.rating?.maxValue &&
      quality?.rating?.value &&
      quality?.rating?.count
      ? {
        rating: quality.rating
      }
      : {}),
    ...(quality?.review?.group && quality?.review?.count
      ? {
        review: quality.review
      }
      : {})
  } as ContentQualityDocument;

  const deferredQuality = useDeferredValue(returnValue);

  // effects
  useEffect(() => {
    if (defaultValue) {
      setQuality(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (value && JSON.stringify(value) !== JSON.stringify(returnValue)) {
      setQuality(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (
      "onChangeValue" in props &&
      JSON.stringify(deferredQuality) !== JSON.stringify(value)
    ) {
      props.onChangeValue(deferredQuality);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deferredQuality]);

  return (
    <section className="flex flex-col gap-3 w-full">
      {label && <div className="text-lg font-semibold">{label}</div>}
      <section className="flex flex-col gap-3">
        <Toggle
          name="includeRating"
          label="Add Rating"
          isActive={includeRating}
          onChangeIsActive={(newIncludeRating) => {
            if (!newIncludeRating) {
              setQuality((prevQuality) => {
                const newQuality = {
                  ...prevQuality
                } as ContentQualityDocument;

                delete newQuality.rating;

                return newQuality;
              });
            }

            setIncludeRating(newIncludeRating);
          }}
        />
        {includeRating && (
          <div className="rounded-xl border p-5">
            <Rating
              rating={quality.rating || getInitialRatingValue()}
              onChangeRating={(rating) => {
                if (JSON.stringify(rating) !== JSON.stringify(quality.rating)) {
                  setQuality({
                    ...quality,
                    rating
                  } as ContentQualityDocument);
                }
              }}
            />
          </div>
        )}
        <Toggle
          name="includeReview"
          label="Add Review"
          isActive={includeReview}
          onChangeIsActive={(newIncludeReview) => {
            if (!newIncludeReview) {
              setQuality((prevQuality) => {
                const newQuality = {
                  ...prevQuality
                } as ContentQualityDocument;

                delete newQuality.review;

                return newQuality;
              });
            }

            setIncludeReview(newIncludeReview);
          }}
        />
        {includeReview && (
          <div className="rounded-xl border p-5">
            <Review
              review={quality.review || getInitialReviewValue()}
              onChangeReview={(review) => {
                if (JSON.stringify(review) !== JSON.stringify(quality.review)) {
                  setQuality({
                    ...quality,
                    review
                  } as ContentQualityDocument);
                }
              }}
            />
          </div>
        )}
      </section>
      <input
        className="hidden"
        type="text"
        name={name}
        value={JSON.stringify(quality)}
        onChange={() => { }}
      />
    </section>
  );
}
