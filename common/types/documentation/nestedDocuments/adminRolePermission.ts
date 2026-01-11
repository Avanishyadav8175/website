// types
import { type NestedDocument as Document } from "@/common/types/documentation/_document";
// import { type AdminPermissionDocument } from "@/common/types/documentation/nestedDocuments/adminPermission";
// import { type BlogPermissionDocument } from "@/common/types/documentation/nestedDocuments/blogPermission";
// import { type CachePermissionDocument } from "@/common/types/documentation/nestedDocuments/cachePermission";
// import { type CategoryPermissionDocument } from "@/common/types/documentation/nestedDocuments/categoryPermission";
// import { type ContentPermissionDocument } from "@/common/types/documentation/nestedDocuments/contentPermission";
// import { type CustomerPermissionDocument } from "@/common/types/documentation/nestedDocuments/customerPermission";
// import { type FranchisePermissionDocument } from "@/common/types/documentation/nestedDocuments/franchisePermission";
// import { type MediaPermissionDocument } from "@/common/types/documentation/nestedDocuments/mediaPermission";
// import { type OrderPermissionDocument } from "@/common/types/documentation/nestedDocuments/orderPermission";
// import { type PagePermissionDocument } from "@/common/types/documentation/nestedDocuments/pagePermission";
// import { type PresetPermissionDocument } from "@/common/types/documentation/nestedDocuments/presetPermission";
// import { type SellerPermissionDocument } from "@/common/types/documentation/nestedDocuments/sellerPermission";
// import { type SettingPermissionDocument } from "@/common/types/documentation/nestedDocuments/settingPermission";
// import { type VendorPermissionDocument } from "@/common/types/documentation/nestedDocuments/vendorPermission";

// document
// export interface AdminRolePermissionDocument extends Document {
//   preset?: PresetPermissionDocument;
//   media?: MediaPermissionDocument;
//   category?: CategoryPermissionDocument;
//   content?: ContentPermissionDocument;
//   page?: PagePermissionDocument;
//   order?: OrderPermissionDocument;
//   blog?: BlogPermissionDocument;
//   admin?: AdminPermissionDocument;
//   customer?: CustomerPermissionDocument;
//   franchise?: FranchisePermissionDocument;
//   seller?: SellerPermissionDocument;
//   vendor?: VendorPermissionDocument;
//   setting?: SettingPermissionDocument;
//   cache?: CachePermissionDocument;
// }

type Permission = { isCustomized: false }

export interface AdminRolePermissionDocument extends Document {
  preset?: Permission;
  media?: Permission;
  category?: Permission;
  content?: Permission;
  page?: Permission;
  order?: Permission;
  blog?: Permission;
  admin?: Permission;
  customer?: Permission;
  franchise?: Permission;
  seller?: Permission;
  vendor?: Permission;
  setting?: Permission;
  cache?: Permission;
}