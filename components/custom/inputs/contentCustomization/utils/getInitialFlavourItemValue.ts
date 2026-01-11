// libraries
import { v4 as uuid } from "uuid";

// types
import { type ContentFlavourItemDocument } from "@/common/types/documentation/nestedDocuments/contentFlavourItem";

export const getInitialFlavourItemValue = () =>
  ({
    _id: uuid(),
    flavour: "",
    price: NaN
  }) as ContentFlavourItemDocument;
