// libraries
import { v4 as uuid } from "uuid";

// utils
import { getInitialCustomVariantsValue } from "./getInitialCustomVariantsValue";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCustomVariantCategoryDocument } from "@/common/types/documentation/nestedDocuments/contentCustomVariantCategory";

export const getInitialCustomVariantCategoryValue = (
  content?: ContentDocument
) =>
  ({
    _id: uuid(),
    options: {
      image: false,
      unit: false
    },
    unit: "",
    variants: getInitialCustomVariantsValue({ content })
  }) as ContentCustomVariantCategoryDocument;
