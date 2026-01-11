// utils
import { getInitialUpgradeItemValue } from "./getInitialUpgradeItemValue";

// types
import { type ContentUpgradeDocument } from "@/common/types/documentation/nestedDocuments/contentUpgrade";

export const getInitialUpgradeValue = () =>
  ({
    label: "",
    default: "",
    options: [getInitialUpgradeItemValue()]
  }) as ContentUpgradeDocument;
