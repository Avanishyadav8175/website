import { AdminCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/adminCustomPermission";
import { AdminPermissionDocument } from "@/common/types/documentation/nestedDocuments/adminPermission";
import { AdminRolePermissionDocument } from "@/common/types/documentation/nestedDocuments/adminRolePermission";
import { BlogCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/blogCustomPermission";
import { BlogPermissionDocument } from "@/common/types/documentation/nestedDocuments/blogPermission";
import { CacheCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/cacheCustomPermission";
import { CachePermissionDocument } from "@/common/types/documentation/nestedDocuments/cachePermission";
import { CategoryCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/categoryCustomPermission";
import { CategoryPermissionDocument } from "@/common/types/documentation/nestedDocuments/categoryPermission";
import { ContentCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/contentCustomPermission";
import { ContentPermissionDocument } from "@/common/types/documentation/nestedDocuments/contentPermission";
import { CustomerCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/customerCustomPermission";
import { CustomerPermissionDocument } from "@/common/types/documentation/nestedDocuments/customerPermission";
import { FranchiseCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/franchiseCustomPermission";
import { FranchisePermissionDocument } from "@/common/types/documentation/nestedDocuments/franchisePermission";
import { MediaCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/mediaCustomPermission";
import { MediaPermissionDocument } from "@/common/types/documentation/nestedDocuments/mediaPermission";
import { OrderCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/orderCustomPermission";
import { OrderPermissionDocument } from "@/common/types/documentation/nestedDocuments/orderPermission";
import { PageCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/pageCustomPermission";
import { PagePermissionDocument } from "@/common/types/documentation/nestedDocuments/pagePermission";
import { PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";
import { PresetCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/presetCustomPermission";
import { PresetPermissionDocument } from "@/common/types/documentation/nestedDocuments/presetPermission";
import { SellerCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/sellerCustomPermission";
import { SellerPermissionDocument } from "@/common/types/documentation/nestedDocuments/sellerPermission";
import { SettingCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/settingCustomPermission";
import { SettingPermissionDocument } from "@/common/types/documentation/nestedDocuments/settingPermission";
import { VendorCustomPermissionDocument } from "@/common/types/documentation/nestedDocuments/vendorCustomPermission";
import { VendorPermissionDocument } from "@/common/types/documentation/nestedDocuments/vendorPermission";

const permission = {
  create: false,
  read: false,
  update: false,
  delete: false
} as PermissionDocument;

const presetCustomPermission = {
  advancePayment: permission,
  aiTag: permission,
  balloonColorGroup: permission,
  brand: permission,
  cancellationPolicy: permission,
  careInfo: permission,
  catalogue: permission,
  city: permission,
  color: permission,
  commission: permission,
  countryCode: permission,
  deliveryDetail: permission,
  deliveryType: permission,
  enhancement: permission,
  faqGroup: permission,
  flavour: permission,
  foundUsSource: permission,
  gst: permission,
  label: permission,
  noteGroup: permission,
  occasion: permission,
  paymentCycle: permission,
  processingTime: permission,
  promotionTag: permission,
  quickLink: permission,
  relation: permission,
  reviewGroup: permission,
  searchTag: permission,
  securityQuestion: permission,
  state: permission,
  trendingSearchKeyword: permission,
  unit: permission,
  upgrade: permission,
  vendorOfferCategory: permission,
  venue: permission
} as PresetCustomPermissionDocument;

const presetPermission = {
  isCustomized: false,
  all: permission,
  custom: presetCustomPermission
} as unknown as PresetPermissionDocument;

const mediaCustomPermission = {
  folder: permission,
  image: permission,
  customizationImage: permission,
  identificationImage: permission,
  issueImage: permission,
  reviewImage: permission
} as MediaCustomPermissionDocument;

const mediaPermission = {
  isCustomized: false,
  all: permission,
  custom: mediaCustomPermission
} as unknown as MediaPermissionDocument;

const categoryCustomPermission = {
  addon: permission,
  aiTag: permission,
  catalogue: permission,
  content: permission
} as CategoryCustomPermissionDocument;

const categoryPermission = {
  isCustomized: false,
  all: permission,
  custom: categoryCustomPermission
} as unknown as CategoryPermissionDocument;

const contentCustomPermission = {
  addon: permission,
  coupon: permission,
  product: permission,
  service: permission
} as ContentCustomPermissionDocument;

const contentPermission = {
  isCustomized: false,
  all: permission,
  custom: contentCustomPermission
} as unknown as ContentPermissionDocument;

const pageCustomPermission = {
  header: permission,
  footer: permission,
  homepage: permission,
  dynamicPage: permission,
  topicPage: permission,
  subTopicPage: permission
} as PageCustomPermissionDocument;

const pagePermission = {
  isCustomized: false,
  all: permission,
  custom: pageCustomPermission
} as unknown as PagePermissionDocument;

const orderCustomPermission = {
  new: permission,
  inProgress: permission,
  delivered: permission,
  failed: permission,
  cancelled: permission,
  delivery: permission,
  deliveryCancellationRequest: permission
} as OrderCustomPermissionDocument;

const orderPermission = {
  isCustomized: false,
  all: permission,
  custom: orderCustomPermission
} as unknown as OrderPermissionDocument;

const blogCustomPermission = {
  article: permission,
  author: permission,
  category: permission,
  tag: permission
} as BlogCustomPermissionDocument;

const blogPermission = {
  isCustomized: false,
  all: permission,
  custom: blogCustomPermission
} as unknown as BlogPermissionDocument;

const adminCustomPermission = {
  adminRole: permission,
  admin: permission
} as AdminCustomPermissionDocument;

const adminPermission = {
  isCustomized: false,
  all: permission,
  custom: adminCustomPermission
} as unknown as AdminPermissionDocument;

const customerCustomPermission = {
  customer: permission,
  lead: permission,
  callback: permission,
  issue: permission
} as CustomerCustomPermissionDocument;

const customerPermission = {
  isCustomized: false,
  all: permission,
  custom: customerCustomPermission
} as unknown as CustomerPermissionDocument;

const franchiseCustomPermission = {
  request: permission,
  franchise: permission
} as FranchiseCustomPermissionDocument;

const franchisePermission = {
  isCustomized: false,
  all: permission,
  custom: franchiseCustomPermission
} as unknown as FranchisePermissionDocument;

const sellerCustomPermission = {
  request: permission,
  seller: permission
} as SellerCustomPermissionDocument;

const sellerPermission = {
  isCustomized: false,
  all: permission,
  custom: sellerCustomPermission
} as unknown as SellerPermissionDocument;

const vendorCustomPermission = {
  request: permission,
  vendor: permission
} as VendorCustomPermissionDocument;

const vendorPermission = {
  isCustomized: false,
  all: permission,
  custom: vendorCustomPermission
} as unknown as VendorPermissionDocument;

const settingCustomPermission = {
  auth: permission,
  callback: permission,
  contact: permission,
  icon: permission,
  logo: permission,
  serviceImage: permission,
  social: permission
} as SettingCustomPermissionDocument;

const settingPermission = {
  isCustomized: false,
  all: permission,
  custom: settingCustomPermission
} as unknown as SettingPermissionDocument;

const cacheCustomPermission = {
  reset: permission,
  revalidate: permission
} as CacheCustomPermissionDocument;

const cachePermission = {
  isCustomized: false,
  all: permission,
  custom: cacheCustomPermission
} as unknown as CachePermissionDocument;

export const allAdminRolePermission = {
  preset: { isCustomized: false },
  media: { isCustomized: false },
  category: { isCustomized: false },
  content: { isCustomized: false },
  page: { isCustomized: false },
  order: { isCustomized: false },
  blog: { isCustomized: false },
  admin: { isCustomized: false },
  customer: { isCustomized: false },
  franchise: { isCustomized: false },
  seller: { isCustomized: false },
  vendor: { isCustomized: false },
  setting: { isCustomized: false },
  cache: { isCustomized: false }
} as AdminRolePermissionDocument;
