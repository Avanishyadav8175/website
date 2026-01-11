// types
import { type ContentCustomizationUploadImageDocument } from "@/common/types/documentation/nestedDocuments/contentCustomizationUploadImage";

export const getInitialUploadImageValue = () =>
  ({
    label: "",
    imageLimit: NaN
  }) as ContentCustomizationUploadImageDocument;
