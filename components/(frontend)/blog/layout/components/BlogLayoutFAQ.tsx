// components
import FAQs from "@/components/ui/FAQs";

// types
import { type BlogLayoutDocument } from "@/common/types/documentation/nestedDocuments/blogLayout";
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";

export default function BlogLayoutFAQ({
  layout
}: {
  layout: BlogLayoutDocument;
}) {
  const faqs = (layout?.faq as QADocument[]) || [];

  if (faqs.length) {
    return (
      <div className="mt-12 max-sm:mb-5">
        <span className={"text-xl font-medium mb-3 "}>
          Frequently Asked Questions
        </span>
        <FAQs faqs={faqs} />
      </div>
    );
  }

  return <></>;
}
