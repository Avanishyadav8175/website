import { PageLayoutDocument } from "@/common/types/documentation/nestedDocuments/pageLayout";
import { HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";

export type HomepageLayoutStructure = {
  _id: string;
  order: number;
  tag: HomepageLayoutDocument["type"] | "title";
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
