// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";
import { vendorCustomPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/vendorCustomPermission";

// types
import { VendorPermissionDocument } from "@/common/types/documentation/nestedDocuments/vendorPermission";

// schemas
export const vendorPermissionSchema = new Schema<VendorPermissionDocument>(
  {
    isCustomized: {
      type: Boolean,
      required: false,
      default: false
    },
    all: {
      type: permissionSchema,
      required: false
    },
    custom: {
      type: vendorCustomPermissionSchema,
      required: false
    }
  },
  { timestamps: true }
);
