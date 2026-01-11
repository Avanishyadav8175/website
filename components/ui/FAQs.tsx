"use client";

// components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

// types
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";

export default function FAQs({ faqs }: { faqs: QADocument[] }) {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
      >
        {faqs.map(({ _id, question, answer }) => (
          <AccordionItem
            key={_id as string}
            value={_id as string}
          >
            <AccordionTrigger
              className={`text-base text-charcoal-3 outline-none focus:outline-none font-normal text-left hover:no-underline hover:text-sienna transition-colors duration-300`}
            >
              <h3>
                {question.includes(".")
                  ? question.substring(question.indexOf(".") + 1).trim()
                  : question}
              </h3>
            </AccordionTrigger>
            <AccordionContent className={`text-base text-charcoal-3/80`}>
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
