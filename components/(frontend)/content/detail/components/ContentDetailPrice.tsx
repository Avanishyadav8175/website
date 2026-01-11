// icons
import { INRSymbol } from "@/common/constants/symbols";

// utils
import { getContentPrice } from "../../utils/getContentPrice";
import { memo } from "react";

// hooks
import { useMemo } from "react";
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import ContentHorizontalSpacing from "../../spacing/ContentHorizontalSpacing";

// types
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";

function ContentDetailPrice({
  price: contentPrice
}: {
  price: ContentPriceDocument;
}) {
  // hooks
  const {
    location: {
      data: { selectedCity }
    }
  } = useAppStates();

  // memoized
  const { mrp, price } = useMemo(
    () =>
      getContentPrice({
        price: contentPrice,
        city: selectedCity
      }),
    [contentPrice, selectedCity]
  );

  return (
    <>
      <ContentHorizontalSpacing className="my-1 lg:my-1 flex items-baseline justify-start gap-3">
        <h2
          className={`text-charcoal-3/90 font-medium text-[25px] lg:text-[30px]`}
        >
          {`${INRSymbol}${price}`}
        </h2>
        {price < mrp && (
          <>
            <del className="text-charcoal-3/70 font-medium">{`${INRSymbol} ${mrp}`}</del>
            <div className="lg:ml-1 px-2 text-green-700 text-sm font-medium">
              {`${Math.min(99, Math.ceil(100 - (price * 100) / mrp))}% discount`}
            </div>
          </>
        )}
      </ContentHorizontalSpacing>
      <ContentHorizontalSpacing className="text-sm text-charcoal-3/70">
        <span>All taxes are included</span>
      </ContentHorizontalSpacing>
    </>
  );
}

export default memo(ContentDetailPrice);
