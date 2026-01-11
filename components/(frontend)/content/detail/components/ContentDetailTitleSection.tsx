// icons
import {
  NonVegSymbol,
  VegSymbol
} from "@/components/(_common)/Symbols/Edibles";

import { memo } from "react";

// components
import ContentHorizontalSpacing from "../../spacing/ContentHorizontalSpacing";

// type
import { type EdibleDocument } from "@/common/types/documentation/nestedDocuments/edible";

function ContentDetailTitleSection({
  name,
  edible
}: {
  name: string;
  edible?: EdibleDocument;
}) {
  return (
    <ContentHorizontalSpacing className="flex items-center justify-start gap-x-1 lg:h-8">
      <h1 className={`text-charcoal-3 text-[20px] lg:text-[24px] leading-tight`}>
        {name}
      </h1>
      {edible?.isEdible &&
        (edible.type === "veg" ? (
          <VegSymbol className="scale-75" />
        ) : edible.type === "non-veg" ? (
          <NonVegSymbol className="scale-75" />
        ) : (
          <></>
        ))}
    </ContentHorizontalSpacing>
  );
}

export default memo(ContentDetailTitleSection);
