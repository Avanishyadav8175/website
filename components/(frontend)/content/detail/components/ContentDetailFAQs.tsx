// types
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";
import CustomFAQ from "@/components/(frontend)/components/header/page/components/MobileDrawer/components/CustomFAQ";

export default function ContentDetailFAQs({ faqs }: { faqs: QADocument[] }) {
  return (
    <div>
      {faqs.map(({ question, answer }, index) => (
        <CustomFAQ
          q={question}
          a={answer}
          key={index}
        />
      ))}
    </div>
  );
}
