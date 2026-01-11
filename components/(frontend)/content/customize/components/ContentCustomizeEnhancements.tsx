// utils
import { memo } from "react";

// hooks
import { useCallback, useMemo } from "react";

// components
import ContentCustomizeSection from "./ContentCustomizeSection";
import ContentCustomizeEnhancementItem from "./ContentCustomizeEnhancementItem";

// types
import { type CartItemEnhancementDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancement";
import { type CartItemEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/cartItemEnhancementItem";
import { type ContentEnhancementDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancement";
import { type ContentEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancementItem";
import { type EnhancementDocument } from "@/common/types/documentation/presets/enhancement";
import { type LabelDocument } from "@/common/types/documentation/presets/label";

function ContentCustomizeEnhancements({
  enhancement: { label, items },
  cartItemEnhancement,
  onChangeCartItemEnhancement
}: {
  enhancement: ContentEnhancementDocument;
  cartItemEnhancement?: CartItemEnhancementDocument;
  onChangeCartItemEnhancement: (
    cartItemEnhancement?: CartItemEnhancementDocument
  ) => void;
}) {
  const title = useMemo(() => (label as LabelDocument).label, [label]);

  // event handlers
  const handleToggleSelectEnhancement = useCallback(
    (contentEnhancementItemId: string) => {
      const contentEnhancementItem = items.find(
        ({ _id }) => _id === contentEnhancementItemId
      ) as ContentEnhancementItemDocument;

      const isSelected = Boolean(
        cartItemEnhancement?.items?.find(
          ({ enhancement: cartEnhancement }) =>
            (cartEnhancement as EnhancementDocument)._id ===
            (contentEnhancementItem?.enhancement as EnhancementDocument)._id
        )
      );

      if (isSelected) {
        const newItems = cartItemEnhancement?.items.filter(
          ({ enhancement: cartItemEnhancementItem }) =>
            (cartItemEnhancementItem as EnhancementDocument)._id !==
            (contentEnhancementItem.enhancement as EnhancementDocument)._id
        );

        onChangeCartItemEnhancement(
          newItems?.length
            ? ({
                label: title,
                items: newItems
              } as CartItemEnhancementDocument)
            : undefined
        );
      } else {
        onChangeCartItemEnhancement({
          label: title,
          items: [
            ...(cartItemEnhancement?.items || []),
            {
              enhancement:
                contentEnhancementItem.enhancement as EnhancementDocument,
              price: contentEnhancementItem.price
            }
          ] as CartItemEnhancementItemDocument[]
        } as CartItemEnhancementDocument);
      }
    },
    [cartItemEnhancement, items, title, onChangeCartItemEnhancement]
  );

  return (
    <ContentCustomizeSection title={title}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-x-6 sm:gap-y-2">
        {(items as ContentEnhancementItemDocument[]).map((enhancementItem) => (
          <ContentCustomizeEnhancementItem
            key={enhancementItem._id as string}
            enhancementItem={enhancementItem}
            isSelected={Boolean(
              cartItemEnhancement?.items?.find(
                ({ enhancement: cartEnhancement }) =>
                  (cartEnhancement as EnhancementDocument)._id ===
                  (enhancementItem.enhancement as EnhancementDocument)._id
              )
            )}
            onClick={() => {
              handleToggleSelectEnhancement(enhancementItem._id as string);
            }}
          />
        ))}
      </div>
    </ContentCustomizeSection>
  );
}

export default memo(ContentCustomizeEnhancements);
