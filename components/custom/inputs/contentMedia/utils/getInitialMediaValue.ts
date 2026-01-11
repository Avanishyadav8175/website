import { type ContentMediaDocument } from "@/common/types/documentation/nestedDocuments/contentMedia";

export const getInitialMediaValue = () =>
  ({
    primary: "",
    gallery: [] as string[],
    video: "",
    review: [] as string[]
  }) as ContentMediaDocument;
