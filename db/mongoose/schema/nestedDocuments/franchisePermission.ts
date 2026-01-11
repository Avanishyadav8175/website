// libraries
import { Schema } from "mongoose";

// schemas
import { franchiseCustomPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/franchiseCustomPermission";
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { FranchisePermissionDocument } from "@/common/types/documentation/nestedDocuments/franchisePermission";

// schemas
export const franchisePermissionSchema =
  new Schema<FranchisePermissionDocument>(
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
        type: franchiseCustomPermissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
