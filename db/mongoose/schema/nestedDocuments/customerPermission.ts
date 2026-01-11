// libraries
import { Schema } from "mongoose";

// schemas
import { customerCustomPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/customerCustomPermission";
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { CustomerPermissionDocument } from "@/common/types/documentation/nestedDocuments/customerPermission";

// schemas
export const customerPermissionSchema = new Schema<CustomerPermissionDocument>(
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
      type: customerCustomPermissionSchema,
      required: false
    }
  },
  { timestamps: true }
);
