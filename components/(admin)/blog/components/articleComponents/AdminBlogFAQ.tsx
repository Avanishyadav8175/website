import { QADocument } from "@/common/types/documentation/nestedDocuments/qa";
import { generateRandomId } from "@/components/(admin)/Images/static/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import Input from "@/lib/Forms/Input/Input";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminBlogFAQ({
  data,
  onEdits
}: {
  data: QADocument[];
  onEdits: (updatedFAQs: QADocument[]) => void;
}) {
  const [faqs, setFaqs] = useState<QADocument[]>(data || []);
  const [empty, setEmpty] = useState<QADocument>({
    question: "",
    answer: ""
  } as QADocument);
  const [customFocus, setCustomFocus] = useState<{
    castFocus: boolean;
    id: string;
  }>({ castFocus: false, id: "" });

  useEffect(() => {
    if (customFocus.castFocus) {
      const i = document.getElementById(customFocus.id);
      if (i) {
        i.focus();
        setCustomFocus((prev) => ({ castFocus: false, id: "" }));
      }
    }
  }, [customFocus]);

  useEffect(() => {
    onEdits(faqs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faqs]);

  return (
    <div className="border border-b-0 border-ash bg-ivory-1">
      <Accordion type="multiple">
        {faqs.map(({ question, answer, _id }, index) => (
          <div
            className="grid grid-cols-[1fr_38px]"
            key={index}
          >
            <AccordionItem
              className="border-b border-ash px-4"
              value={`item-${index + 1}`}
            >
              <AccordionTrigger className="no-underline font-normal text-base flex items-center justify-stretch gap-1.5">
                <span>Q:</span>
                <div className="w-full">
                  <Input
                    type="text"
                    id={_id as string}
                    isRequired={false}
                    errorCheck={false}
                    validCheck={false}
                    name={`q-${index + 1}`}
                    customValue={{
                      value: question,
                      setValue: (newVal: string) => {
                        setFaqs((prev) =>
                          prev.map((faq) =>
                            faq._id === _id
                              ? ({ ...faq, question: newVal } as QADocument)
                              : faq
                          )
                        );
                      }
                    }}
                    placeholder="Write a Question"
                    customStyle="bg-transparent outline-none w-full placeholder:text-red-600/50"
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent className=" text-base flex items-center justify-stretch gap-2">
                <span>A:</span>
                <div className="w-full">
                  <Input
                    type="text"
                    isRequired={false}
                    errorCheck={false}
                    validCheck={false}
                    name={`a-${index + 1}`}
                    customValue={{
                      value: answer,
                      setValue: (newVal: string) => {
                        setFaqs((prev) =>
                          prev.map((faq) =>
                            faq._id === _id
                              ? ({ ...faq, answer: newVal } as QADocument)
                              : faq
                          )
                        );
                      }
                    }}
                    placeholder="Write its Answer"
                    customStyle="bg-transparent outline-none w-full placeholder:text-blue-600/50"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
            <div
              onClick={() =>
                setFaqs((prev) => prev.filter((faq) => faq._id !== _id))
              }
              className="transition-all duration-300 cursor-pointer hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center border-b border-l border-red-200 hover:border-white"
            >
              <Trash2
                strokeWidth={1.5}
                width={20}
                height={20}
              />
            </div>
          </div>
        ))}

        <div className="grid grid-cols-[1fr_38px]">
          <AccordionItem
            className="border-b border-ash px-4"
            value={`item-${faqs.length + 1}`}
          >
            <AccordionTrigger className="no-underline font-normal text-base flex items-center justify-stretch gap-1.5">
              <span>Q:</span>
              <div className="w-full">
                <Input
                  type="text"
                  isRequired={false}
                  errorCheck={false}
                  validCheck={false}
                  name={`q-${faqs.length + 1}`}
                  customValue={{
                    value: empty.question,
                    setValue: (newVal: string) => {
                      const newId = generateRandomId(16);

                      setFaqs((prev) => [
                        ...prev,
                        {
                          question: newVal,
                          answer: "",
                          _id: newId
                        } as QADocument
                      ]);

                      setCustomFocus((prev) => ({
                        castFocus: true,
                        id: newId
                      }));
                    }
                  }}
                  placeholder="Write a Question"
                  customStyle="bg-transparent outline-none w-full placeholder:text-red-600/50"
                />
              </div>
            </AccordionTrigger>
            <AccordionContent className=" text-base flex items-center justify-stretch gap-2">
              <span>A:</span>
              <div className="w-full">
                <Input
                  type="text"
                  isRequired={false}
                  errorCheck={false}
                  validCheck={false}
                  name={`a-${faqs.length + 1}`}
                  customValue={{
                    value: empty.answer,
                    setValue: (newVal: string) => {
                      const newId = generateRandomId(16);

                      setFaqs((prev) => [
                        ...prev,
                        {
                          question: "",
                          answer: newVal,
                          _id: newId
                        } as QADocument
                      ]);

                      setCustomFocus((prev) => ({
                        castFocus: true,
                        id: newId
                      }));
                    }
                  }}
                  placeholder="Write its Answer"
                  customStyle="bg-transparent outline-none w-full placeholder:text-blue-600/50"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <div className="transition-all duration-300 text-red-400 flex items-center justify-center border-b border-l border-red-200">
            <Trash2
              strokeWidth={1.5}
              width={20}
              height={20}
            />
          </div>
        </div>
      </Accordion>
    </div>
  );
}
