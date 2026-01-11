// libraries
import { decode } from "he";

// constants
import { INFO_TABS } from "../constants/infoTabs";

// hook
import { useState } from "react";

// components
import ContentDetailFAQs from "./ContentDetailFAQs";
import ContentDetailCareInfo from "./ContentDetailCareInfo";
import ContentDetailDeliveryDetail from "./ContentDetailDeliveryDetail";
import ContentDetailIncludeExclude from "./ContentDetailIncludeExclude";
import ContentHorizontalSpacing from "../../spacing/ContentHorizontalSpacing";

// types
import { type CancellationPolicyDocument } from "@/common/types/documentation/presets/cancellationPolicy";
import { type CareInfoDocument } from "@/common/types/documentation/presets/careInfo";
import { type ContentDetailDocument } from "@/common/types/documentation/nestedDocuments/contentDetail";
import { type DeliveryDetailDocument } from "@/common/types/documentation/presets/deliveryDetail";
import { type FAQGroupDocument } from "@/common/types/documentation/presets/faqGroup";

export default function ContentDetailInfo({
  info
}: {
  info: ContentDetailDocument;
}) {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const includes = info.includes;
  const excludes = info.excludes;
  const faqs = (info.faqGroup as FAQGroupDocument).faqs;
  const deliveryDetail = (info.deliveryDetail as DeliveryDetailDocument)
    .content;
  const cancellationPolicy = decode(
    (info.cancellationPolicy as CancellationPolicyDocument).content
  );
  const careInfo = (info.careInfo as CareInfoDocument).content;

  return (
    <ContentHorizontalSpacing className="lg:ml-6 sm:pl-2 lg:pl-6 my-6">
      <div className="flex items-center justify-start gap-4 overflow-x-scroll scrollbar-hide border-b border-charcoal-3/10">
        {INFO_TABS.map((name, i) => (
          <h2
            key={i}
            className={`border-b-[3px] px-1 py-2 cursor-pointer ${i === activeIndex ? "border-sienna text-sienna font-medium" : "border-transparent"} transition-all duration-200 whitespace-nowrap`}
            onClick={() => {
              setActiveIndex(i);
            }}
          >
            {name}
          </h2>
        ))}
      </div>
      {activeIndex === 0 && (
        <ContentDetailIncludeExclude
          includes={includes}
          excludes={excludes}
        />
      )}
      {activeIndex === 1 && (
        <ContentDetailDeliveryDetail
        deliveryDetail={deliveryDetail}
        cancellationPolicy={cancellationPolicy}
        />
      )}
      {activeIndex === 2 && <ContentDetailCareInfo careInfo={careInfo} />}
      {activeIndex === 3 && <ContentDetailFAQs faqs={faqs} />}
    </ContentHorizontalSpacing>
  );
}
