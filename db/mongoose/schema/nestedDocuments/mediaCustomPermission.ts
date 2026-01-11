// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { MediaCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/mediaCustomPermission";

// schemas
export const mediaCustomPermissionSchema =
  new Schema<MediaCustomPermissionDocument>(
    {
      folder: {
        type: permissionSchema,
        required: false
      },
      image: {
        type: permissionSchema,
        required: false
      },
      customizationImage: {
        type: permissionSchema,
        required: false
      },
      identificationImage: {
        type: permissionSchema,
        required: false
      },
      issueImage: {
        type: permissionSchema,
        required: false
      },
      reviewImage: {
        type: permissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
