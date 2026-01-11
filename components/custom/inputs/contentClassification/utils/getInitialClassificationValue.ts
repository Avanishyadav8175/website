import { type ContentClassificationDocument } from "@/common/types/documentation/nestedDocuments/contentClassification";

export const getInitialClassificationValue = () =>
  ({
    primary: "",
    related: [] as string[]
  }) as ContentClassificationDocument;
