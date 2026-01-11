// libraries
import { Schema } from "mongoose";

// schemas
import { orderCustomPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/orderCustomPermission";
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { OrderPermissionDocument } from "@/common/types/documentation/nestedDocuments/orderPermission";

// schemas
export const orderPermissionSchema = new Schema<OrderPermissionDocument>(
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
      type: orderCustomPermissionSchema,
      required: false
    }
  },
  { timestamps: true }
);
