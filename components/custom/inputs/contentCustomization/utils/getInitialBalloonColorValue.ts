// types
import { type ContentBalloonColorDocument } from "@/common/types/documentation/nestedDocuments/contentBalloonColor";

export const getInitialBalloonColorValue = () =>
  ({
    label: "",
    groups: [] as string[]
  }) as ContentBalloonColorDocument;
