// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// requests
import { fetchContentPageReference } from "@/request/content/contentPageReference";

// icons
import { Check } from "lucide-react";
import { INRSymbol } from "@/common/constants/symbols";

// utils
import { memo, useCallback, useState } from "react";
import { getContentPrice } from "../../utils/getContentPrice";

// hooks
import { useMemo } from "react";

// components
import Image from "next/image";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentReferenceVariantDocument } from "@/common/types/documentation/nestedDocuments/contentReferenceVariant";
import { type ImageDocument } from "@/common/types/documentation/media/image";

function ContentDetailReferenceVariant({
  variant: { label, reference },
  isSelf,
  isSelected,
  onClick
}: {
  variant: ContentReferenceVariantDocument;
  isSelf: boolean;
  isSelected: boolean;
  onClick: (reference: ContentDocument | null) => void;
}) {
  // states
  const [content, setContent] = useState<ContentDocument | null>(null);

  // memoized
  const referenceContent = useMemo(
    () => reference as ContentDocument,
    [reference]
  );

  const { alt, defaultAlt, url } = useMemo(
    () => referenceContent.media.primary as ImageDocument,
    [referenceContent]
  );

  const { price } = useMemo(
    () =>
      getContentPrice({
        price: referenceContent.price!,
        city: null
      }),
    [referenceContent]
  );

  // event handlers
  const handleSelectReferenceVariant = useCallback(() => {
    if (isSelf) {
      onClick(null);
    } else {
      if (content) {
        onClick(content);
      } else {
        fetchContentPageReference(referenceContent.slug)
          .then(({ data: reference }) => {
            setContent(reference as ContentDocument);
            onClick(reference as ContentDocument);
          })
          .catch(() => {})
          .finally(() => {});
      }
    }
  }, [isSelf, content, referenceContent, onClick]);

  return (
    <div
      className={`group relative flex flex-col justify-start w-[92px] sm:w-[90px] cursor-pointer border rounded-lg p-1 ${isSelected ? "border-sienna/50 bg-transparent" : "border-charcoal-3/10 hover:border-charcoal-3/20"} transition-all duration-300`}
      onClick={handleSelectReferenceVariant}
    >
      <div
        className={`relative grid *:row-start-1 *:col-start-1 overflow-hidden`}
      >
        <Image
          alt={alt || defaultAlt || "Variant Image"}
          src={url}
          width={80}
          height={80}
          quality={25}
          unoptimized={!OPTIMIZE_IMAGE}
          draggable={false}
          className={`border-[2px] ${isSelected ? "border-sienna" : "border-transparent"} rounded-lg`}
        />
        <div className="absolute h-full -left-[35%] w-7 scale-y-110 bg-ivory-1/85 opacity-60 rotate-12 blur-sm z-30 top-0 transition-all duration-500 group-hover:animate-shine" />
        {isSelected && (
          <span className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg text-white bg-green-500 flex items-center justify-center p-1">
            <Check
              width={14}
              height={14}
            />
          </span>
        )}
      </div>
      <span
        className={`${isSelected ? "text-charcoal-1" : "text-charcoal-3/90"} capitalize px-1 text-sm whitespace-nowrap truncate mt-1`}
      >
        {label}
      </span>
      <span
        className={`${isSelected ? "text-sienna" : "text-charcoal-3 group-hover:text-sienna"} px-1 font-medium transition-all duration-300 brightness-75`}
      >
        {`${INRSymbol}${price}`}
      </span>
    </div>
  );
}

export default memo(ContentDetailReferenceVariant);
