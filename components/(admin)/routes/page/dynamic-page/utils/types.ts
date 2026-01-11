import { DynamicPageLayoutDocument } from "@/common/types/documentation/nestedDocuments/dynamicPageLayout";
import { PageLayoutDocument } from "@/common/types/documentation/nestedDocuments/pageLayout";

export type DynamicLayoutStructure = {
  _id: string;
  order: number;
  tag: DynamicPageLayoutDocument["type"] | "title";
  isDisabled?: boolean;
  layout: PageLayoutDocument;
  isNew?: boolean;
  isModified?: boolean;
  customBG?: string;
} & (
  | {
      type: "title";
      data: string;
      subtitle?: string;
      leftAlign?: boolean;
    }
  | {
      type: "component";
      extraSpacing?: boolean;
    }
);
