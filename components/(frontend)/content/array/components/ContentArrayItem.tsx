// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// icons
import { INRSymbol } from "@/common/constants/symbols";
import {
  NonVegSymbol,
  VegSymbol
} from "@/components/(_common)/Symbols/Edibles";
import { Loader2, Star, StarIcon, Zap } from "lucide-react";

// constants
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

// utils
import { getContentPrice } from "../../utils/getContentPrice";
import { getEarliestDelivery } from "../utils/getEarliestDelivery";
import { getPromotionSticker } from "../utils/getPromotionSticker";
import { getRatingValue } from "../../utils/getRatingValue";

// hooks
import { useMemo } from "react";
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import Image from "next/image";
import Link from "next/link";
import ShineAnimation from "./ShineAnimation";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentDeliveryDocument } from "@/common/types/documentation/nestedDocuments/contentDelivery";
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { type EdibleDocument } from "@/common/types/documentation/nestedDocuments/edible";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";
import CategoryContent from "@/components/(frontend)/category/components/CategoryContent";
import CategoryContentImage from "@/components/(frontend)/category/components/CategoryContentImage";
import CategoryContentTag from "@/components/(frontend)/category/components/CategoryContentTag";
import { ContentListItemDataTagDocument } from "@/common/types/documentation/nestedDocuments/contentListItemDataTag";
import CategoryContentName from "@/components/(frontend)/category/components/CategoryContentName";
import CategoryContentPrice from "@/components/(frontend)/category/components/CategoryContentPrice";
import CategoryContentDiscount from "@/components/(frontend)/category/components/CategoryContentDiscount";

function ContentArrayItem({
  index,
  isScrollable,
  content
}: {
  index: number;
  isScrollable?: boolean;
  content: ContentDocument;
}) {
  // hooks
  const {
    location: {
      data: { selectedCity }
    }
  } = useAppStates();

  // variables
  const {
    type,
    name,
    slug,
    media: { primary }
  } = useMemo(() => content, [content]);

  const { alt, defaultAlt, url } = useMemo(
    () => primary as ImageDocument,
    [primary]
  );

  const { mrp, price } = useMemo(
    () =>
      getContentPrice({
        city: selectedCity,
        price: content.price as ContentPriceDocument
      }),
    [content, selectedCity]
  );

  const edibleType = useMemo(
    () => (content?.edible as EdibleDocument)?.type,
    [content]
  );

  const earliestDeliveryBy = useMemo(
    () =>
      getEarliestDelivery({
        delivery: content?.delivery as ContentDeliveryDocument
      }),
    [content]
  );

  const sticker = useMemo(
    () =>
      content?.tag?.promotionTag
        ? getPromotionSticker({
          promotionTag: content.tag.promotionTag as PromotionTagDocument
        })
        : undefined,
    [content]
  );

  const rating = useMemo(() => content?.quality?.rating, [content]);

  return (
    <Link
      href={`${type === "product" ? FRONTEND_LINKS.PRODUCT_PAGE : FRONTEND_LINKS.SERVICE_PAGE}/${slug}`}
      prefetch={false}
      className={`group grid *:row-start-1 *:col-start-1 min-w-[38dvw] sm:min-w-[15dvw] sm:max-w-[20dvw] md:min-w-[25dvw] md:max-w-[30dvw] lg:min-w-64 rounded-none h-fit min-h-fit`}
    >
      <div
        className={`relative shadow-md z-20 transition-all duration-300 rounded-xl bg-ivory-1 ${index > 1 ? "max-sm:border-t-[0.5px]" : ""}  ${index % 2 === 0 ? "" : ""} ${index % 2 === 0 ? "" : "max-sm:border-l-[0.5px]"} border-ash/25`}
      >
        <div
          className={`relative  aspect-square rounded-none rounded-b-none sm:rounded-b-none sm:rounded-xl overflow-hidden`}
        >
          <CategoryContentImage
            index={index}
            alt={alt}
            url={url}
          />
          {/* <CategoryContentEdible edible={edible} /> */}
          {/* <CategoryContentRating
            ratingValue={ratingValue}
            ratingCount={ratingCount}
          /> */}
          {sticker && (
            <CategoryContentTag
              tag={{
                backgroundColor: sticker.bgColor,
                textColor: sticker.textColor,
                label: sticker.label
              } as ContentListItemDataTagDocument}
            />
          )}
          <ShineAnimation />
        </div>
        <div
          className={`relative pt-3 flex flex-col gap-y-1 rounded-sm sm:rounded-xl rounded-t-none sm:rounded-t-none overflow-hidden bg-ivory-1 mt-0 sm:border-[1.5px] sm:border-ash/40 border-t-0 rounded-b-xl`}
        >
          <CategoryContentName
            name={name}
            edible={undefined}
          />
          <div
            className={`px-2 sm:px-3.5 relative flex items-baseline justify-start gap-2 w-full z-20`}
          >
            <CategoryContentPrice price={price} />
            {mrp && price && Math.ceil((1 - price / mrp) * 100) > 0 && (
              <CategoryContentDiscount discount={Math.ceil((1 - price / mrp) * 100)} />
            )}
          </div>
          {rating && (
            <div className="flex text-charcoal-3/70 px-2 text-sm font-medium sm:px-3.5 pb-3 items-center justify-start gap-x-1">
              <Star className="fill-amber-500 text-amber-500" width={15} height={15} />
              <span>{getRatingValue(rating.value)} rating</span>
              {/* <span>({rating.count} reviews)</span> */}
            </div>
          )}
          {/* <CategoryContentEarliestDelivery
            processingTime={processingTime}
            lastDeliverySlot={lastDeliverySlot}
          /> */}
        </div>
      </div>
    </Link>



  );
}

export default ContentArrayItem;
