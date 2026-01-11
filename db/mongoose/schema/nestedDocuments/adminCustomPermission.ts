// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { AdminCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/adminCustomPermission";

// schemas
export const adminCustomPermissionSchema =
  new Schema<AdminCustomPermissionDocument>(
    {
      adminRole: {
        type: permissionSchema,
        required: false
      },
      admin: {
        type: permissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
