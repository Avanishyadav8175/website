// components
import Input from "@/lib/Forms/Input/Input";
import QAs from "@/components/custom/inputs/qas/QAs";

// types
import { type FAQGroupDocument } from "@/common/types/documentation/presets/faqGroup";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: FAQGroupDocument;
}) {
  return (
    <section className="flex flex-col gap-3 w-[75dvw] p-2">
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Name",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.name || ""}
        errorCheck={false}
        validCheck={false}
      />
      <QAs
        name="faqs"
        label="FAQs"
        itemLabel="FAQ"
        defaultValue={initialDocument?.faqs}
      />
    </section>
  );
}
