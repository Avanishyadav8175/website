// libraries
import { v4 as uuid } from "uuid";

// types
import { type ContentUpgradeItemDocument } from "@/common/types/documentation/nestedDocuments/contentUpgradeItem";

export const getInitialUpgradeItemValue = () =>
  ({
    _id: uuid(),
    upgrade: "",
    price: NaN
  }) as ContentUpgradeItemDocument;
