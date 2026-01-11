// decorators
import { BASE_HOME_BG_COLOR } from "@/components/pages/(frontend)/Home/static/pallette";

// utils
import { memo } from "react";

// components
import CategoryHorizontalSpacing from "../CategoryHorizontalSpacing";
import CategoryQAs from "./CategoryQAs";

// types
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";

function CategoryFAQs({ faqs }: { faqs: QADocument[] }) {
  return (
    <CategoryHorizontalSpacing
      className={`${BASE_HOME_BG_COLOR} z-[810] pt-8 max-sm:px-0`}
    >
      <div
        className={`flex max-sm:flex-col items-start max-sm:pb-1 sm:items-center justify-center sm:justify-between gap-y-1.5 sm:gap-y-1 px-3.5 sm:px-3 sm:pl-0 1200:pr-0 pt-3 sm:pt-2`}
      >
        <h2
          className={`font-medium text-charcoal tracking-tight text-[23px] sm:text-[26px]`}
        >
          {"Frequently Asked Questions"}
        </h2>
      </div>
      <div
        className={`bg-ivory-1 shadow-[0px_0px_10px_#ececec] sm:shadow-[0px_0px_10px_#f1f1f1] p-3 py-4 sm:p-4 sm:py-5 rounded-2xl overflow-hidden my-4`}
      >
        <div className="px-2">
          <CategoryQAs qas={faqs} />
        </div>
      </div>
    </CategoryHorizontalSpacing>
  );
}

export default memo(CategoryFAQs);
