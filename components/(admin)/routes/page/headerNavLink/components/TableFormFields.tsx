// hooks
import { useEffect, useState } from "react";

// components
import HeaderNavLinkSections from "@/components/custom/inputs/headerNavLinkSections/HeaderNavLinkSections";
import Input from "@/lib/Forms/Input/Input";
import NavQuickLinks from "@/components/custom/inputs/navQuickLinks/NavQuickLinks";

// types
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";
import Toggle from "@/lib/Forms/Toggle/Toggle";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: HeaderNavLinkDocument;
}) {
  // states
  const [includeSections, setIncludeSections] = useState<boolean>(
    Boolean(initialDocument?.sections?.length)
  );
  const [includeQuickLinks, setIncludeQuickLinks] = useState<boolean>(
    Boolean(initialDocument?.quickLinks?.length)
  );

  // side effects
  useEffect(() => {
    if (initialDocument) {
      setIncludeSections(Boolean(initialDocument?.sections?.length));
      setIncludeQuickLinks(Boolean(initialDocument?.quickLinks?.length));
    }
  }, [initialDocument]);

  return (
    <section className="grid grid-cols-1 gap-4 w-[70vw] max-h-[calc(100dvh_-_270px)] px-2 overflow-y-scroll scrollbar-hide">
      <Input
        type="text"
        name="label"
        isRequired
        labelConfig={{
          label: "Label"
        }}
        placeholder="label"
        defaultValue={initialDocument?.label || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Toggle
        name="includeSections"
        label="Include Sections"
        isActive={includeSections}
        onChangeIsActive={(newIsActive) => {
          setIncludeSections(newIsActive);
        }}
      />
      {!includeSections && (
        <Input
          type="text"
          name="path"
          isRequired={true}
          labelConfig={{
            label: "Path"
          }}
          placeholder="path"
          defaultValue={initialDocument?.path || ""}
          errorCheck={false}
          validCheck={false}
        />
      )}
      {includeSections && (
        <>
          <HeaderNavLinkSections
            name="sections"
            label="Sections"
            isRequired={false}
            defaultValue={initialDocument?.sections || []}
          />
          <Toggle
            name="includeQuickLinks"
            label="Include Quick Links"
            isActive={includeQuickLinks}
            onChangeIsActive={(newIsActive) => {
              setIncludeQuickLinks(newIsActive);
            }}
          />
          {includeQuickLinks && (
            <NavQuickLinks
              name="quickLinks"
              label="Quick Links"
              defaultValue={initialDocument?.quickLinks || []}
            />
          )}
        </>
      )}
    </section>
  );
}
