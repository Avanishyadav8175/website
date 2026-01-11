// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { VendorCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/vendorCustomPermission";

// schemas
export const vendorCustomPermissionSchema =
  new Schema<VendorCustomPermissionDocument>(
    {
      request: {
        type: permissionSchema,
        required: false
      },
      vendor: {
        type: permissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
