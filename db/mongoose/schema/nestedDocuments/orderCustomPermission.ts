// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { OrderCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/orderCustomPermission";

// schemas
export const orderCustomPermissionSchema =
  new Schema<OrderCustomPermissionDocument>(
    {
      new: {
        type: permissionSchema,
        required: false
      },
      inProgress: {
        type: permissionSchema,
        required: false
      },
      delivered: {
        type: permissionSchema,
        required: false
      },
      failed: {
        type: permissionSchema,
        required: false
      },
      cancelled: {
        type: permissionSchema,
        required: false
      },
      delivery: {
        type: permissionSchema,
        required: false
      },
      deliveryCancellationRequest: {
        type: permissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
