import { EdibleDocument } from "@/common/types/documentation/nestedDocuments/edible";

export const getInitialEdibleValue = () =>
  ({
    isEdible: false,
    type: "unspecified"
  }) as EdibleDocument;
