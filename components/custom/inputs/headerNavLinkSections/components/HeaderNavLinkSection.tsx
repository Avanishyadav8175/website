// icons
import { X } from "lucide-react";

// utils
import { getInitialHeaderNavLinkSectionLinkValue } from "../utils/getInitialHeaderNavLinkSectionLinkValue";

// components
import HeaderNavLinkSectionLinks from "./HeaderNavLinkSectionLinks";
import Input from "@/lib/Forms/Input/Input";

// types
import { type HeaderNavLinkSectionDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSection";

export default function HeaderNavLinkSection({
  index,
  label,
  section,
  onChangeSection,
  onDeleteSection
}: {
  index: number;
  label?: string;
  section: HeaderNavLinkSectionDocument;
  onChangeSection: (newSection: HeaderNavLinkSectionDocument) => void;
  onDeleteSection: () => void;
}) {
  return (
    <section className="flex flex-col gap-5 bg-ash/30 relative rounded-xl p-5 border border-ash">
      <div
        onClick={() => {
          onDeleteSection();
        }}
        className="absolute -top-1.5 -right-1.5 rounded-full bg-red-600 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700"
      >
        <X
          strokeWidth={1.5}
          width={16}
          height={16}
        />
      </div>
      <span className="text-xl underline">{`${label || "Section"} ${index + 1}`}</span>
      <Input
        type="text"
        name="heading"
        isRequired
        labelConfig={{
          label: "Heading (H1)"
        }}
        placeholder="heading"
        customValue={{
          value: section.heading || "",
          setValue: (heading) => {
            onChangeSection({
              ...section,
              heading
            } as HeaderNavLinkSectionDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <HeaderNavLinkSectionLinks
        links={section.links || [getInitialHeaderNavLinkSectionLinkValue()]}
        onChangeLinks={(links) => {
          onChangeSection({
            ...section,
            links
          } as HeaderNavLinkSectionDocument);
        }}
      />
    </section>
  );
}
