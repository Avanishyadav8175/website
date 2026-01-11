import { v4 as uuid } from "uuid";

import { type BannerImageDocument } from "@/common/types/documentation/nestedDocuments/bannerImage";

export const getInitialBannerImageValue = () =>
  ({
    _id: uuid(),
    desktop: "",
    mobile: "",
    path: ""
  }) as BannerImageDocument;
