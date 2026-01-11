// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { SellerCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/sellerCustomPermission";

// schemas
export const sellerCustomPermissionSchema =
  new Schema<SellerCustomPermissionDocument>(
    {
      request: {
        type: permissionSchema,
        required: false
      },
      seller: {
        type: permissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
