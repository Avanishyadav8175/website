// utils
import { getInitialEnhancementItemValue } from "./getInitialEnhancementItemValue";

// types
import { type ContentEnhancementDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancement";

export const getInitialEnhancementValue = () =>
  ({
    label: "",
    items: [getInitialEnhancementItemValue()]
  }) as ContentEnhancementDocument;
