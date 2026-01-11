// utils
import { getInitialBannerImageValue } from "./getInitialBannerImageValue";

// types
import { type BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";

export const getInitialBannerValue = () =>
  ({
    autoScroll: false,
    scrollInterval: NaN,
    loopInfinitely: false,
    showIndicators: false,
    images: [getInitialBannerImageValue()]
  }) as BannerDocument;
