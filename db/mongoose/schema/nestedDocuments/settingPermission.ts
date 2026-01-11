// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";
import { settingCustomPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/settingCustomPermission";

// types
import { SettingPermissionDocument } from "@/common/types/documentation/nestedDocuments/settingPermission";

// schemas
export const settingPermissionSchema = new Schema<SettingPermissionDocument>(
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
      type: settingCustomPermissionSchema,
      required: false
    }
  },
  { timestamps: true }
);
