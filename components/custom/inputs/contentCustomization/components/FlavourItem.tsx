// icons
import { X } from "lucide-react";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type ContentFlavourItemDocument } from "@/common/types/documentation/nestedDocuments/contentFlavourItem";
import { type SelectOption } from "@/common/types/inputs";

export default function FlavourItem({
  index,
  flavourOptions,
  flavourItem,
  onChangeFlavourItem,
  onDeleteFlavourItem
}: {
  index: number;
  flavourOptions: SelectOption[];
  flavourItem: ContentFlavourItemDocument;
  onChangeFlavourItem: (newUpgradeItem: ContentFlavourItemDocument) => void;
  onDeleteFlavourItem: () => void;
}) {
  return (
    <>
      <div className="font-semibold">{index + 1}</div>
      <Input
        type="dropdown"
        name="flavour"
        isRequired={false}
        nullOption
        customInitialValuePlaceholderLabel="Select Flavour"
        options={flavourOptions}
        customValue={{
          value: flavourItem.flavour as string,
          setValue: (flavour) => {
            onChangeFlavourItem({
              ...flavourItem,
              flavour
            } as ContentFlavourItemDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="number"
        name="price"
        isRequired={false}
        customValue={{
          value: flavourItem.price ? flavourItem.price.toString() : "",
          setValue: (price) => {
            onChangeFlavourItem({
              ...flavourItem,
              price: Number(price)
            } as ContentFlavourItemDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <div
        onClick={() => {
          onDeleteFlavourItem();
        }}
        className="w-min rounded-full bg-red-600 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700"
      >
        <X
          strokeWidth={1.5}
          width={16}
          height={16}
        />
      </div>
    </>
  );
}
