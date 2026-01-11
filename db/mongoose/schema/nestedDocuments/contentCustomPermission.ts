// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { ContentCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/contentCustomPermission";

// schemas
export const contentCustomPermissionSchema =
  new Schema<ContentCustomPermissionDocument>(
    {
      addon: {
        type: permissionSchema,
        required: false
      },
      coupon: {
        type: permissionSchema,
        required: false
      },
      product: {
        type: permissionSchema,
        required: false
      },
      service: {
        type: permissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
