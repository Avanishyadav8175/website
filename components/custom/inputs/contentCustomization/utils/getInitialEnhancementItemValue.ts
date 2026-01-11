// libraries
import { v4 as uuid } from "uuid";

// types
import { type ContentEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancementItem";

export const getInitialEnhancementItemValue = () =>
  ({
    _id: uuid(),
    enhancement: "",
    price: NaN
  }) as ContentEnhancementItemDocument;
