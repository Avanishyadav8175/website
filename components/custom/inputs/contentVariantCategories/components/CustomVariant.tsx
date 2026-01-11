// icons
import { X } from "lucide-react";

// components
import ContentPriceDialog from "./ContentPriceDialog";
import Input from "@/lib/Forms/Input/Input";
import SelectImage from "../../image/SelectImage";

// types
import { type ContentCustomVariantDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariant";
import { type ContentCustomVariantCategoryOptionDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategoryOption";

export default function CustomVariant({
  disabled,
  customOptions,
  customVariant,
  onChangeCustomVariant,
  onDeleteCustomVariant
}: {
  disabled?: boolean;
  customOptions: ContentCustomVariantCategoryOptionDocument;
  customVariant: ContentCustomVariantDocument;
  onChangeCustomVariant: (
    newCustomVariant: ContentCustomVariantDocument
  ) => void;
  onDeleteCustomVariant: () => void;
}) {
  return (
    <section className="relative grid grid-cols-1 rounded-xl gap-2 bg-ash/30 border border-ash p-2">
      {!disabled && (
        <div
          onClick={onDeleteCustomVariant}
          className="rounded-full absolute -top-1.5 -right-1.5 bg-red-600 text-white p-1 z-10 cursor-pointer transition-all duration-300 hover:bg-red-700"
        >
          <X
            strokeWidth={1.5}
            width={16}
            height={16}
          />
        </div>
      )}
      {customOptions.image && (
        <SelectImage
          name="image"
          label=""
          disabled={disabled}
          value={customVariant.image as string}
          onChangeValue={(image) => {
            onChangeCustomVariant({
              ...customVariant,
              image
            } as ContentCustomVariantDocument);
          }}
        />
      )}
      {!customOptions.unit && (
        <Input
          type="text"
          name="label"
          placeholder="Label"
          isRequired={false}
          errorCheck={false}
          validCheck={false}
          customValue={{
            value: customVariant?.label || "",
            setValue: (label) => {
              onChangeCustomVariant({
                ...customVariant,
                label
              } as ContentCustomVariantDocument);
            }
          }}
        />
      )}
      {customOptions.unit && (
        <Input
          type="number"
          name="value"
          placeholder="Value"
          isRequired={false}
          errorCheck={false}
          validCheck={false}
          customValue={{
            value:
              customVariant?.value === 0 || customVariant.value
                ? customVariant?.value?.toString()
                : "",
            setValue: (value) => {
              onChangeCustomVariant({
                ...customVariant,
                value: value ? Number(value) : NaN
              } as ContentCustomVariantDocument);
            }
          }}
        />
      )}
      <ContentPriceDialog
        disabled={disabled}
        price={customVariant.price}
        onChangePrice={(price) => {
          onChangeCustomVariant({
            ...customVariant,
            price
          } as ContentCustomVariantDocument);
        }}
      />
    </section>
  );
}
