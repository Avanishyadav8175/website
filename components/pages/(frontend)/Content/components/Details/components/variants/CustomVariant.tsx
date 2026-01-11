
// config
import { OPTIMIZE_IMAGE } from "@/config/image";

import { ContentVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentVariantCategory";
import { CardTitle } from "../scrap/ProductPageMiscUI";
import { LabelDocument } from "@/common/types/documentation/presets/label";
import Image from "next/image";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { INRSymbol } from "@/common/constants/symbols";
import { ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { useEffect, useState } from "react";
import { ContentCustomVariantCategoryOptionDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategoryOption";
import { UnitDocument } from "@/common/types/documentation/presets/unit";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { SERVING_INFO } from "../../static/data";
import { UnitServeDocument } from "@/common/types/documentation/nestedDocuments/unitServe";
import { Check } from "lucide-react";
import { getCityWisePrices } from "@/common/helpers/getCityWiseContentPrices";
// import { useLocation } from "@/hooks/useLocation/useLocation";
import { CityDocument } from "@/common/types/documentation/presets/city";

export default function CustomVariant({
  data,
  selectedId,
  selectedCity,
  onSelect
}: {
  data: ContentVariantCategoryDocument;
  selectedId?: string;
  selectedCity: CityDocument | null;
  onSelect: (selectedId: string | undefined) => void;
}) {
  // const { selectedCity } = useLocation();

  const hasImages =
    data.reference && data.reference.length > 0
      ? true
      : data.custom && data.custom.options.image
        ? true
        : false;

  return (
    <div className="bg-ivory-1 relative shadow-light sm:rounded-3xl pt-5 pb-5 border-y sm:border border-ash/40 px-4 sm:px-6 sm:max-w-[calc(470px_+_24px)]">
      <CardTitle str={(data.label as LabelDocument).label || ""} />

      <div className="flex flex-col gap-1.5 mt-4 items-stretch justify-start">
        <div className="flex items-start justify-start gap-4 overflow-x-scroll scrollbar-hide">
          {data.type === "custom" ? (
            data.custom && data.custom.variants.length > 0 ? (
              data.custom.variants.map(
                ({ label, price, image, value, _id }, index) => {
                  const { price: variantPrice } = getCityWisePrices({
                    city: selectedCity,
                    prices: price
                  });
                  return (
                    <div
                      key={index}
                      className={`group relative flex flex-col justify-start w-[92px] sm:w-[90px] cursor-pointer border rounded-lg p-1 ${selectedId === (_id as string) ? "border-sienna/50 bg-transparent" : "border-charcoal-3/10 hover:border-charcoal-3/20"} transition-all duration-300`}
                      onClick={() => onSelect(_id as string)}
                    >
                      {hasImages ? (
                        <div
                          className={`relative grid *:row-start-1 *:col-start-1 overflow-hidden`}
                        >
                          <Image
                            alt={
                              (image as ImageDocument).alt ||
                              (image as ImageDocument).defaultAlt ||
                              "Variant Image"
                            }
                            src={(image as ImageDocument).url}
                            unoptimized={!OPTIMIZE_IMAGE}
                            priority
                            decoding="async"
                            width={92}
                            height={92}
                            draggable={false}
                            className={`border-[2px] ${selectedId === (_id as string) ? "border-sienna" : "border-transparent"} rounded-lg`}
                          />
                          <div className="absolute h-full -left-[35%] w-7 scale-y-110 bg-ivory-1/85 opacity-60 rotate-12 blur-sm z-30 top-0 transition-all duration-500 group-hover:animate-shine" />
                          {selectedId === (_id as string) ? (
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
                      ) : (
                        <></>
                      )}

                      <span
                        className={`${selectedId === (_id as string) ? "text-charcoal-1" : "text-charcoal-3/90"} ${
                          data.custom &&
                          (
                            data.custom
                              .options as ContentCustomVariantCategoryOptionDocument
                          ).unit
                            ? ""
                            : "text-center mb-1"
                        } px-1 text-sm whitespace-nowrap truncate mt-1`}
                      >
                        {(data.custom &&
                        (
                          data.custom
                            .options as ContentCustomVariantCategoryOptionDocument
                        ).unit
                          ? `${value} ${(data.custom.unit as UnitDocument).abbr || ""}`
                          : label) || ""}
                      </span>
                      {data.custom &&
                      (
                        data.custom
                          .options as ContentCustomVariantCategoryOptionDocument
                      ).unit ? (
                        <span
                          className={`${selectedId === (_id as string) ? "text-sienna" : "text-charcoal-3 group-hover:text-sienna"} px-1 font-medium transition-all duration-300 brightness-75`}
                        >
                          {INRSymbol}
                          {variantPrice}
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                }
              )
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* {data.custom &&
      data.custom.unit &&
      (data.custom.unit as UnitDocument).serves &&
      ((data.custom.unit as UnitDocument).serves as UnitServeDocument[])
        .length > 0 ? (
        <Popover>
          <PopoverTrigger asChild>
            <div className="absolute top-5 right-6 rounded-full transition-all duration-300 cursor-pointer font-medium aspect-square w-7 h-7 grid place-items-center bg-sienna-3/30 text-sienna hover:bg-sienna-3/80">
              ?
            </div>
          </PopoverTrigger>
          <PopoverContent className="grid grid-cols-[2fr_3fr] max-w-[260px] p-4 shadow-md rounded-2xl bg-[#dacb8d] outline-none border-none">
            <div className="col-span-2 font-medium text-center rounded-t-xl pb-3 pt-0.5 text-lg text-[#2c2402]">
              Serving Info
            </div>
            {(data.custom.unit as UnitDocument).serves?.map(
              ({ minPerson, maxPerson, value }, index) => (
                <>
                  <div
                    className={`bg-ivory-1 py-3.5 px-4 ${index === 0 ? "rounded-tl-2xl" : index === SERVING_INFO.length - 1 ? "rounded-bl-2xl" : ""} ${index === SERVING_INFO.length - 1 ? "" : "border-b border-charcoal-3/15"}`}
                    key={index}
                  >
                    {value} {(data.custom?.unit as UnitDocument).abbr || ""}
                  </div>
                  <div
                    className={`bg-ivory-1 py-3.5 px-4 ${index === 0 ? "rounded-tr-2xl" : index === SERVING_INFO.length - 1 ? "rounded-br-2xl" : ""} ${index === SERVING_INFO.length - 1 ? "" : "border-b border-charcoal-3/15"}`}
                    key={index}
                  >
                    {minPerson} - {maxPerson} people
                  </div>
                </>
              )
            )}
          </PopoverContent>
        </Popover>
      ) : (
        <></>
      )} */}
    </div>
  );
}

/* 




{showServingInfo && (
             
            )}
*/
