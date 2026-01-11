"use client";

// constants
import { GOOGLE_ANALYTICS_ID } from "@/common/constants/environmentVariables";

// hooks
import { useState } from "react";

// components
import { GoogleAnalytics } from "@next/third-parties/google";
import VendorRegistrationBanner from "./components/VendorRegistrationBanner";
import VendorRegistrationContent from "./components/VendorRegistrationContent";
import VendorRegistrationForm from "./components/VendorRegistrationForm";

// types
import { type FoundUsSourceDocument } from "@/common/types/documentation/presets/foundUsSource";
import { type VendorOfferCategoryDocument } from "@/common/types/documentation/presets/vendorOfferCategory";

export default function VendorRegistration({
  foundUsSources,
  vendorOfferCategories
}: {
  foundUsSources: FoundUsSourceDocument[];
  vendorOfferCategories: VendorOfferCategoryDocument[];
}) {
  // states
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <>
      <div className="absolute -top-[67px] min-h-device w-full flex flex-col justify-start items-stretch">
        <VendorRegistrationBanner
          asCustomerContactUs={false}
          onShowForm={() => {
            setShowForm(true);
          }}
        />
        <VendorRegistrationContent />
        <VendorRegistrationForm
          showForm={showForm}
          foundUsSources={foundUsSources}
          vendorOfferCategories={vendorOfferCategories}
          onChangeShowForm={setShowForm}
        />
      </div>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </>
  );
}
