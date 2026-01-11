"use client";
import { ClassNameType } from "@/common/types/reactTypes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";

export default function FAQs({
  faqData,
  questionClassName,
  answerClassName,
  inProductPage
}: {
  faqData: Array<{
    _id: string;
    question: string;
    answer: string | JSX.Element;
  }>;
  questionClassName?: ClassNameType;
  answerClassName?: ClassNameType;
  inProductPage?: boolean;
}) {
  const currPath = usePathname();

  return (
    <div>
      <Accordion
        type="single"
        collapsible
      >
        {faqData.map(({ question, answer }, index) => (
          <AccordionItem
            value={String(index)}
            key={index}
          >
            <AccordionTrigger
              className={`${currPath.includes("/n/") ? "text-sm text-charcoal-3 " : "text-base text-charcoal-3 "} outline-none focus:outline-none font-normal text-left hover:no-underline hover:text-sienna transition-colors duration-300 ${questionClassName || ""} `}
            >
              <h3>
                {question.includes(".")
                  ? question.substring(question.indexOf(".") + 1).trim()
                  : question}
              </h3>
            </AccordionTrigger>
            <AccordionContent
              className={` ${answerClassName || ""} ${currPath.includes("/n/") ? "text-sm" : "text-base"} text-charcoal-3/80`}
            >
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
