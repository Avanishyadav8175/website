// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";
import { sellerCustomPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/sellerCustomPermission";

// types
import { SellerPermissionDocument } from "@/common/types/documentation/nestedDocuments/sellerPermission";

// schemas
export const sellerPermissionSchema = new Schema<SellerPermissionDocument>(
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
      type: sellerCustomPermissionSchema,
      required: false
    }
  },
  { timestamps: true }
);
