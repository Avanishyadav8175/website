// libraries
import { v4 as uuid } from "uuid";

// types
import { type ContentReferenceVariantDocument } from "@/common/types/documentation/nestedDocuments/contentReferenceVariant";

export const getInitialReferenceVariantValue = (contentId?: string) =>
  ({
    _id: uuid(),
    label: contentId ? "Basic" : "",
    reference: contentId || ""
  }) as ContentReferenceVariantDocument;
