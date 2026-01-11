// constants
import { INRSymbol } from "@/common/constants/symbols";

// types
import { type ContentFlavourItemDocument } from "@/common/types/documentation/nestedDocuments/contentFlavourItem";
import { type FlavourDocument } from "@/common/types/documentation/presets/flavour";

export default function ContentCustomizeFlavourItem({
  flavourItem: { flavour, price },
  isSelected,
  isDefault,
  onClick
}: {
  flavourItem: ContentFlavourItemDocument;
  isSelected: boolean;
  isDefault?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center *:text-center py-2 px-4 rounded-lg border ${isSelected ? "border-sienna text-sienna bg-gradient-to-br from-sienna-1/20 via-transparent to-sienna-1/20" : "border-ash hover:border-charcoal-3/70 hover:bg-ash-2/15"} transition-all duration-300 cursor-pointer`}
      onClick={onClick}
    >
      <span className="whitespace-nowrap">
        {(flavour as FlavourDocument).name}
      </span>
      {isDefault ? (
        <span className="text-sm">(Default)</span>
      ) : (
        <span className="text-sm">
          {price === 0 ? "Free" : `${INRSymbol} ${price}`}
        </span>
      )}
    </div>
  );
}
