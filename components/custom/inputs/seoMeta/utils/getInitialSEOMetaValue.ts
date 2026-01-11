import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";

export const getInitialSEOMetaValue = () =>
  ({
    title: "",
    tags: [] as string[],
    description: ""
  }) as SEOMetaDocument;
