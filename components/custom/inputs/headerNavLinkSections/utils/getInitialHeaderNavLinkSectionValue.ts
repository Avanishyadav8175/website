// libraries
import { v4 as uuid } from "uuid";

// utils
import { getInitialHeaderNavLinkSectionLinkValue } from "./getInitialHeaderNavLinkSectionLinkValue";

// types
import { type HeaderNavLinkSectionDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSection";

export const getInitialHeaderNavLinkSectionValue = () =>
  ({
    _id: uuid(),
    heading: "",
    links: [getInitialHeaderNavLinkSectionLinkValue()]
  }) as HeaderNavLinkSectionDocument;
