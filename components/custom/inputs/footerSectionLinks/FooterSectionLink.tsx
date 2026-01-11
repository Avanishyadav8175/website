// icons
import { X } from "lucide-react";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type FooterSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/footerSectionLink";

export default function FooterSectionLink({
  index,
  link,
  onChangeLink,
  onDeleteLink
}: {
  index: number;
  link: FooterSectionLinkDocument;
  onChangeLink: (newLink: FooterSectionLinkDocument) => void;
  onDeleteLink: () => void;
}) {
  return (
    <section className="grid grid-cols-[24px_1fr_1fr_24px] items-center gap-5">
      <span>{`${index + 1}.`}</span>
      <Input
        type="text"
        name="linkLabel"
        isRequired
        labelConfig={{
          label: ""
        }}
        placeholder="label"
        customValue={{
          value: link.label || "",
          setValue: (label) => {
            onChangeLink({
              ...link,
              label
            } as FooterSectionLinkDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="text"
        name="LinkPath"
        isRequired
        labelConfig={{
          label: ""
        }}
        placeholder="path"
        customValue={{
          value: link.path,
          setValue: (path) => {
            onChangeLink({
              ...link,
              path
            } as FooterSectionLinkDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <div
        onClick={() => {
          onDeleteLink();
        }}
        className="aspect-square rounded-full bg-red-600 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700"
      >
        <X
          strokeWidth={1.5}
          width={16}
          height={16}
        />
      </div>
    </section>
  );
}
