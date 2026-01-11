// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
import { type ContentBalloonColorDocument } from "@/common/types/documentation/nestedDocuments/contentBalloonColor";
import { type ContentCustomizationUploadTextDocument } from "@/common/types/documentation/nestedDocuments/contentCustomizationUploadText";
import { type ContentCustomizationUploadImageDocument } from "@/common/types/documentation/nestedDocuments/contentCustomizationUploadImage";
import { type ContentEnhancementDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancement";
import { type ContentFlavourDocument } from "@/common/types/documentation/nestedDocuments/contentFlavour";
import { type ContentUpgradeDocument } from "@/common/types/documentation/nestedDocuments/contentUpgrade";

// document
export interface ContentCustomizationDocument extends Document {
  isCustomizable: boolean;
  enhancement?: ContentEnhancementDocument;
  upgrade?: ContentUpgradeDocument;
  flavour?: ContentFlavourDocument;
  balloonColor?: ContentBalloonColorDocument;
  uploadText?: ContentCustomizationUploadTextDocument;
  uploadImage?: ContentCustomizationUploadImageDocument;
}
