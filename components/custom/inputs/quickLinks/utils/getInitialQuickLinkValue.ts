// libraries
import { v4 as uuid } from "uuid";

// types
import { type ClickableImageDocument } from "@/common/types/documentation/nestedDocuments/clickableImage";

export const getInitialQuickLinkValue = () =>
  ({
    _id: uuid(),
    label: "",
    path: "",
    image: ""
  }) as ClickableImageDocument;
