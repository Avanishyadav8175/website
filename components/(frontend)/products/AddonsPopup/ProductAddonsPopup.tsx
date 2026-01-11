import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  LocalAddonsDocument,
  ProductAddonsPopupType,
  SelectedAddonsDocument
} from "./static/types";
import { useEffect, useState } from "react";
import { INRSymbol } from "@/common/constants/symbols";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { AddonDocument } from "@/common/types/documentation/contents/addon";
import { AddonCategoryDocument } from "@/common/types/documentation/categories/addonCategory";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { ContentAddonDocument } from "@/common/types/documentation/nestedDocuments/contentAddon";
import { OPTIMIZE_IMAGE } from "@/config/image";

const BEST_SELLER = "best sellers";

export default function FrontendProductAddonsPopup({
  showDialog,
  setShowDialog,
  availableAddons,
  addons,
  setAddons,
  baseProduct,
  afterCustomizationPrice,
  onClickBookNow
}: ProductAddonsPopupType) {
  const allCategories = [
    BEST_SELLER,
    ...Array.from(
      new Set(
        availableAddons.map(
          ({ addon }) =>
            ((addon as AddonDocument).category as AddonCategoryDocument).name
        )
      )
    )
  ];

  const getAddonsTotal = (addons: { id: string; count: number }[]): number =>
    addons.reduce(
      (total, { count, id }) =>
        (total +=
          count *
          ((
            availableAddons.find(({ _id }) => _id === id)
              ?.addon as AddonDocument
          ).price || 0)),
      0
    );

  const [selectedCategory, setSelectedCategory] = useState<string>(BEST_SELLER);
  const [addonsTotalAmount, setAddonsTotalAmount] = useState<number>(
    getAddonsTotal(addons || [])
  );

  const handleAddonSelection = {
    increment: (id: string) => {
      const foundEl = addons.find(({ id: selectedId }) => selectedId === id);
      if (foundEl)
        setAddons((prev) =>
          prev.map((addon) =>
            addon.id === id ? { ...addon, count: addon.count + 1 } : addon
          )
        );
      else {
        const newAddon = availableAddons.find(
          ({ _id }) => _id === id
        ) as ContentAddonDocument;
        setAddons((prev) => [...prev, { id, count: 1 }]);
      }
    },
    decrement: (id: string) => {
      const foundEl = addons.find(({ id: selectedId }) => selectedId === id);
      if (foundEl && foundEl.count > 1)
        setAddons((prev) =>
          prev.map((addon) =>
            addon.id === id ? { ...addon, count: addon.count - 1 } : addon
          )
        );
      else {
        setAddons((prev) =>
          prev.filter(({ id: selectedId }) => selectedId !== id)
        );
      }
    }
  };

  useEffect(
    () => setAddonsTotalAmount((prev) => getAddonsTotal(addons)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addons]
  );

  return (
    <Dialog
      open={showDialog}
      onOpenChange={setShowDialog}
    >
      <DialogContent className="p-0 outline-none border-none bg-transparent min-w-fit z-[10000]">
        <section
          className={`relative bg-ivory sm:bg-ivory-1 max-sm:w-[100dvw] max-sm:h-[100dvh] sm:rounded-2xl overflow-hidden sm:w-[80dvw] sm:max-w-[1000px] sm:aspect-[20/11] grid grid-cols-1 grid-rows-[auto_1fr]`}
        >
          {/* ==[ HEADER AND TABS ]==================== */}
          <div className="flex flex-col justify-start shadow-light z-20">
            <span className="text-xl font-medium pt-6 pb-3 px-5">
              Select Addons
            </span>
            <div className="flex items-center justify-start gap-1 overflow-x-scroll scrollbar-hide">
              {allCategories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedCategory((prev) => category)}
                  className={`capitalize whitespace-nowrap py-2.5 px-5 border-b-[3px] cursor-pointer ${category === selectedCategory ? "border-sienna text-sienna" : "border-transparent hover:border-ash/60"} transition-all duration-300`}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>

          {/* ==[ ADDONS AND BOTTOM ROW ]==================== */}
          <div className="relative overflow-y-scroll scrollbar-hide bg-ivory-2 z-10">
            <div className="relative min-h-device sm:min-h-[500px] grid z-10 max-sm:grid-cols-2 auto-rows-min grid-cols-6  gap-2 p-2 sm:gap-3 sm:p-3">
              {availableAddons
                .filter(({ isPopular, addon }) =>
                  selectedCategory !== BEST_SELLER
                    ? (
                        (addon as AddonDocument)
                          .category as AddonCategoryDocument
                      ).name === selectedCategory
                    : isPopular
                )
                .map(({ _id, addon }, index) => {
                  const image = (addon as AddonDocument).image as ImageDocument;
                  const label = (addon as AddonDocument).name;
                  const pricePerUnit = (addon as AddonDocument).price;
                  const isSelected = addons.find(({ id, count }) => _id === id);

                  return (
                    <div
                      className={`flex flex-col justify-start bg-ivory-1 shadow-light rounded-xl max-sm:p-1 max-sm:pb-2 p-2.5 border-[1.5px] ${addons.find(({ id, count }) => _id === id && count > 0) ? "border-sienna" : "border-transparent"}`}
                      key={index}
                    >
                      <div className="aspect-square w-full rounded-lg overflow-hidden bg-ash-3/45 relative">
                        <Image
                          src={image.url}
                          alt={image.alt || image.defaultAlt || "Addon Image"}
                          width={250}
                          height={250}
                          unoptimized={!OPTIMIZE_IMAGE}
                          decoding="async"
                          priority
                          className=""
                          draggable={false}
                        />
                        {addons.find(
                          ({ id, count }) => _id === id && count > 0
                        ) ? (
                          <div className="absolute h-full -left-[35%] w-7 scale-y-110 bg-ivory-1/65 opacity-60 rotate-12 blur-sm z-30 top-0 animate-shine-infinite-slow" />
                        ) : (
                          <></>
                        )}
                      </div>
                      <span className="text-charcoal-3 pt-2 truncate max-sm:px-1.5">
                        {label}
                      </span>
                      <span
                        className={`text-lg max-sm:px-1.5 ${addons.find(({ id, count }) => _id === id && count > 0) ? "text-sienna font-medium" : ""}`}
                      >
                        {INRSymbol} {pricePerUnit}
                      </span>
                      <div className="grid max-sm:px-1.5 *:row-start-1 *:col-start-1">
                        <div
                          onClick={() =>
                            handleAddonSelection.increment(_id as string)
                          }
                          className={`${addons.find(({ id, count }) => _id === id && count > 0) ? "hidden" : ""} relative text-white bg-sienna text-center py-1.5 rounded-md mt-1.5 sm:py-1 cursor-pointer`}
                        >
                          ADD
                          <span className="absolute top-0 right-2 text-white sm;text-sm">
                            +
                          </span>
                        </div>
                        <div
                          className={`${addons.find(({ id, count }) => _id === id && count > 0) ? "" : "hidden"} w-full mt-1.5 flex items-center justify-between`}
                        >
                          <div
                            className="aspect-[1.2/1] sm:aspect-square cursor-pointer max-sm:text-xl rounded-md bg-sienna h-full flex items-center justify-center text-white py-1 sm:py-1"
                            onClick={() =>
                              handleAddonSelection.decrement(_id as string)
                            }
                          >
                            -
                          </div>
                          <span className="py-1.5 sm:py-1">
                            {isSelected?.count || 0}
                          </span>
                          <div
                            className="aspect-[1.2/1] sm:aspect-square cursor-pointer max-sm:text-xl rounded-md bg-sienna h-full flex items-center justify-center text-white py-1 sm:py-1"
                            onClick={() =>
                              handleAddonSelection.increment(_id as string)
                            }
                          >
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* BOTTOM ROW ====================================================== */}
            <section className="sticky bottom-0 border-t-[1.5px] bg-ivory-1 border-ash/70 px-3 py-2 sm:px-5 sm:py-2 flex items-center justify-between sm:justify-end sm:gap-2 z-20">
              <div className="sm:hidden grid grid-cols-[auto_auto] gap-x-7 text-charcoal-3/80 text-[15px]">
                <span>Product</span>{" "}
                <span>
                  {INRSymbol}{" "}
                  {baseProduct.selectedPrice +
                    afterCustomizationPrice.enhancement +
                    afterCustomizationPrice.flavor}
                </span>
                <span>Addons</span>{" "}
                <span>
                  {INRSymbol} {addonsTotalAmount}
                </span>
              </div>
              <div className="max-sm:hidden grid grid-cols-[auto_auto_auto_auto] grid-row-[auto_auto] items-center justify-center">
                <span className="text-lg font-medium text-center">
                  {INRSymbol}{" "}
                  {baseProduct.selectedPrice +
                    afterCustomizationPrice.enhancement +
                    afterCustomizationPrice.flavor}
                </span>
                <span className="row-span-2 text-xl px-4">+</span>
                <span className="text-lg font-medium text-center">
                  {INRSymbol} {addonsTotalAmount}
                </span>
                <span className="row-span-2 text-xl px-4">=</span>
                <span className="text-sm text-charcoal-3/80 text-center leading-none">
                  Product
                </span>
                <span className="text-sm text-charcoal-3/80 text-center leading-none">
                  Addons
                </span>
              </div>

              {/* PROCEED TO CART BY BOOKING ------------------------------------------ */}
              <div
                onClick={onClickBookNow}
                className="relative group flex items-center justify-between min-w-[52dvw] sm:min-w-[220px] p-2.5 px-3 sm:py-2 sm:px-4 col-span-3 bg-charcoal-2 overflow-hidden text-white rounded-md sm:rounded-lg cursor-pointer"
              >
                <div className="flex flex-col items-start">
                  <span className="-mb-0.5">
                    {INRSymbol}{" "}
                    {baseProduct.selectedPrice +
                      afterCustomizationPrice.enhancement +
                      afterCustomizationPrice.flavor +
                      addonsTotalAmount}
                  </span>
                  <span className="text-sienna-3/80 text-[11px]">TOTAL</span>
                </div>
                <div className="flex items-center justify-end gap-1 sm:gap-2 transition-all duration-200 sm:group-hover:gap-3">
                  <span>
                    {addons && addons.length > 0 ? "Proceed" : "Skip"}
                  </span>
                  <ArrowRight
                    strokeWidth={2}
                    height={16}
                    width={16}
                    className="sm:hidden"
                  />
                  <ArrowRight
                    strokeWidth={2.5}
                    height={17}
                    width={17}
                    className="max-sm:hidden translate-y-[1px]"
                  />
                </div>

                <div className="absolute h-full -left-[35%] w-7 scale-y-110 bg-sienna-3/60 opacity-60 rotate-12 blur-md z-30 top-0 animate-shine-infinite-slow" />
              </div>
            </section>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
