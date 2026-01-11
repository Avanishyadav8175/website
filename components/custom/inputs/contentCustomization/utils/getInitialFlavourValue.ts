// utils
import { getInitialFlavourItemValue } from "./getInitialFlavourItemValue";

// types
import { type ContentFlavourDocument } from "@/common/types/documentation/nestedDocuments/contentFlavour";

export const getInitialFlavourValue = () =>
  ({
    label: "",
    default: "",
    options: [getInitialFlavourItemValue()]
  }) as ContentFlavourDocument;
