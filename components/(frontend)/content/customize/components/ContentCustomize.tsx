// utils
import { lazy, memo } from "react";

// components
const LazyContentCustomizeBalloonColor = lazy(
  () => import("./ContentCustomizeBalloonColor")
);
const LazyContentCustomizeEnhancements = lazy(
  () => import("./ContentCustomizeEnhancements")
);
const LazyContentCustomizeFlavour = lazy(
  () => import("./ContentCustomizeFlavour")
);
const LazyContentCustomizePriceSummary = lazy(
  () => import("./ContentCustomizePriceSummary")
);
const LazyContentCustomizeUpgrade = lazy(
  () => import("./ContentCustomizeUpgrade")
);
const LazyContentCustomizeUploadImage = lazy(
  () => import("./ContentCustomizeUploadImage")
);
const LazyContentCustomizeUploadText = lazy(
  () => import("./ContentCustomizeUploadText")
);
import { Suspense } from "react";

// types
import { type CartItemCustomizationDocument } from "@/common/types/documentation/nestedDocuments/cartItemCustomization";
import { type CartItemDeliveryDocument } from "@/common/types/documentation/nestedDocuments/cartItemDelivery";
import { type CartItemEnhancementDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancement";
import { type CartItemFlavourDocument } from "@/common/types/documentation/nestedDocuments/cartItemFlavour";
import { type CartItemUpgradeDocument } from "@/common/types/documentation/nestedDocuments/cartItemUpgrade";
import { type CartItemUploadedTextDocument } from "@/common/types/documentation/nestedDocuments/cartItemUploadedText";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type ContentBalloonColorDocument } from "@/common/types/documentation/nestedDocuments/contentBalloonColor";
import { type ContentCustomizationDocument } from "@/common/types/documentation/nestedDocuments/contentCustomization";
import { type ContentCustomizationUploadImageDocument } from "@/common/types/documentation/nestedDocuments/contentCustomizationUploadImage";
import { type ContentCustomizationUploadTextDocument } from "@/common/types/documentation/nestedDocuments/contentCustomizationUploadText";
import { type ContentEnhancementDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancement";
import { type ContentFlavourDocument } from "@/common/types/documentation/nestedDocuments/contentFlavour";
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { type ContentUpgradeDocument } from "@/common/types/documentation/nestedDocuments/contentUpgrade";
import { type ImageDocument } from "@/common/types/documentation/media/image";

function ContentCustomize({
  contentName,
  contentImage,
  contentPrice,
  selectedCity,
  cartItemCustomization,
  contentCustomization,
  cartItemDelivery,
  onChangeCartItemCustomization,
  onBookNow
}: {
  contentName: string;
  contentImage: ImageDocument;
  contentPrice: ContentPriceDocument;
  selectedCity: CityDocument | null;
  cartItemCustomization: CartItemCustomizationDocument;
  contentCustomization: ContentCustomizationDocument;
  cartItemDelivery: CartItemDeliveryDocument;
  onChangeCartItemCustomization: (
    cartItemCustomization: CartItemCustomizationDocument
  ) => void;
  onBookNow: () => void;
}) {
  return (
    <>
      <div className="max-sm:h-[100dvh_-_64px] sm:py-6 flex flex-col max-sm:items-stretch justify-start gap-3.5 sm:gap-6 sm:overflow-y-scroll scrollbar-hide">
        {Boolean(contentCustomization?.enhancement) && (
          <Suspense fallback={<></>}>
            <LazyContentCustomizeEnhancements
              enhancement={
                contentCustomization!.enhancement as ContentEnhancementDocument
              }
              cartItemEnhancement={
                cartItemCustomization?.enhancement as CartItemEnhancementDocument
              }
              onChangeCartItemEnhancement={(
                enhancement?: CartItemEnhancementDocument
              ) => {
                onChangeCartItemCustomization({
                  ...cartItemCustomization,
                  enhancement
                } as CartItemCustomizationDocument);
              }}
            />
          </Suspense>
        )}
        {Boolean(contentCustomization?.upgrade) && (
          <Suspense fallback={<></>}>
            <LazyContentCustomizeUpgrade
              upgrade={contentCustomization!.upgrade as ContentUpgradeDocument}
              cartItemUpgrade={
                cartItemCustomization?.upgrade as CartItemUpgradeDocument
              }
              onChangeCartItemUpgrade={(upgrade?: CartItemUpgradeDocument) => {
                onChangeCartItemCustomization({
                  ...cartItemCustomization,
                  upgrade
                } as CartItemCustomizationDocument);
              }}
            />
          </Suspense>
        )}
        {Boolean(contentCustomization?.flavour) && (
          <Suspense fallback={<></>}>
            <LazyContentCustomizeFlavour
              flavour={contentCustomization!.flavour as ContentFlavourDocument}
              cartItemFlavour={
                cartItemCustomization?.flavour as CartItemFlavourDocument
              }
              onChangeCartItemFlavour={(flavour?: CartItemFlavourDocument) => {
                onChangeCartItemCustomization({
                  ...cartItemCustomization,
                  flavour
                } as CartItemCustomizationDocument);
              }}
            />
          </Suspense>
        )}
        {Boolean(contentCustomization?.uploadText) && (
          <Suspense fallback={<></>}>
            <LazyContentCustomizeUploadText
              uploadText={
                contentCustomization!
                  .uploadText as ContentCustomizationUploadTextDocument
              }
              cartItemUploadedText={
                cartItemCustomization.uploadedText as CartItemUploadedTextDocument
              }
              onChangeCartItemUploadedText={(
                uploadedText?: CartItemUploadedTextDocument
              ) => {
                onChangeCartItemCustomization({
                  ...cartItemCustomization,
                  uploadedText
                } as CartItemCustomizationDocument);
              }}
            />
          </Suspense>
        )}
        {Boolean(contentCustomization?.balloonColor) && (
          <Suspense fallback={<></>}>
            <LazyContentCustomizeBalloonColor
              balloonColor={
                contentCustomization!
                  .balloonColor as ContentBalloonColorDocument
              }
              cartItemBalloonColor={cartItemCustomization.balloonColor}
              onChangeCartItemBalloonColor={(balloonColor?: string) => {
                onChangeCartItemCustomization({
                  ...cartItemCustomization,
                  balloonColor
                } as CartItemCustomizationDocument);
              }}
            />
          </Suspense>
        )}
        {Boolean(contentCustomization?.uploadImage) && (
          <Suspense fallback={<></>}>
            <LazyContentCustomizeUploadImage
              contentName={contentName}
              uploadImage={
                contentCustomization!
                  .uploadImage as ContentCustomizationUploadImageDocument
              }
              cartItemUploadedImage={cartItemCustomization.uploadedImage}
              onChangeCartItemUploadedImage={(
                uploadedImage?: CartItemCustomizationDocument
              ) => {
                onChangeCartItemCustomization({
                  ...cartItemCustomization,
                  uploadedImage
                } as CartItemCustomizationDocument);
              }}
            />
          </Suspense>
        )}
      </div>
      <Suspense fallback={<></>}>
        <LazyContentCustomizePriceSummary
          contentName={contentName}
          contentImage={contentImage}
          contentPrice={contentPrice}
          selectedCity={selectedCity}
          cartItemCustomization={cartItemCustomization}
          cartItemDelivery={cartItemDelivery}
          onBookNow={onBookNow}
        />
      </Suspense>
    </>
  );
}

export default memo(ContentCustomize);
