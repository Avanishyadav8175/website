// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { CustomerCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/customerCustomPermission";

// schemas
export const customerCustomPermissionSchema =
  new Schema<CustomerCustomPermissionDocument>(
    {
      customer: {
        type: permissionSchema,
        required: false
      },
      lead: {
        type: permissionSchema,
        required: false
      },
      callback: {
        type: permissionSchema,
        required: false
      },
      issue: {
        type: permissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
