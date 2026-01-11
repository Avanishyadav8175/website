// libraries
import { Schema } from "mongoose";

// schemas
import { pageCustomPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/pageCustomPermission";
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { PagePermissionDocument } from "@/common/types/documentation/nestedDocuments/pagePermission";

// schemas
export const pagePermissionSchema = new Schema<PagePermissionDocument>(
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
      type: pageCustomPermissionSchema,
      required: false
    }
  },
  { timestamps: true }
);
