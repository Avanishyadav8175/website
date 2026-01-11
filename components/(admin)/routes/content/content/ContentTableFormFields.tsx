// utils
import { toKebabCase } from "@/common/utils/case";

// hooks
import { useEffect, useState } from "react";

// components
import ContentClassification from "@/components/custom/inputs/contentClassification/ContentClassification";
import ContentMedia from "@/components/custom/inputs/contentMedia/ContentMedia";
import Input from "@/lib/Forms/Input/Input";
import Toggle from "@/lib/Forms/Toggle/Toggle";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";

export default function ContentTableFormFields({
  initialDocument
}: {
  initialDocument?: ContentDocument;
}) {
  // states
  const [name, setName] = useState<string>(initialDocument?.name || "");
  const [slug, setSlug] = useState<string>("");
  const [redirectFrom, setRedirectFrom] = useState<string>(
    initialDocument?.redirectFrom || ""
  );

  // effects
  useEffect(() => {
    if (initialDocument) {
      setName(initialDocument?.name);
      if (initialDocument?.redirectFrom) {
        setRedirectFrom(initialDocument?.redirectFrom);
      }
    }
  }, [initialDocument]);

  useEffect(() => {
    setSlug(toKebabCase(name));
  }, [name]);

  return (
    <section className="grid grid-cols-1 gap-4 w-[80vw] max-h-[calc(100dvh_-_200px)] overflow-y-scroll scrollbar-hide p-2 pb-20">
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Name"
        }}
        customValue={{
          value: name,
          setValue: setName
        }}
        errorCheck={false}
        validCheck={false}
      />
      <input
        className="hidden"
        type="text"
        name="slug"
        value={slug}
        onChange={() => { }}
      />
      <ContentClassification
        name="category"
        label="Category"
        defaultValue={initialDocument?.category}
      />
      <ContentMedia
        name="media"
        label="Images"
        defaultValue={initialDocument?.media}
      />
      {/* <Toggle
        name="isBestseller"
        label="Is Bestseller"
        isActive={initialDocument?.isBestseller}
      /> */}
      {/* <Toggle
        name="isCorporate"
        label="Is Corporate"
        isActive={initialDocument?.isCorporate}
      /> */}
    </section>
  );
}
