// utils
import { memo } from "react";

// hooks
import { useCallback, useMemo } from "react";

// components
import ContentCustomizeSection from "./ContentCustomizeSection";
import ContentCustomizeFlavourItem from "./ContentCustomizeFlavourItem";

// types
import { type CartItemFlavourDocument } from "@/common/types/documentation/nestedDocuments/cartItemFlavour";
import { type ContentFlavourDocument } from "@/common/types/documentation/nestedDocuments/contentFlavour";
import { type ContentFlavourItemDocument } from "@/common/types/documentation/nestedDocuments/contentFlavourItem";
import { type FlavourDocument } from "@/common/types/documentation/presets/flavour";
import { type LabelDocument } from "@/common/types/documentation/presets/label";

function ContentCustomizeFlavour({
  flavour: { label, default: defaultFlavourOption, options: flavourOptions },
  cartItemFlavour,
  onChangeCartItemFlavour
}: {
  flavour: ContentFlavourDocument;
  cartItemFlavour?: CartItemFlavourDocument;
  onChangeCartItemFlavour: (cartItemUpgrade?: CartItemFlavourDocument) => void;
}) {
  // variables
  const title = useMemo(() => (label as LabelDocument).label, [label]);

  // event handlers
  const handleSelectDefault = useCallback(() => {
    onChangeCartItemFlavour(undefined);
  }, [onChangeCartItemFlavour]);

  const handleSelectOption = useCallback(
    (contentFlavourOptionId: string) => {
      const contentFlavourOption = flavourOptions.find(
        ({ _id }) => _id === contentFlavourOptionId
      ) as ContentFlavourItemDocument;

      onChangeCartItemFlavour({
        label: title,
        flavour: contentFlavourOption.flavour as FlavourDocument,
        price: contentFlavourOption.price
      } as CartItemFlavourDocument);
    },
    [flavourOptions, title, onChangeCartItemFlavour]
  );

  return (
    <ContentCustomizeSection title={title}>
      <div className="flex items-center justify-start gap-3 sm:gap-2 max-sm:overflow-x-scroll sm:flex-wrap sm:*:min-w-fit scrollbar-hide">
        <ContentCustomizeFlavourItem
          flavourItem={
            {
              flavour: defaultFlavourOption as FlavourDocument,
              price: 0
            } as ContentFlavourItemDocument
          }
          isSelected={!cartItemFlavour}
          isDefault
          onClick={handleSelectDefault}
        />
        {(flavourOptions as ContentFlavourItemDocument[]).map((flavourItem) => (
          <ContentCustomizeFlavourItem
            key={flavourItem._id as string}
            flavourItem={flavourItem}
            isSelected={Boolean(
              (cartItemFlavour?.flavour as FlavourDocument)?._id ===
                (flavourItem.flavour as FlavourDocument)._id
            )}
            onClick={() => {
              handleSelectOption(flavourItem._id as string);
            }}
          />
        ))}
      </div>
    </ContentCustomizeSection>
  );
}

export default memo(ContentCustomizeFlavour);
