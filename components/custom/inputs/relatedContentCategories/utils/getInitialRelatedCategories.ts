import { RelatedContentCategoriesDocument } from "@/common/types/documentation/nestedDocuments/relatedContentCategories";

export const getInitialRelatedCategories = () =>
  ({
    show: false,
    categories: [] as string[]
  }) as RelatedContentCategoriesDocument;
