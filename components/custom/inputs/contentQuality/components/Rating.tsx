// utils
import { type ContentRatingDocument } from "@/common/types/documentation/nestedDocuments/contentRating";

// components
import Input from "@/lib/Forms/Input/Input";

export default function Rating({
  rating,
  onChangeRating
}: {
  rating: ContentRatingDocument;
  onChangeRating: (newRating: ContentRatingDocument) => void;
}) {
  return (
    <section className="flex flex-col gap-3 w-full">
      <div className="text-lg font-semibold">{"Rating"}</div>
      <section className="flex flex-col gap-3">
        <Input
          type="number"
          name="maxValue"
          isRequired
          labelConfig={{
            label: "Max Rating"
          }}
          customValue={{
            value:
              rating.maxValue === 0 || rating.maxValue
                ? rating.maxValue.toString()
                : "",
            setValue: (maxValue) => {
              if (Number(maxValue) !== rating.maxValue) {
                onChangeRating({
                  ...rating,
                  maxValue: maxValue ? Number(maxValue) : NaN
                } as ContentRatingDocument);
              }
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        <Input
          type="number"
          name="value"
          isRequired
          labelConfig={{
            label: "Rating Value"
          }}
          customValue={{
            value:
              rating.value === 0 || rating.value ? rating.value.toString() : "",
            setValue: (value) => {
              if (Number(value) !== rating.value) {
                onChangeRating({
                  ...rating,
                  value: value ? Number(value) : NaN
                } as ContentRatingDocument);
              }
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
            label: "Rating Count"
          }}
          customValue={{
            value:
              rating.count === 0 || rating.count ? rating.count.toString() : "",
            setValue: (count) => {
              if (Number(count) !== rating.count) {
                onChangeRating({
                  ...rating,
                  count: count ? Number(count) : NaN
                } as ContentRatingDocument);
              }
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
      </section>
    </section>
  );
}
