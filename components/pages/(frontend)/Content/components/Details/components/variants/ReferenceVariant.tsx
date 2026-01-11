import { ContentVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentVariantCategory";
import { CardTitle } from "../scrap/ProductPageMiscUI";
import { LabelDocument } from "@/common/types/documentation/presets/label";
import { INRSymbol } from "@/common/constants/symbols";
import { ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { ContentDocument } from "@/common/types/documentation/contents/content";
import Image from "next/image";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { Check } from "lucide-react";
import { OPTIMIZE_IMAGE } from "@/config/image";

export default function ReferenceVariant({
  data,
  selectedId,
  onSelect
}: {
  data: ContentVariantCategoryDocument;
  selectedId?: string;
  onSelect: (selectedId: string | undefined) => void;
}) {
  return (
    <div className="bg-ivory-1 shadow-light sm:rounded-3xl pt-5 pb-5 border-y sm:border border-ash/40 px-4 sm:px-6 sm:max-w-[calc(470px_+_24px)]">
      <CardTitle str={(data.label as LabelDocument).label || ""} />

      <div className="flex flex-col gap-1.5 mt-4 items-stretch justify-start">
        <div className="flex items-start justify-start gap-4 overflow-x-scroll scrollbar-hide">
          {data.reference && data.reference.length > 0 ? (
            data.reference.map(({ label, reference, _id }, index) => (
              <div
                key={index}
                className={`group relative flex flex-col justify-start w-[92px] sm:w-[90px] cursor-pointer border rounded-lg p-1 ${selectedId === ((reference as ContentDocument)._id as string) ? "border-sienna/50 bg-transparent" : "border-charcoal-3/10 hover:border-charcoal-3/20"} transition-all duration-300`}
                onClick={() =>
                  onSelect((reference as ContentDocument)._id as string)
                }
              >
                <div
                  className={`relative grid *:row-start-1 *:col-start-1 overflow-hidden`}
                >
                  <Image
                    alt={
                      (
                        (reference as ContentDocument).media
                          .primary as ImageDocument
                      ).alt ||
                      (
                        (reference as ContentDocument).media
                          .primary as ImageDocument
                      ).defaultAlt ||
                      "Variant Image"
                    }
                    src={
                      (
                        (reference as ContentDocument).media
                          .primary as ImageDocument
                      ).url
                    }
                    unoptimized={!OPTIMIZE_IMAGE}
                    priority
                    decoding="async"
                    width={92}
                    height={92}
                    draggable={false}
                    className={`border-[2px] ${selectedId === ((reference as ContentDocument)._id as string) ? "border-sienna" : "border-transparent"} rounded-lg`}
                  />
                  <div className="absolute h-full -left-[35%] w-7 scale-y-110 bg-ivory-1/85 opacity-60 rotate-12 blur-sm z-30 top-0 transition-all duration-500 group-hover:animate-shine" />
                  {selectedId ===
                  ((reference as ContentDocument)._id as string) ? (
                    <span className="absolute top-0 right-0 rounded-bl-lg rounded-tr-lg text-white bg-green-500 flex items-center justify-center p-1">
                      <Check
                        // strokeWidth={1.5}
                        width={14}
                        height={14}
                      />
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <span
                  className={`${selectedId === ((reference as ContentDocument)._id as string) ? "text-charcoal-1" : "text-charcoal-3/90"} capitalize px-1 text-sm whitespace-nowrap truncate mt-1`}
                >
                  {label || ""}
                </span>

                <span
                  className={`${selectedId === ((reference as ContentDocument)._id as string) ? "text-sienna" : "text-charcoal-3 group-hover:text-sienna"} px-1 font-medium transition-all duration-300 brightness-75`}
                >
                  {INRSymbol}
                  {
                    (
                      (reference as ContentDocument)
                        .price as ContentPriceDocument
                    ).base.price
                  }
                </span>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
