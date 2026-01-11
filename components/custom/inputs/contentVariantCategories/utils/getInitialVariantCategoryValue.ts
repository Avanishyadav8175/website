// libraries
import { v4 as uuid } from "uuid";

// types
import { type ContentVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentVariantCategory";

export const getInitialVariantCategoryValue = () =>
  ({
    _id: uuid(),
    label: ""
  }) as ContentVariantCategoryDocument;
