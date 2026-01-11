// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { FranchiseCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/franchiseCustomPermission";

// schemas
export const franchiseCustomPermissionSchema =
  new Schema<FranchiseCustomPermissionDocument>(
    {
      request: {
        type: permissionSchema,
        required: false
      },
      franchise: {
        type: permissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
