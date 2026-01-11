// hooks
import { useAppStatus } from "@/hooks/useAppStatus";

// components
import ContentDetailsUI from "./ContentDetailsUI";
import ContentDetailsWithContext from "./ContentDetailsWithContext";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type BasicImageType } from "@/common/types/types";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import { type ContentVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentVariantCategory";
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";
import { type ContentAvailabilityDocument } from "@/common/types/documentation/nestedDocuments/contentAvailability";
import { type CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";

export default function ContentDetails({
  details,
  primaryImage,
  showServingInfo,
  relatedCoupons,
  isReferenceActive,
  selectedReference,
  referenceDocuments,
  selectedCustom,
  customVariantDetails,
  contentAvailability,
  customizationImages,
  timer,
  onSelectReference,
  onSelectCustom,
  onChangeCustomizationImages
}: {
  details: ContentDocument;
  primaryImage: BasicImageType;
  showServingInfo: boolean;
  relatedCoupons?: CouponDocument[];
  isReferenceActive: boolean;
  selectedReference: string;
  referenceDocuments: ContentVariantCategoryDocument[] | undefined;
  selectedCustom: string | undefined;
  customVariantDetails:
    | {
        name: string;
        price: ContentPriceDocument;
      }
    | undefined;
  contentAvailability: ContentAvailabilityDocument;
  customizationImages: CustomizationImageDocument[];
  timer: string;
  onSelectReference: (selectedRefId: string) => void;
  onSelectCustom: (selectedCustomId: string) => void;
  onChangeCustomizationImages: (
    customizationImages: CustomizationImageDocument[]
  ) => void;
}) {
  // hooks
  const { isLoaded } = useAppStatus();

  if (isLoaded) {
    return (
      <ContentDetailsWithContext
        details={details}
        primaryImage={primaryImage}
        showServingInfo={showServingInfo}
        relatedCoupons={relatedCoupons}
        isReferenceActive={isReferenceActive}
        selectedReference={selectedReference}
        referenceDocuments={referenceDocuments}
        selectedCustom={selectedCustom}
        customVariantDetails={customVariantDetails}
        contentAvailability={contentAvailability}
        customizationImages={customizationImages}
        timer={timer}
        onSelectReference={onSelectReference}
        onSelectCustom={onSelectCustom}
        onChangeCustomizationImages={onChangeCustomizationImages}
      />
    );
  }

  return (
    <ContentDetailsUI
      details={details}
      primaryImage={primaryImage}
      showServingInfo={showServingInfo}
      relatedCoupons={relatedCoupons}
      isReferenceActive={isReferenceActive}
      selectedReference={selectedReference}
      referenceDocuments={referenceDocuments}
      selectedCustom={selectedCustom}
      customVariantDetails={customVariantDetails}
      contentAvailability={contentAvailability}
      customizationImages={customizationImages}
      timer={timer}
      selectedCity={null}
      // selectedPincode={null}
      // onSelectPincode={() => {}}
      // onSearchPincode={() => []}
      addItemToCart={() => {}}
      onSelectReference={onSelectReference}
      onSelectCustom={onSelectCustom}
      onChangeCustomizationImages={onChangeCustomizationImages}
    />
  );
}
