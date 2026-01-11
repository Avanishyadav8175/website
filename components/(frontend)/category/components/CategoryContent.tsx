// hooks
import { memo, MutableRefObject } from "react";

// components
import CategoryContentDiscount from "./CategoryContentDiscount";
import CategoryContentImage from "./CategoryContentImage";
import CategoryContentName from "./CategoryContentName";
import CategoryContentPrice from "./CategoryContentPrice";
import CategoryContentTag from "./CategoryContentTag";
import Link from "next/link";

// types
import { type ContentListItemDataDocument } from "@/common/types/documentation/nestedDocuments/contentListItemData";
import { Star } from "lucide-react";
import ShineAnimation from "../../global/_Templates/ShineAnimation/ShineAnimation";

function CategoryContent({
  index,
  loadMoreRef,
  content: {
    name,
    slug,
    image: { alt, url },
    ratingValue,
    ratingCount,
    processingTime,
    lastDeliverySlot,
    edible,
    tag
  },
  price,
  discount
}: {
  index: number;
  loadMoreRef?: MutableRefObject<null>;
  content: ContentListItemDataDocument;
  price: number;
  discount: number;
}) {
  return (
    <Link
      ref={loadMoreRef}
      href={slug}
      prefetch={false}
      className={`group grid *:row-start-1 *:col-start-1 min-w-[40dvw] sm:min-w-[15dvw]  rounded-none h-fit min-h-fit`}
    >
      <div
        className={`relative shadow-md z-20 transition-all duration-300 sm:rounded-xl bg-ivory-1 ${index > 1 ? "max-sm:border-t-[0.5px]" : ""} max-sm:pt-2.5 max-sm:pb-1 ${index % 2 === 0 ? "max-sm:pl-2.5 max-sm:pr-[6px]" : "max-sm:pl-[6px] max-sm:pr-2.5"} ${index % 2 === 0 ? "" : "max-sm:border-l-[0.5px]"} border-ash/25`}
      >
        <div
          className={`relative border border-b-0  aspect-square rounded-none rounded-b-none sm:rounded-b-none sm:rounded-xl overflow-hidden`}
        >
          <CategoryContentImage
            index={index}
            alt={alt}
            url={url}
          />
          <ShineAnimation />
          {/* <CategoryContentEdible edible={edible} /> */}
          {/* <CategoryContentRating
            ratingValue={ratingValue}
            ratingCount={ratingCount}
          /> */}
          <CategoryContentTag tag={tag} />
        </div>
        <div
          className={`relative pt-3 flex flex-col gap-y-1 rounded-sm sm:rounded-xl rounded-t-none sm:rounded-t-none overflow-hidden bg-ivory-1 mt-0 sm:border-[1.5px] sm:border-ash/40 border-t-0`}
        >
          <CategoryContentName
            name={name}
            edible={edible}
          />
          <div
            className={`px-2 sm:px-3.5 relative flex items-baseline justify-start gap-2 w-full z-20`}
          >
            <CategoryContentPrice price={price} />
            <CategoryContentDiscount discount={discount} />
          </div>
          <div className="flex text-charcoal-3/70 px-2 text-sm font-medium sm:px-3.5 pb-3 items-center justify-start gap-x-1">
            <Star className="fill-amber-500 text-amber-500" width={15} height={15} />
            <span>{ratingValue}</span>
            <span>({ratingCount} reviews)</span>
          </div>
          {/* <CategoryContentEarliestDelivery
            processingTime={processingTime}
            lastDeliverySlot={lastDeliverySlot}
          /> */}
        </div>
      </div>
    </Link>
  );
}

export default memo(CategoryContent);
