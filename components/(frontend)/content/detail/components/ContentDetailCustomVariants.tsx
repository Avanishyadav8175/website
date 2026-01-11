// utils
import { lazy, memo, Suspense } from "react";

// hooks
import { useMemo } from "react";

// components
import ContentDetailCustomVariant from "./ContentDetailCustomVariant";
const LazyContentDetailServingInfoDialog = lazy(
  () => import("./ContentDetailServingDialog")
);

// types
import { type ContentCustomVariantDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariant";
import { type ContentCustomVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategory";
import { type ContentVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentVariantCategory";
import { type LabelDocument } from "@/common/types/documentation/presets/label";
import { type UnitDocument } from "@/common/types/documentation/presets/unit";
import { type UnitServeDocument } from "@/common/types/documentation/nestedDocuments/unitServe";

function ContentDetailCustomVariants({
  variantCategory,
  activeVariantId,
  onChange
}: {
  variantCategory: ContentVariantCategoryDocument;
  activeVariantId: string | null;
  onChange: (customVariantId: string | null) => void;
}) {
  const label = useMemo(
    () => (variantCategory.label as LabelDocument).label,
    [variantCategory]
  );

  const customVariantCategory = useMemo(
    () => variantCategory.custom as ContentCustomVariantCategoryDocument,
    [variantCategory]
  );

  const options = useMemo(
    () => customVariantCategory.options,
    [customVariantCategory]
  );

  const unit = useMemo(
    () =>
      options.unit ? (customVariantCategory.unit as UnitDocument) : undefined,
    [customVariantCategory, options]
  );

  const serves = useMemo(() => unit?.serves, [unit]);

  const variants = useMemo(
    () => customVariantCategory.variants as ContentCustomVariantDocument[],
    [customVariantCategory]
  );


  return (
    <div className="bg-ivory-1 border border-ash-1 overflow-hidden shadow-sm relative sm:rounded-2xl pt-10 sm:pt-9 pb-5 px-4 sm:px-6 sm:max-w-[calc(470px_+_24px)]">
      <div className="absolute top-0 left-0 bg-ash-1/50 text-sienna-1 pt-2 pb-1.5 font-medium px-5 sm:px-6 rounded-br-xl">{label}</div>
      <div className="flex flex-col gap-1.5 mt-4 items-stretch justify-start">
        <div className="flex items-start justify-start gap-4 overflow-x-scroll scrollbar-hide">
          {variants.map((variant, i) => (
            <ContentDetailCustomVariant
              key={variant._id as string}
              options={options}
              unit={unit}
              variant={variant}
              isSelected={
                activeVariantId ? variant._id === activeVariantId : !i
              }
              onClick={() => {
                onChange(i ? (variant._id as string) : null);
              }}
            />
          ))}
        </div>
      </div>
      {unit && Boolean(serves?.length) && (
        <Suspense fallback={<></>}>
          <LazyContentDetailServingInfoDialog
            serves={serves as UnitServeDocument[]}
            unit={unit as UnitDocument}
          />
        </Suspense>
      )}
    </div>
  );

  /* return (
    <div className="bg-ivory-1 relative shadow-light sm:rounded-3xl pt-5 pb-5 border-y sm:border border-ash/40 px-4 sm:px-6 sm:max-w-[calc(470px_+_24px)]">
      <span className="text-charcoal-3/80 text-base font-medium mb-5 relative flex items-center justify-start gap-0.5">
        {label}
        <span className={`absolute -bottom-1.5 left-0 bg-sienna h-[2px] w-20`} />
      </span>
      <div className="flex flex-col gap-1.5 mt-4 items-stretch justify-start">
        <div className="flex items-start justify-start gap-4 overflow-x-scroll scrollbar-hide">
          {variants.map((variant, i) => (
            <ContentDetailCustomVariant
              key={variant._id as string}
              options={options}
              unit={unit}
              variant={variant}
              isSelected={
                activeVariantId ? variant._id === activeVariantId : !i
              }
              onClick={() => {
                onChange(i ? (variant._id as string) : null);
              }}
            />
          ))}
        </div>
      </div>
      {unit && Boolean(serves?.length) && (
        <Suspense fallback={<></>}>
          <LazyContentDetailServingInfoDialog
            serves={serves as UnitServeDocument[]}
            unit={unit as UnitDocument}
          />
        </Suspense>
      )}
    </div>
  ); */
}

export default memo(ContentDetailCustomVariants);
