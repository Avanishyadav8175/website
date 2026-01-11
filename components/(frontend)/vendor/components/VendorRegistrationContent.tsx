// constants
import { WEBSITE_NAME } from "@/common/constants/environmentVariables";
import { VENDOR_REGISTRATION_FAQS } from "../constants/vendorRegistrationFAQData";
import { VENDOR_REGISTRATION_SUCCESS_STORIES } from "../constants/vendorRegistrationSuccessStory";
import { VENDOR_REGISTRATION_WHY_JOIN } from "../constants/vendorRegistrationWhyJoin";

// components
import FAQs from "@/components/(frontend)/global/_Templates/FAQs/FAQs";
import FrontendContentReviews from "@/components/pages/(frontend)/Content/components/Others/ContentReviews/ContentReviews";

export default function VendorRegistrationContent() {
  return (
    <div className="mt-[72px] mb-9 flex flex-col justify-start gap-32 relative left-1/2 -translate-x-1/2 w-device max-w-1200">
      <div className="flex flex-col justify-start gap-7 max-sm:px-5">
        <span className="text-2xl text-center font-medium sm:pb-5">
          Why {WEBSITE_NAME}?
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-14 sm:gap-16 sm:px-28 my-5">
          {VENDOR_REGISTRATION_WHY_JOIN.map(({ svg, header, desc }, index) => (
            <span
              key={index}
              className="flex flex-col justify-start sm:gap-2 items-center text-center"
            >
              <span>{svg}</span>
              <span className="text-xl pb-1.5 sm:pb-0.5 pt-3.5">{header}</span>
              <span className="text-sm text-charcoal-3/90">{desc}</span>
            </span>
          ))}
        </div>
      </div>
      <FrontendContentReviews
        availableReviewImages={[]}
        content={{
          _id: "66f4f1d9e7180ff03e64c977",
          reviews: VENDOR_REGISTRATION_SUCCESS_STORIES.map(
            ({ review }) => review
          ),
          showReviews: VENDOR_REGISTRATION_SUCCESS_STORIES.length
        }}
      />
      <div className="flex flex-col justify-start gap-7 max-sm:px-4">
        <span className="text-2xl text-center font-medium pb-5">
          Frequently Asked Questions
        </span>
        <div className="sm:px-28 mb-5">
          <FAQs faqData={VENDOR_REGISTRATION_FAQS.slice(0, 6)} />
        </div>
      </div>
    </div>
  );
}
