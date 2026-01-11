// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { PresetCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/presetCustomPermission";

// schemas
export const presetCustomPermissionSchema =
  new Schema<PresetCustomPermissionDocument>(
    {
      advancePayment: {
        type: permissionSchema,
        required: false
      },
      aiTag: {
        type: permissionSchema,
        required: false
      },
      balloonColorGroup: {
        type: permissionSchema,
        required: false
      },
      brand: {
        type: permissionSchema,
        required: false
      },
      cancellationPolicy: {
        type: permissionSchema,
        required: false
      },
      careInfo: {
        type: permissionSchema,
        required: false
      },
      catalogue: {
        type: permissionSchema,
        required: false
      },
      city: {
        type: permissionSchema,
        required: false
      },
      color: {
        type: permissionSchema,
        required: false
      },
      commission: {
        type: permissionSchema,
        required: false
      },
      countryCode: {
        type: permissionSchema,
        required: false
      },
      deliveryDetail: {
        type: permissionSchema,
        required: false
      },
      deliveryType: {
        type: permissionSchema,
        required: false
      },
      enhancement: {
        type: permissionSchema,
        required: false
      },
      faqGroup: {
        type: permissionSchema,
        required: false
      },
      flavour: {
        type: permissionSchema,
        required: false
      },
      foundUsSource: {
        type: permissionSchema,
        required: false
      },
      gst: {
        type: permissionSchema,
        required: false
      },
      label: {
        type: permissionSchema,
        required: false
      },
      noteGroup: {
        type: permissionSchema,
        required: false
      },
      occasion: {
        type: permissionSchema,
        required: false
      },
      paymentCycle: {
        type: permissionSchema,
        required: false
      },
      processingTime: {
        type: permissionSchema,
        required: false
      },
      promotionTag: {
        type: permissionSchema,
        required: false
      },
      quickLink: {
        type: permissionSchema,
        required: false
      },
      relation: {
        type: permissionSchema,
        required: false
      },
      reviewGroup: {
        type: permissionSchema,
        required: false
      },
      searchTag: {
        type: permissionSchema,
        required: false
      },
      securityQuestion: {
        type: permissionSchema,
        required: false
      },
      state: {
        type: permissionSchema,
        required: false
      },
      trendingSearchKeyword: {
        type: permissionSchema,
        required: false
      },
      unit: {
        type: permissionSchema,
        required: false
      },
      upgrade: {
        type: permissionSchema,
        required: false
      },
      vendorOfferCategory: {
        type: permissionSchema,
        required: false
      },
      venue: {
        type: permissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
