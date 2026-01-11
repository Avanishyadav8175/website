// types
import { type ContentCustomizationUploadTextDocument } from "@/common/types/documentation/nestedDocuments/contentCustomizationUploadText";

export const getInitialUploadTextValue = () =>
  ({
    label: "",
    characterLimit: NaN
  }) as ContentCustomizationUploadTextDocument;
