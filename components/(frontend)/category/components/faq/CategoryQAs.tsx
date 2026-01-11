// utils
import { memo } from "react";

// components
import { Accordion } from "@/components/ui/accordion";
import CategoryQAItem from "./CategoryQAItem";

// types
import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";
import CustomFAQ from "@/components/(frontend)/components/header/page/components/MobileDrawer/components/CustomFAQ";

function CategoryQAs({ qas }: { qas: QADocument[] }) {
  return (
    <div>
      {qas.map(({ question, answer }, index) => (
        <CustomFAQ
          key={index}
          a={answer}
          q={question}
          condensedH="h-16 min-h-16"
          aClassName="!px-0 py-1.5 text-black/70"
          qClassName="!px-0 font-medium"
        />
      ))}
    </div>
  );
  return (
    <Accordion
      type="single"
      collapsible
    >
      {qas.map((qa) => (
        <CategoryQAItem
          key={qa._id as string}
          qa={qa}
        />
      ))}
    </Accordion>
  );
}

export default memo(CategoryQAs);
