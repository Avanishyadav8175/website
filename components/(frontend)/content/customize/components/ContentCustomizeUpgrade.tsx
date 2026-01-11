// utils
import { memo, useCallback, useMemo } from "react";

// components
import ContentCustomizeSection from "./ContentCustomizeSection";
import ContentCustomizeUpgradeItem from "./ContentCustomizeUpgradeItem";

// types
import { type CartItemUpgradeDocument } from "@/common/types/documentation/nestedDocuments/cartItemUpgrade";
import { type ContentUpgradeDocument } from "@/common/types/documentation/nestedDocuments/contentUpgrade";
import { type ContentUpgradeItemDocument } from "@/common/types/documentation/nestedDocuments/contentUpgradeItem";
import { type LabelDocument } from "@/common/types/documentation/presets/label";
import { type UpgradeDocument } from "@/common/types/documentation/presets/upgrade";

function ContentCustomizeUpgrade({
  upgrade: { label, default: defaultUpgradeOption, options: upgradeOptions },
  cartItemUpgrade,
  onChangeCartItemUpgrade
}: {
  upgrade: ContentUpgradeDocument;
  cartItemUpgrade?: CartItemUpgradeDocument;
  onChangeCartItemUpgrade: (cartItemUpgrade?: CartItemUpgradeDocument) => void;
}) {
  // variables
  const title = useMemo(() => (label as LabelDocument).label, [label]);

  // event handlers
  const handleSelectDefault = useCallback(() => {
    onChangeCartItemUpgrade(undefined);
  }, [onChangeCartItemUpgrade]);

  const handleSelectOption = useCallback(
    (contentUpgradeOptionId: string) => {
      const contentUpgradeOption = upgradeOptions.find(
        ({ _id }) => _id === contentUpgradeOptionId
      ) as ContentUpgradeItemDocument;

      onChangeCartItemUpgrade({
        label: title,
        upgrade: contentUpgradeOption.upgrade as UpgradeDocument,
        price: contentUpgradeOption.price
      } as CartItemUpgradeDocument);
    },
    [title, upgradeOptions, onChangeCartItemUpgrade]
  );

  return (
    <ContentCustomizeSection title={title}>
      <div className="flex items-center justify-start gap-3 sm:gap-2 max-sm:overflow-x-scroll sm:flex-wrap sm:*:min-w-fit scrollbar-hide">
        <ContentCustomizeUpgradeItem
          upgradeItem={
            {
              upgrade: defaultUpgradeOption as UpgradeDocument,
              price: 0
            } as ContentUpgradeItemDocument
          }
          isSelected={!cartItemUpgrade}
          isDefault
          onClick={handleSelectDefault}
        />
        {(upgradeOptions as ContentUpgradeItemDocument[]).map((upgradeItem) => (
          <ContentCustomizeUpgradeItem
            key={upgradeItem._id as string}
            upgradeItem={upgradeItem}
            isSelected={Boolean(
              (cartItemUpgrade?.upgrade as UpgradeDocument)?._id ===
                (upgradeItem.upgrade as UpgradeDocument)._id
            )}
            onClick={() => {
              handleSelectOption(upgradeItem._id as string);
            }}
          />
        ))}
      </div>
    </ContentCustomizeSection>
  );
}

export default memo(ContentCustomizeUpgrade);
