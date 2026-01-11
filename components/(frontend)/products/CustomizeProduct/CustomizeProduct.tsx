"use client";
import { FrontendProductCustomizationType } from "./static/type";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CustomizeProductSpacing } from "./components/CustomizeProductTitle";
import ProductEnhancements from "./components/ProductEnhancements";
import CustomizationImageUpload from "./components/customizationImageUpload/CustomizationImageUpload";
import ProductText from "./components/ProductText";
import ProductFlavor from "./components/ProductFlavor";
import FrontendProductCustomizeSummary from "./components/ProductCustomizeSummary";
import FrontendProductColor from "./components/ProductColor";
import { useEffect, useRef } from "react";
import { LabelDocument } from "@/common/types/documentation/presets/label";
import { BalloonColorGroupDocument } from "@/common/types/documentation/presets/balloonColorGroup";
import { UpgradeDocument } from "@/common/types/documentation/presets/upgrade";
import { FlavourDocument } from "@/common/types/documentation/presets/flavour";

export default function FrontendProductCustomization({
  showDialog,
  setShowDialog,
  enhancements,
  setEnhancements,
  availableEnhancements,
  flavor,
  setFlavor,
  upgrade,
  setUpgrade,
  availableFlavors,
  imgText,
  setImgText,
  textLetterLimit,
  imgImages,
  setImgImages,
  color,
  setColor,
  otherColors,
  setOtherColors,
  availableColors,
  maxImages,
  imageDimensions,
  currPincode,
  dateTime,
  baseProduct,
  onBook,
  onBack,
  customizations,
  contentName,
  customizationImages,
  onChangeCustomizationImages
}: FrontendProductCustomizationType) {
  const textareaRef = useRef(null);

  const showPriceDetails = {
    enhancements: customizations.enhancement ? true : false,
    upgrade: customizations.upgrade ? true : false,
    flavor: customizations.flavour ? true : false,
    text: customizations.uploadText ? true : false,
    color: customizations.balloonColor ? true : false,
    image: customizations.uploadImage ? true : false
  };

  useEffect(() => {
    if (textareaRef.current !== null)
      (textareaRef.current as HTMLTextAreaElement).blur();
  }, []);

  return (
    <Dialog
      open={showDialog}
      onOpenChange={setShowDialog}
    >
      <DialogContent className="p-0 outline-none border-none bg-transparent min-w-fit">
        <section
          className={`relative bg-ivory  sm:bg-ivory-1 pt-3.5 sm:py-0 max-sm:w-device max-sm:h-device sm:rounded-2xl sm:overflow-hidden sm:w-[80dvw] sm:max-w-[1000px] sm:aspect-[20/11] flex flex-col items-stretch max-sm:justify-between sm:justify-start sm:grid sm:grid-cols-[5fr_3fr] gap-3.5 sm:gap-4 max-sm:overflow-y-scroll scrollbar-hide`}
        >
          {/* customizations section ============================== */}
          <div className="max-sm:h-[100dvh_-_64px] sm:py-6 flex flex-col max-sm:items-stretch justify-start gap-3.5 sm:gap-6 sm:overflow-y-scroll scrollbar-hide">
            {/* ENHANCEMENTS ===================================== */}
            {customizations.enhancement ? (
              <CustomizeProductSpacing
                title={
                  (customizations.enhancement.label as LabelDocument).label
                }
              >
                <ProductEnhancements
                  availableEnhancements={customizations.enhancement.items}
                  enhancements={enhancements}
                  setEnhancements={setEnhancements}
                />
              </CustomizeProductSpacing>
            ) : (
              <></>
            )}

            {/* UPGRADE ===================================== */}
            {customizations.upgrade ? (
              <CustomizeProductSpacing
                title={(customizations.upgrade.label as LabelDocument).label}
              >
                <ProductFlavor
                  availableOptions={customizations.upgrade.options}
                  selected={upgrade}
                  setSelected={setUpgrade}
                  type="upgrade"
                  defaultOption={
                    customizations.upgrade.default as UpgradeDocument
                  }
                />
              </CustomizeProductSpacing>
            ) : (
              <></>
            )}

            {/* FLAVOUR ===================================== */}
            {customizations.flavour ? (
              <CustomizeProductSpacing
                title={(customizations.flavour.label as LabelDocument).label}
              >
                <ProductFlavor
                  availableOptions={customizations.flavour.options}
                  selected={flavor}
                  setSelected={setFlavor}
                  type="flavor"
                  defaultOption={
                    customizations.flavour.default as FlavourDocument
                  }
                />
              </CustomizeProductSpacing>
            ) : (
              <></>
            )}

            {/* UPLOAD TEXT ===================================== */}
            {customizations.uploadText ? (
              <CustomizeProductSpacing
                title={(customizations.uploadText.label as LabelDocument).label}
              >
                <ProductText
                  imgText={imgText}
                  setImgText={setImgText}
                  textLetterLimit={
                    customizations.uploadText.characterLimit || textLetterLimit
                  }
                  ref={textareaRef}
                />
              </CustomizeProductSpacing>
            ) : (
              <></>
            )}

            {/* BALLOON COLORS ===================================== */}
            {customizations.balloonColor ? (
              <CustomizeProductSpacing
                title={
                  (customizations.balloonColor.label as LabelDocument).label
                }
              >
                <FrontendProductColor
                  color={color}
                  setColor={setColor}
                  otherColors={otherColors}
                  setOtherColors={setOtherColors}
                  availableColors={
                    customizations.balloonColor
                      .groups as BalloonColorGroupDocument[]
                  }
                />
              </CustomizeProductSpacing>
            ) : (
              <></>
            )}

            {/* IMAGE UPLOAD ===================================== */}
            {customizations.uploadImage ? (
              <CustomizeProductSpacing
                title={
                  (customizations.uploadImage.label as LabelDocument).label
                }
              >
                <CustomizationImageUpload
                  contentName={contentName}
                  images={customizationImages}
                  maxCount={customizations.uploadImage.imageLimit || 1}
                  onChangeImages={onChangeCustomizationImages}
                />
              </CustomizeProductSpacing>
            ) : (
              <></>
            )}
          </div>

          {/* SUMMARY OF SELECTED ENHANCEMENTS ===================================== */}
          <FrontendProductCustomizeSummary
            enhancements={enhancements}
            flavor={
              flavor
                ? customizations.flavour?.options.find(
                    ({ _id }) => _id === flavor
                  )
                : undefined
            }
            upgrade={
              upgrade
                ? customizations.upgrade?.options.find(
                    ({ _id }) => _id === upgrade
                  )
                : undefined
            }
            imgText={imgText}
            imgImages={imgImages}
            currPincode={currPincode}
            dateTime={dateTime}
            baseProduct={baseProduct}
            onBook={onBook}
            onBack={onBack}
            pricesToShow={showPriceDetails}
          />
        </section>
      </DialogContent>
    </Dialog>
  );
}
