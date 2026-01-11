// libraries
import { Schema } from "mongoose";

// schemas
import { permissionSchema } from "@/db/mongoose/schema/nestedDocuments/permission";

// types
import { SettingCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/settingCustomPermission";

// schemas
export const settingCustomPermissionSchema =
  new Schema<SettingCustomPermissionDocument>(
    {
      auth: {
        type: permissionSchema,
        required: false
      },
      payment: {
        type: permissionSchema,
        required: false
      },
      callback: {
        type: permissionSchema,
        required: false
      },
      contact: {
        type: permissionSchema,
        required: false
      },
      icon: {
        type: permissionSchema,
        required: false
      },
      logo: {
        type: permissionSchema,
        required: false
      },
      serviceImage: {
        type: permissionSchema,
        required: false
      },
      social: {
        type: permissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
