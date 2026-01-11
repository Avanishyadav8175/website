// libraries
import { v4 as uuid } from "uuid";

// types
import { type FooterSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/footerSectionLink";

export const getInitialFooterSectionLinkValue = () =>
  ({
    _id: uuid(),
    label: "",
    path: ""
  }) as FooterSectionLinkDocument;
