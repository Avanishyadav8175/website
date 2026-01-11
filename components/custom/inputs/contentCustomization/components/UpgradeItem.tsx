// icons
import { X } from "lucide-react";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type ContentUpgradeItemDocument } from "@/common/types/documentation/nestedDocuments/contentUpgradeItem";
import { type SelectOption } from "@/common/types/inputs";

export default function UpgradeItem({
  index,
  upgradeOptions,
  upgradeItem,
  onChangeUpgradeItem,
  onDeleteUpgradeItem
}: {
  index: number;
  upgradeOptions: SelectOption[];
  upgradeItem: ContentUpgradeItemDocument;
  onChangeUpgradeItem: (newUpgradeItem: ContentUpgradeItemDocument) => void;
  onDeleteUpgradeItem: () => void;
}) {
  return (
    <>
      <div className="font-semibold">{index + 1}</div>
      <Input
        type="dropdown"
        name="upgrade"
        isRequired={false}
        nullOption
        customInitialValuePlaceholderLabel="Select Upgrade"
        options={upgradeOptions}
        customValue={{
          value: upgradeItem.upgrade as string,
          setValue: (upgrade) => {
            onChangeUpgradeItem({
              ...upgradeItem,
              upgrade
            } as ContentUpgradeItemDocument);
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
          value: upgradeItem.price ? upgradeItem.price.toString() : "",
          setValue: (price) => {
            onChangeUpgradeItem({
              ...upgradeItem,
              price: Number(price)
            } as ContentUpgradeItemDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <div
        onClick={() => {
          onDeleteUpgradeItem();
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
