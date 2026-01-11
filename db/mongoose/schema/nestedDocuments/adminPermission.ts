// libraries
import { Schema } from "mongoose";

// schemas
import { adminCustomPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/adminCustomPermission";
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { AdminPermissionDocument } from "@/common/types/documentation/nestedDocuments/adminPermission";

// schemas
export const adminPermissionSchema = new Schema<AdminPermissionDocument>(
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
      type: adminCustomPermissionSchema,
      required: false
    }
  },
  { timestamps: true }
);
