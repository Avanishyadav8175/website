// components
import FooterSectionLinks from "@/components/custom/inputs/footerSectionLinks/FooterSectionLinks";
import Input from "@/lib/Forms/Input/Input";

// types
import { type FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: FooterSectionDocument;
}) {
  return (
    <section className="grid grid-cols-1 gap-4 w-[70vw] max-h-[calc(100dvh_-_270px)] px-2 overflow-y-scroll scrollbar-hide">
      <Input
        type="text"
        name="heading"
        isRequired
        labelConfig={{
          label: "Heading (H1)"
        }}
        placeholder="heading"
        defaultValue={initialDocument?.heading || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="text"
        name="path"
        isRequired={false}
        labelConfig={{
          label: "Path"
        }}
        placeholder="path"
        defaultValue={initialDocument?.path || ""}
        errorCheck={false}
        validCheck={false}
      />
      <FooterSectionLinks
        name="links"
        label="Links"
        isRequired={false}
        defaultValue={initialDocument?.links || []}
      />
    </section>
  );
}
