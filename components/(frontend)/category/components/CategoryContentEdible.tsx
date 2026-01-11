// icons
import {
  NonVegSymbol,
  VegSymbol
} from "@/components/(_common)/Symbols/Edibles";

// utils
import { memo } from "react";

// types
import { type ContentListItemDataDocument } from "@/common/types/documentation/nestedDocuments/contentListItemData";

function CategoryContentEdible({
  edible
}: {
  edible: ContentListItemDataDocument["edible"];
}) {
  if (!edible) {
    return <></>;
  }

  return (
    <span className="absolute bottom-1 left-1 sm:left-1">
      {edible === "veg" ? (
        <VegSymbol className="w-[20px] sm:w-[19px] sm:max-w-[19px] sm:translate-x-1" />
      ) : (
        <NonVegSymbol className="w-[20px] sm:w-[19px] sm:max-w-[19px] sm:translate-x-1" />
      )}
    </span>
  );
}

export default memo(CategoryContentEdible);
