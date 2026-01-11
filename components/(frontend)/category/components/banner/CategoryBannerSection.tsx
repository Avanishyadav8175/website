// utils
import { memo } from "react";

// components
import CategoryBanner from "./CategoryBanner";

// types
import { type BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";

function CategoryBannerSection({ banner }: { banner?: BannerDocument }) {
  if (banner) {
    return <CategoryBanner banner={banner} />;
  }

  return <></>;
}

export default memo(CategoryBannerSection);
