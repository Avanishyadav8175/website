// icons
import { X } from "lucide-react";

// components
import Input from "@/lib/Forms/Input/Input";
import SelectContent from "../../selectContent/SelectContent";

// types
import { type ContentReferenceVariantDocument } from "@/common/types/documentation/nestedDocuments/contentReferenceVariant";

export default function ReferenceVariant({
  excludes,
  disabled,
  referenceVariant,
  onChangeReferenceVariant,
  onDeleteVariantCategory
}: {
  excludes: string[];
  disabled?: boolean;
  referenceVariant: ContentReferenceVariantDocument;
  onChangeReferenceVariant: (
    newReferenceVariant: ContentReferenceVariantDocument
  ) => void;
  onDeleteVariantCategory: () => void;
}) {
  return (
    <section className="relative grid grid-cols-1 rounded-xl gap-2 bg-ash/30 border border-ash p-2">
      {!disabled && (
        <div
          onClick={onDeleteVariantCategory}
          className="rounded-full absolute -top-1.5 -right-1.5 bg-red-600 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700 z-10"
        >
          <X
            strokeWidth={1.5}
            width={16}
            height={16}
          />
        </div>
      )}
      <SelectContent
        type="both"
        name="reference"
        excludes={excludes}
        disabled={disabled}
        selectSingle
        value={referenceVariant.reference as string}
        onChangeValue={(reference) => {
          onChangeReferenceVariant({
            ...referenceVariant,
            reference
          } as ContentReferenceVariantDocument);
        }}
      />
      <Input
        type="text"
        name="label"
        placeholder="label"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        customValue={{
          value: referenceVariant.label,
          setValue: (label) => {
            onChangeReferenceVariant({
              ...referenceVariant,
              label
            } as ContentReferenceVariantDocument);
          }
        }}
      />
    </section>
  );
}
