// utils
import { memo } from "react";

// constants
import { INRSymbol } from "@/common/constants/symbols";

// types
import { type ContentUpgradeItemDocument } from "@/common/types/documentation/nestedDocuments/contentUpgradeItem";
import { type UpgradeDocument } from "@/common/types/documentation/presets/upgrade";

function ContentCustomizeUpgradeItem({
  upgradeItem: { upgrade, price },
  isSelected,
  isDefault,
  onClick
}: {
  upgradeItem: ContentUpgradeItemDocument;
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
        {(upgrade as UpgradeDocument).label}
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

export default memo(ContentCustomizeUpgradeItem);
