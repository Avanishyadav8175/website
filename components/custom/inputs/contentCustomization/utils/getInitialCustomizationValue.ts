// utils
import { getInitialBalloonColorValue } from "./getInitialBalloonColorValue";
import { getInitialEnhancementValue } from "./getInitialEnhancementValue";
import { getInitialFlavourValue } from "./getInitialFlavourValue";
import { getInitialUpgradeValue } from "./getInitialUpgradeValue";
import { getInitialUploadImageValue } from "./getInitialUploadImageValue";
import { getInitialUploadTextValue } from "./getInitialUploadTextValue";

// types
import { type ContentCustomizationDocument } from "@/common/types/documentation/nestedDocuments/contentCustomization";

export const getInitialCustomizationValue = () =>
  ({
    isCustomizable: false,
    enhancement: getInitialEnhancementValue(),
    upgrade: getInitialUpgradeValue(),
    flavour: getInitialFlavourValue(),
    balloonColor: getInitialBalloonColorValue(),
    uploadText: getInitialUploadTextValue(),
    uploadImage: getInitialUploadImageValue()
  }) as ContentCustomizationDocument;
