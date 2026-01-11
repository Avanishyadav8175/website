// libraries
import { Schema } from "mongoose";

// schemas
import { contentBalloonColorSchema } from "@/db/mongoose/schema/nestedDocuments/contentBalloonColor";
import { contentCustomizationUploadImageSchema } from "@/db/mongoose/schema/nestedDocuments/contentCustomizationUploadImage";
import { contentCustomizationUploadTextSchema } from "@/db/mongoose/schema/nestedDocuments/contentCustomizationUploadText";
import { contentEnhancementSchema } from "@/db/mongoose/schema/nestedDocuments/contentEnhancement";
import { contentFlavourSchema } from "@/db/mongoose/schema/nestedDocuments/contentFlavour";
import { contentUpgradeSchema } from "@/db/mongoose/schema/nestedDocuments/contentUpgrade";

// types
import { ContentCustomizationDocument } from "@/common/types/documentation/nestedDocuments/contentCustomization";

// schemas
export const contentCustomizationSchema =
  new Schema<ContentCustomizationDocument>(
    {
      isCustomizable: {
        type: Boolean,
        required: true,
        default: false
      },
      enhancement: {
        type: contentEnhancementSchema,
        required: false
      },
      upgrade: {
        type: contentUpgradeSchema,
        required: false
      },
      flavour: {
        type: contentFlavourSchema,
        required: false
      },
      balloonColor: {
        type: contentBalloonColorSchema,
        required: false
      },
      uploadText: {
        type: contentCustomizationUploadTextSchema,
        required: false
      },
      uploadImage: {
        type: contentCustomizationUploadImageSchema,
        required: false
      }
    },
    { timestamps: true }
  );
