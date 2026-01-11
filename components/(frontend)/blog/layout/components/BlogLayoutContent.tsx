// components
import FrontendProductTiles from "../../../global/_Templates/Tiles/ProductTiles/FrontendProductTiles";

// types
import { type BlogLayoutDocument } from "@/common/types/documentation/nestedDocuments/blogLayout";
import { type ContentDocument } from "@/common/types/documentation/contents/content";

export default function BlogLayoutContent({
  layout
}: {
  layout: BlogLayoutDocument;
}) {
  const contents = (layout?.content as ContentDocument[]) || [];

  if (contents.length) {
    return (
      <div
        className={`bg-ivory-1 shadow-[0px_0px_10px_#ececec] sm:shadow-[0px_0px_10px_#f1f1f1] py-4 sm:p-4 sm:py-5 rounded-2xl overflow-hidden`}
      >
        <FrontendProductTiles
          type="scrollable"
          sync
          productList={contents}
        />
      </div>
    );
  }

  return <></>;
}
