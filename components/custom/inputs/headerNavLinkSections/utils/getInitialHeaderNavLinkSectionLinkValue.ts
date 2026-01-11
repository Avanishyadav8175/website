// libraries
import { v4 as uuid } from "uuid";

// types
import { type HeaderNavLinkSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSectionLink";

export const getInitialHeaderNavLinkSectionLinkValue = () =>
  ({
    _id: uuid(),
    label: "",
    path: "",
    tag: ""
  }) as HeaderNavLinkSectionLinkDocument;
