// utils
import { memo } from "react";

// components
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

// types
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";

function CategoryQAItem({ qa: { _id, question, answer } }: { qa: QADocument }) {
  return (
    <AccordionItem value={_id as string}>
      <AccordionTrigger
        className={`text-base text-charcoal-3 outline-none focus:outline-none font-normal text-left hover:no-underline hover:text-sienna transition-colors duration-300`}
      >
        <h3>{question}</h3>
      </AccordionTrigger>
      <AccordionContent className={`text-base text-charcoal-3/80`}>
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
}

export default memo(CategoryQAItem);
