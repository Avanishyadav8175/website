// libraries
import { Schema } from "mongoose";

// schemas
import { adminPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/adminPermission";
import { blogPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/blogPermission";
import { cachePermissionSchema } from "./cachePermission";
import { categoryPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/categoryPermission";
import { contentPermissionSchema } from "./contentPermission";
import { customerPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/customerPermission";
import { franchisePermissionSchema } from "@/db/mongoose/schema/nestedDocuments/franchisePermission";
import { mediaPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/mediaPermission";
import { orderPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/orderPermission";
import { pagePermissionSchema } from "@/db/mongoose/schema/nestedDocuments/pagePermission";
import { presetPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/presetPermission";
import { sellerPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/sellerPermission";
import { settingPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/settingPermission";
import { vendorPermissionSchema } from "@/db/mongoose/schema/nestedDocuments/vendorPermission";

// types
import { type AdminRolePermissionDocument } from "@/common/types/documentation/nestedDocuments/adminRolePermission";

// schemas
export const adminRolePermissionSchema =
  new Schema<AdminRolePermissionDocument>(
    {
      preset: {
        type: presetPermissionSchema,
        required: false
      },
      media: {
        type: mediaPermissionSchema,
        required: false
      },
      category: {
        type: categoryPermissionSchema,
        required: false
      },
      content: {
        type: contentPermissionSchema,
        required: false
      },
      page: {
        type: pagePermissionSchema,
        required: false
      },
      order: {
        type: orderPermissionSchema,
        required: false
      },
      blog: {
        type: blogPermissionSchema,
        required: false
      },
      admin: {
        type: adminPermissionSchema,
        required: false
      },
      customer: {
        type: customerPermissionSchema,
        required: false
      },
      franchise: {
        type: franchisePermissionSchema,
        required: false
      },
      seller: {
        type: sellerPermissionSchema,
        required: false
      },
      vendor: {
        type: vendorPermissionSchema,
        required: false
      },
      setting: {
        type: settingPermissionSchema,
        required: false
      },
      cache: {
        type: cachePermissionSchema,
        required: false
      }
    },
    { timestamps: true }
  );
