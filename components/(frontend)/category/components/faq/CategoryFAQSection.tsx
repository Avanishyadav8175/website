// utils
import { memo } from "react";

// components
import CategoryFAQs from "./CategoryFAQs";

// types
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";

function CategoryFAQSection({ faqs }: { faqs?: QADocument[] }) {
  if (faqs && faqs.length) {
    return <CategoryFAQs faqs={faqs} />;
  }

  return <></>;
}

export default memo(CategoryFAQSection);
