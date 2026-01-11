// libraries
import { model as mongooseModel, models as mongooseModels } from "mongoose";

// schemas
import { addonCategorySchema } from "@/db/mongoose/schema/categories/addonCategory";
import { addonSchema } from "@/db/mongoose/schema/contents/addon";
import { adminSchema } from "@/db/mongoose/schema/users/admin";
import { adminRoleSchema } from "@/db/mongoose/schema/presets/adminRole";
import { advancePaymentSchema } from "@/db/mongoose/schema/presets/advancePayment";
import { aiTagCategorySchema } from "@/db/mongoose/schema/categories/aiTagCategory";
import { aiTagSchema } from "@/db/mongoose/schema/presets/aiTag";
import { balloonColorGroupSchema } from "@/db/mongoose/schema/presets/balloonColorGroup";
import { blogArticleSchema } from "@/db/mongoose/schema/blog/blogArticle";
import { blogAuthorSchema } from "@/db/mongoose/schema/blog/blogAuthor";
import { blogCategorySchema } from "@/db/mongoose/schema/blog/blogCategory";
import { blogTagSchema } from "@/db/mongoose/schema/blog/blogTag";
import { brandSchema } from "@/db/mongoose/schema/presets/brand";
import { callbackSchema } from "@/db/mongoose/schema/actions/callback";
import { cancellationPolicySchema } from "@/db/mongoose/schema/presets/cancellationPolicy";
import { careInfoSchema } from "@/db/mongoose/schema/presets/careInfo";
import { cartSchema } from "@/db/mongoose/schema/dynamic/cart";
import { catalogueSchema } from "@/db/mongoose/schema/presets/catalogue";
import { catalogueCategorySchema } from "@/db/mongoose/schema/categories/catalogueCategory";
import { citySchema } from "@/db/mongoose/schema/presets/city";
import { colorSchema } from "@/db/mongoose/schema/presets/color";
import { commissionSchema } from "@/db/mongoose/schema/presets/commission";
import { contentSchema } from "@/db/mongoose/schema/contents/content";
import { contentCategorySchema } from "@/db/mongoose/schema/categories/contentCategory";
import { counterSchema } from "@/db/mongoose/schema/utils/counter";
import { countryCodeSchema } from "@/db/mongoose/schema/presets/countryCode";
import { couponSchema } from "@/db/mongoose/schema/contents/coupon";
import { customerSchema } from "@/db/mongoose/schema/users/customer";
import { customizationImageSchema } from "@/db/mongoose/schema/media/customizationImage";
import { deliverySchema } from "@/db/mongoose/schema/dynamic/delivery";
import { deliveryDetailSchema } from "@/db/mongoose/schema/presets/deliveryDetail";
import { deliveryRequestSchema } from "@/db/mongoose/schema/actions/deliveryRequest";
import { deliveryTypeSchema } from "@/db/mongoose/schema/presets/deliveryType";
import { dynamicPageSchema } from "@/db/mongoose/schema/pages/dynamicPage";
import { enhancementSchema } from "@/db/mongoose/schema/presets/enhancement";
import { faqGroupSchema } from "@/db/mongoose/schema/presets/faqGroup";
import { flavourSchema } from "@/db/mongoose/schema/presets/flavour";
import { folderSchema } from "@/db/mongoose/schema/media/folder";
import { footerSectionSchema } from "@/db/mongoose/schema/pages/footerSection";
import { foundUsSourceSchema } from "@/db/mongoose/schema/presets/foundUsSource";
import { gstSchema } from "@/db/mongoose/schema/presets/gst";
import { headerNavLinkSchema } from "@/db/mongoose/schema/pages/headerNavLink";
import { homepageLayoutSchema } from "@/db/mongoose/schema/pages/homepageLayout";
import { identificationImageSchema } from "@/db/mongoose/schema/media/identificationImage";
import { imageSchema } from "@/db/mongoose/schema/media/image";
import { issueSchema } from "@/db/mongoose/schema/actions/issue";
import { issueImageSchema } from "@/db/mongoose/schema/media/issueImage";
import { labelSchema } from "@/db/mongoose/schema/presets/label";
import { leadSchema } from "@/db/mongoose/schema/actions/lead";
import { noteGroupSchema } from "@/db/mongoose/schema/presets/noteGroup";
import { occasionSchema } from "@/db/mongoose/schema/presets/occasion";
import { orderSchema } from "@/db/mongoose/schema/dynamic/order";
import { paymentCycleSchema } from "@/db/mongoose/schema/presets/paymentCycle";
import { processingTimeSchema } from "@/db/mongoose/schema/presets/processingTime";
import { promotionTagSchema } from "@/db/mongoose/schema/presets/promotionTag";
import { quickLinkSchema } from "@/db/mongoose/schema/presets/quickLink";
import { relationSchema } from "@/db/mongoose/schema/presets/relation";
import { reviewSchema } from "@/db/mongoose/schema/dynamic/review";
import { reviewGroupSchema } from "@/db/mongoose/schema/presets/reviewGroup";
import { reviewImageSchema } from "@/db/mongoose/schema/media/reviewImage";
import { searchTagSchema } from "@/db/mongoose/schema/presets/searchTag";
import { securityQuestionSchema } from "@/db/mongoose/schema/presets/securityQuestion";
import { settingSchema } from "@/db/mongoose/schema/settings/setting";
import { stateSchema } from "@/db/mongoose/schema/presets/state";
import { subTopicSchema } from "@/db/mongoose/schema/pages/subTopic";
import { topicSchema } from "@/db/mongoose/schema/pages/topic";
import { trendingSearchKeywordSchema } from "@/db/mongoose/schema/presets/trendingSearchKeyword";
import { unitSchema } from "@/db/mongoose/schema/presets/unit";
import { upgradeSchema } from "@/db/mongoose/schema/presets/upgrade";
import { vendorSchema } from "@/db/mongoose/schema/users/vendor";
import { vendorOfferCategorySchema } from "@/db/mongoose/schema/presets/vendorOfferCategory";
import { vendorRequestSchema } from "@/db/mongoose/schema/actions/vendorRequest";
import { venueSchema } from "@/db/mongoose/schema/presets/venue";

// types
import {
  type AddonCategoryDocument,
  type AddonCategoryModel
} from "@/common/types/documentation/categories/addonCategory";
import {
  type AddonDocument,
  type AddonModel
} from "@/common/types/documentation/contents/addon";
import {
  type AdminDocument,
  type AdminModel
} from "@/common/types/documentation/users/admin";
import {
  type AdminRoleDocument,
  type AdminRoleModel
} from "@/common/types/documentation/presets/adminRole";
import {
  type AdvancePaymentDocument,
  type AdvancePaymentModel
} from "@/common/types/documentation/presets/advancePayment";
import {
  type AITagCategoryDocument,
  type AITagCategoryModel
} from "@/common/types/documentation/categories/aiTagCategory";
import {
  type AITagDocument,
  type AITagModel
} from "@/common/types/documentation/presets/aiTag";
import {
  type BalloonColorGroupDocument,
  type BalloonColorGroupModel
} from "@/common/types/documentation/presets/balloonColorGroup";
import {
  type BlogArticleDocument,
  type BlogArticleModel
} from "@/common/types/documentation/blog/blogArticle";
import {
  type BlogAuthorDocument,
  type BlogAuthorModel
} from "@/common/types/documentation/blog/blogAuthor";
import {
  type BlogCategoryDocument,
  type BlogCategoryModel
} from "@/common/types/documentation/blog/blogCategory";
import {
  type BlogTagDocument,
  type BlogTagModel
} from "@/common/types/documentation/blog/blogTag";
import {
  type BrandDocument,
  type BrandModel
} from "@/common/types/documentation/presets/brand";
import {
  type CallbackDocument,
  type CallbackModel
} from "@/common/types/documentation/actions/callback";
import {
  type CancellationPolicyDocument,
  type CancellationPolicyModel
} from "@/common/types/documentation/presets/cancellationPolicy";
import {
  type CareInfoDocument,
  type CareInfoModel
} from "@/common/types/documentation/presets/careInfo";
import {
  type CartDocument,
  type CartModel
} from "@/common/types/documentation/dynamic/cart";
import {
  type CatalogueDocument,
  type CatalogueModel
} from "@/common/types/documentation/presets/catalogue";
import {
  type CatalogueCategoryDocument,
  type CatalogueCategoryModel
} from "@/common/types/documentation/categories/catalogueCategory";
import {
  type CityDocument,
  type CityModel
} from "@/common/types/documentation/presets/city";
import {
  type ColorDocument,
  type ColorModel
} from "@/common/types/documentation/presets/color";
import {
  type CommissionDocument,
  type CommissionModel
} from "@/common/types/documentation/presets/commission";
import {
  type ContentDocument,
  type ContentModel
} from "@/common/types/documentation/contents/content";
import {
  type ContentCategoryDocument,
  type ContentCategoryModel
} from "@/common/types/documentation/categories/contentCategory";
import {
  type CounterDocument,
  type CounterModel
} from "@/common/types/documentation/utils/counter";
import {
  type CountryCodeDocument,
  type CountryCodeModel
} from "@/common/types/documentation/presets/countryCode";
import {
  type CouponDocument,
  type CouponModel
} from "@/common/types/documentation/contents/coupon";
import {
  type CustomerDocument,
  type CustomerModel
} from "@/common/types/documentation/users/customer";
import {
  type CustomizationImageDocument,
  type CustomizationImageModel
} from "@/common/types/documentation/media/customizationImage";
import {
  type DeliveryDocument,
  type DeliveryModel
} from "@/common/types/documentation/dynamic/delivery";
import {
  type DeliveryDetailDocument,
  type DeliveryDetailModel
} from "@/common/types/documentation/presets/deliveryDetail";
import {
  type DeliveryRequestDocument,
  type DeliveryRequestModel
} from "@/common/types/documentation/actions/deliveryRequest";
import {
  type DeliveryTypeDocument,
  type DeliveryTypeModel
} from "@/common/types/documentation/presets/deliveryType";
import {
  type DynamicPageDocument,
  type DynamicPageModel
} from "@/common/types/documentation/pages/dynamicPage";
import {
  type EnhancementDocument,
  type EnhancementModel
} from "@/common/types/documentation/presets/enhancement";
import {
  type FAQGroupDocument,
  type FAQGroupModel
} from "@/common/types/documentation/presets/faqGroup";
import {
  type FlavourDocument,
  type FlavourModel
} from "@/common/types/documentation/presets/flavour";
import {
  type FolderDocument,
  type FolderModel
} from "@/common/types/documentation/media/folder";
import {
  type FooterSectionDocument,
  type FooterSectionModel
} from "@/common/types/documentation/pages/footerSection";
import {
  type FoundUsSourceDocument,
  type FoundUsSourceModel
} from "@/common/types/documentation/presets/foundUsSource";
import {
  type GSTDocument,
  type GSTModel
} from "@/common/types/documentation/presets/gst";
import {
  type HeaderNavLinkDocument,
  type HeaderNavLinkModel
} from "@/common/types/documentation/pages/headerNavLink";
import {
  type HomepageLayoutDocument,
  type HomepageLayoutModel
} from "@/common/types/documentation/pages/homepageLayout";
import {
  type IdentificationImageDocument,
  type IdentificationImageModel
} from "@/common/types/documentation/media/identificationImage";
import {
  type ImageDocument,
  type ImageModel
} from "@/common/types/documentation/media/image";
import {
  type IssueDocument,
  type IssueModel
} from "@/common/types/documentation/actions/issue";
import {
  type IssueImageDocument,
  type IssueImageModel
} from "@/common/types/documentation/media/issueImage";
import {
  type LabelDocument,
  type LabelModel
} from "@/common/types/documentation/presets/label";
import {
  type LeadDocument,
  type LeadModel
} from "@/common/types/documentation/actions/lead";
import {
  type NoteGroupDocument,
  type NoteGroupModel
} from "@/common/types/documentation/presets/noteGroup";
import {
  type OccasionDocument,
  type OccasionModel
} from "@/common/types/documentation/presets/occasion";
import {
  type OrderDocument,
  type OrderModel
} from "@/common/types/documentation/dynamic/order";
import {
  type PaymentCycleDocument,
  type PaymentCycleModel
} from "@/common/types/documentation/presets/paymentCycle";
import {
  type ProcessingTimeDocument,
  type ProcessingTimeModel
} from "@/common/types/documentation/presets/processingTime";
import {
  type PromotionTagDocument,
  type PromotionTagModel
} from "@/common/types/documentation/presets/promotionTag";
import {
  type QuickLinkDocument,
  type QuickLinkModel
} from "@/common/types/documentation/presets/quickLink";
import {
  type RelationDocument,
  type RelationModel
} from "@/common/types/documentation/presets/relation";
import {
  type ReviewDocument,
  type ReviewModel
} from "@/common/types/documentation/dynamic/review";
import {
  type ReviewGroupDocument,
  type ReviewGroupModel
} from "@/common/types/documentation/presets/reviewGroup";
import {
  type ReviewImageDocument,
  type ReviewImageModel
} from "@/common/types/documentation/media/reviewImage";
import {
  type SearchTagDocument,
  type SearchTagModel
} from "@/common/types/documentation/presets/searchTag";
import {
  type SecurityQuestionDocument,
  type SecurityQuestionModel
} from "@/common/types/documentation/presets/securityQuestion";
import {
  type SettingDocument,
  type SettingModel
} from "@/common/types/documentation/settings/setting";
import {
  type StateDocument,
  type StateModel
} from "@/common/types/documentation/presets/state";
import {
  type SubTopicDocument,
  type SubTopicModel
} from "@/common/types/documentation/pages/subTopic";
import {
  type SubSubTopicDocument,
  type SubSubTopicModel
} from "@/common/types/documentation/pages/subSubTopic";
import {
  type TopicDocument,
  type TopicModel
} from "@/common/types/documentation/pages/topic";
import {
  type TrendingSearchKeywordDocument,
  type TrendingSearchKeywordModel
} from "@/common/types/documentation/presets/trendingSearchKeyword";
import {
  type UnitDocument,
  type UnitModel
} from "@/common/types/documentation/presets/unit";
import {
  type UpgradeDocument,
  type UpgradeModel
} from "@/common/types/documentation/presets/upgrade";
import {
  type VendorDocument,
  type VendorModel
} from "@/common/types/documentation/users/vendor";
import {
  type VendorOfferCategoryDocument,
  type VendorOfferCategoryModel
} from "@/common/types/documentation/presets/vendorOfferCategory";
import {
  type VendorRequestDocument,
  type VendorRequestModel
} from "@/common/types/documentation/actions/vendorRequest";
import {
  type VenueDocument,
  type VenueModel
} from "@/common/types/documentation/presets/venue";
import { subSubTopicSchema } from "./schema/pages/subSubTopic";
import { SubSubSubTopicDocument, SubSubSubTopicModel } from "@/common/types/documentation/pages/subSubSubTopic";
import { subSubSubTopicSchema } from "./schema/pages/subSubSubTopic";

// types
interface Models {
  AddonCategories: AddonCategoryModel;
  Addons: AddonModel;
  Admins: AdminModel;
  AdminRoles: AdminRoleModel;
  AdvancePayments: AdvancePaymentModel;
  AITagCategories: AITagCategoryModel;
  AITags: AITagModel;
  BalloonColorGroups: BalloonColorGroupModel;
  BlogArticles: BlogArticleModel;
  BlogAuthors: BlogAuthorModel;
  BlogCategories: BlogCategoryModel;
  BlogTags: BlogTagModel;
  Brands: BrandModel;
  Callbacks: CallbackModel;
  CancellationPolicies: CancellationPolicyModel;
  CareInfos: CareInfoModel;
  Carts: CartModel;
  Catalogues: CatalogueModel;
  CatalogueCategories: CatalogueCategoryModel;
  Cities: CityModel;
  Colors: ColorModel;
  Commissions: CommissionModel;
  Contents: ContentModel;
  ContentCategories: ContentCategoryModel;
  Counters: CounterModel;
  CountryCodes: CountryCodeModel;
  Coupons: CouponModel;
  Customers: CustomerModel;
  CustomizationImages: CustomizationImageModel;
  Deliveries: DeliveryModel;
  DeliveryDetails: DeliveryDetailModel;
  DeliveryRequests: DeliveryRequestModel;
  DeliveryTypes: DeliveryTypeModel;
  DynamicPages: DynamicPageModel;
  Enhancements: EnhancementModel;
  FAQGroups: FAQGroupModel;
  Flavours: FlavourModel;
  Folders: FolderModel;
  FooterSections: FooterSectionModel;
  FoundUsSources: FoundUsSourceModel;
  GSTs: GSTModel;
  HeaderNavLinks: HeaderNavLinkModel;
  HomepageLayouts: HomepageLayoutModel;
  IdentificationImages: IdentificationImageModel;
  Images: ImageModel;
  Issues: IssueModel;
  IssueImages: IssueImageModel;
  Labels: LabelModel;
  Leads: LeadModel;
  NoteGroups: NoteGroupModel;
  Occasions: OccasionModel;
  Orders: OrderModel;
  PaymentCycles: PaymentCycleModel;
  ProcessingTimes: ProcessingTimeModel;
  PromotionTags: PromotionTagModel;
  QuickLinks: QuickLinkModel;
  Relations: RelationModel;
  Reviews: ReviewModel;
  ReviewGroups: ReviewGroupModel;
  ReviewImages: ReviewImageModel;
  SearchTags: SearchTagModel;
  SecurityQuestions: SecurityQuestionModel;
  Settings: SettingModel;
  States: StateModel;
  SubTopics: SubTopicModel;
  SubSubTopics: SubSubTopicModel;
  SubSubSubTopics: SubSubSubTopicModel;
  Topics: TopicModel;
  TrendingSearchKeywords: TrendingSearchKeywordModel;
  Units: UnitModel;
  Upgrades: UpgradeModel;
  Vendors: VendorModel;
  VendorOfferCategories: VendorOfferCategoryModel;
  VendorRequests: VendorRequestModel;
  Venues: VenueModel;
}

// models
const models: Models = {
  AddonCategories:
    mongooseModels.AddonCategory ||
    mongooseModel<AddonCategoryDocument, AddonCategoryModel>(
      "AddonCategory",
      addonCategorySchema
    ),
  Addons:
    mongooseModels.Addon ||
    mongooseModel<AddonDocument, AddonModel>("Addon", addonSchema),
  Admins:
    mongooseModels.Admin ||
    mongooseModel<AdminDocument, AdminModel>("Admin", adminSchema),
  AdminRoles:
    mongooseModels.AdminRole ||
    mongooseModel<AdminRoleDocument, AdminRoleModel>(
      "AdminRole",
      adminRoleSchema
    ),
  AdvancePayments:
    mongooseModels.AdvancePayment ||
    mongooseModel<AdvancePaymentDocument, AdvancePaymentModel>(
      "AdvancePayment",
      advancePaymentSchema
    ),
  AITagCategories:
    mongooseModels.AITagCategory ||
    mongooseModel<AITagCategoryDocument, AITagCategoryModel>(
      "AITagCategory",
      aiTagCategorySchema
    ),
  AITags:
    mongooseModels.AITag ||
    mongooseModel<AITagDocument, AITagModel>("AITag", aiTagSchema),
  BalloonColorGroups:
    mongooseModels.BalloonColorGroup ||
    mongooseModel<BalloonColorGroupDocument, BalloonColorGroupModel>(
      "BalloonColorGroup",
      balloonColorGroupSchema
    ),
  BlogArticles:
    mongooseModels.BlogArticle ||
    mongooseModel<BlogArticleDocument, BlogArticleModel>(
      "BlogArticle",
      blogArticleSchema
    ),
  BlogAuthors:
    mongooseModels.BlogAuthor ||
    mongooseModel<BlogAuthorDocument, BlogAuthorModel>(
      "BlogAuthor",
      blogAuthorSchema
    ),
  BlogCategories:
    mongooseModels.BlogCategory ||
    mongooseModel<BlogCategoryDocument, BlogCategoryModel>(
      "BlogCategory",
      blogCategorySchema
    ),
  BlogTags:
    mongooseModels.BlogTag ||
    mongooseModel<BlogTagDocument, BlogTagModel>("BlogTag", blogTagSchema),
  Brands:
    mongooseModels.Brand ||
    mongooseModel<BrandDocument, BrandModel>("Brand", brandSchema),
  Callbacks:
    mongooseModels.Callback ||
    mongooseModel<CallbackDocument, CallbackModel>("Callback", callbackSchema),
  CancellationPolicies:
    mongooseModels.CancellationPolicy ||
    mongooseModel<CancellationPolicyDocument, CancellationPolicyModel>(
      "CancellationPolicy",
      cancellationPolicySchema
    ),
  CareInfos:
    mongooseModels.CareInfo ||
    mongooseModel<CareInfoDocument, CareInfoModel>("CareInfo", careInfoSchema),
  Carts:
    mongooseModels.Cart ||
    mongooseModel<CartDocument, CartModel>("Cart", cartSchema),
  Catalogues:
    mongooseModels.Catalogue ||
    mongooseModel<CatalogueDocument, CatalogueModel>(
      "Catalogue",
      catalogueSchema
    ),
  CatalogueCategories:
    mongooseModels.CatalogueCategory ||
    mongooseModel<CatalogueCategoryDocument, CatalogueCategoryModel>(
      "CatalogueCategory",
      catalogueCategorySchema
    ),
  Cities:
    mongooseModels.City ||
    mongooseModel<CityDocument, CityModel>("City", citySchema),
  Colors:
    mongooseModels.Color ||
    mongooseModel<ColorDocument, ColorModel>("Color", colorSchema),
  Commissions:
    mongooseModels.Commission ||
    mongooseModel<CommissionDocument, CommissionModel>(
      "Commission",
      commissionSchema
    ),
  Contents:
    mongooseModels.Content ||
    mongooseModel<ContentDocument, ContentModel>("Content", contentSchema),
  ContentCategories:
    mongooseModels.ContentCategory ||
    mongooseModel<ContentCategoryDocument, ContentCategoryModel>(
      "ContentCategory",
      contentCategorySchema
    ),
  Counters:
    mongooseModels.Counter ||
    mongooseModel<CounterDocument, CounterModel>("Counter", counterSchema),
  CountryCodes:
    mongooseModels.CountryCode ||
    mongooseModel<CountryCodeDocument, CountryCodeModel>(
      "CountryCode",
      countryCodeSchema
    ),
  Coupons:
    mongooseModels.Coupon ||
    mongooseModel<CouponDocument, CouponModel>("Coupon", couponSchema),
  Customers:
    mongooseModels.Customer ||
    mongooseModel<CustomerDocument, CustomerModel>("Customer", customerSchema),
  CustomizationImages:
    mongooseModels.CustomizationImage ||
    mongooseModel<CustomizationImageDocument, CustomizationImageModel>(
      "CustomizationImage",
      customizationImageSchema
    ),
  Deliveries:
    mongooseModels.Delivery ||
    mongooseModel<DeliveryDocument, DeliveryModel>("Delivery", deliverySchema),
  DeliveryDetails:
    mongooseModels.DeliveryDetail ||
    mongooseModel<DeliveryDetailDocument, DeliveryDetailModel>(
      "DeliveryDetail",
      deliveryDetailSchema
    ),
  DeliveryRequests:
    mongooseModels.DeliveryRequest ||
    mongooseModel<DeliveryRequestDocument, DeliveryRequestModel>(
      "DeliveryRequest",
      deliveryRequestSchema
    ),
  DeliveryTypes:
    mongooseModels.DeliveryType ||
    mongooseModel<DeliveryTypeDocument, DeliveryTypeModel>(
      "DeliveryType",
      deliveryTypeSchema
    ),
  DynamicPages:
    mongooseModels.DynamicPage ||
    mongooseModel<DynamicPageDocument, DynamicPageModel>(
      "DynamicPage",
      dynamicPageSchema
    ),
  Enhancements:
    mongooseModels.Enhancement ||
    mongooseModel<EnhancementDocument, EnhancementModel>(
      "Enhancement",
      enhancementSchema
    ),
  FAQGroups:
    mongooseModels.FAQGroup ||
    mongooseModel<FAQGroupDocument, FAQGroupModel>("FAQGroup", faqGroupSchema),
  Flavours:
    mongooseModels.Flavour ||
    mongooseModel<FlavourDocument, FlavourModel>("Flavour", flavourSchema),
  Folders:
    mongooseModels.Folder ||
    mongooseModel<FolderDocument, FolderModel>("Folder", folderSchema),
  FooterSections:
    mongooseModels.FooterSection ||
    mongooseModel<FooterSectionDocument, FooterSectionModel>(
      "FooterSection",
      footerSectionSchema
    ),
  FoundUsSources:
    mongooseModels.FoundUsSource ||
    mongooseModel<FoundUsSourceDocument, FoundUsSourceModel>(
      "FoundUsSource",
      foundUsSourceSchema
    ),
  GSTs:
    mongooseModels.GST ||
    mongooseModel<GSTDocument, GSTModel>("GST", gstSchema),
  HeaderNavLinks:
    mongooseModels.HeaderNavLink ||
    mongooseModel<HeaderNavLinkDocument, HeaderNavLinkModel>(
      "HeaderNavLink",
      headerNavLinkSchema
    ),
  HomepageLayouts:
    mongooseModels.HomepageLayout ||
    mongooseModel<HomepageLayoutDocument, HomepageLayoutModel>(
      "HomepageLayout",
      homepageLayoutSchema
    ),
  IdentificationImages:
    mongooseModels.IdentificationImage ||
    mongooseModel<IdentificationImageDocument, IdentificationImageModel>(
      "IdentificationImage",
      identificationImageSchema
    ),
  Images:
    mongooseModels.Image ||
    mongooseModel<ImageDocument, ImageModel>("Image", imageSchema),
  Issues:
    mongooseModels.Issue ||
    mongooseModel<IssueDocument, IssueModel>("Issue", issueSchema),
  IssueImages:
    mongooseModels.IssueImage ||
    mongooseModel<IssueImageDocument, IssueImageModel>(
      "IssueImage",
      issueImageSchema
    ),
  Labels:
    mongooseModels.Label ||
    mongooseModel<LabelDocument, LabelModel>("Label", labelSchema),
  Leads:
    mongooseModels.Lead ||
    mongooseModel<LeadDocument, LeadModel>("Lead", leadSchema),
  NoteGroups:
    mongooseModels.NoteGroup ||
    mongooseModel<NoteGroupDocument, NoteGroupModel>(
      "NoteGroup",
      noteGroupSchema
    ),
  Occasions:
    mongooseModels.Occasion ||
    mongooseModel<OccasionDocument, OccasionModel>("Occasion", occasionSchema),
  Orders:
    mongooseModels.Order ||
    mongooseModel<OrderDocument, OrderModel>("Order", orderSchema),
  PaymentCycles:
    mongooseModels.PaymentCycle ||
    mongooseModel<PaymentCycleDocument, PaymentCycleModel>(
      "PaymentCycle",
      paymentCycleSchema
    ),
  ProcessingTimes:
    mongooseModels.ProcessingTime ||
    mongooseModel<ProcessingTimeDocument, ProcessingTimeModel>(
      "ProcessingTime",
      processingTimeSchema
    ),
  PromotionTags:
    mongooseModels.PromotionTag ||
    mongooseModel<PromotionTagDocument, PromotionTagModel>(
      "PromotionTag",
      promotionTagSchema
    ),
  QuickLinks:
    mongooseModels.QuickLink ||
    mongooseModel<QuickLinkDocument, QuickLinkModel>(
      "QuickLink",
      quickLinkSchema
    ),
  Relations:
    mongooseModels.Relation ||
    mongooseModel<RelationDocument, RelationModel>("Relation", relationSchema),
  Reviews:
    mongooseModels.Review ||
    mongooseModel<ReviewDocument, ReviewModel>("Review", reviewSchema),
  ReviewGroups:
    mongooseModels.ReviewGroup ||
    mongooseModel<ReviewGroupDocument, ReviewGroupModel>(
      "ReviewGroup",
      reviewGroupSchema
    ),
  ReviewImages:
    mongooseModels.ReviewImage ||
    mongooseModel<ReviewImageDocument, ReviewImageModel>(
      "ReviewImage",
      reviewImageSchema
    ),
  SearchTags:
    mongooseModels.SearchTag ||
    mongooseModel<SearchTagDocument, SearchTagModel>(
      "SearchTag",
      searchTagSchema
    ),
  SecurityQuestions:
    mongooseModels.SecurityQuestion ||
    mongooseModel<SecurityQuestionDocument, SecurityQuestionModel>(
      "SecurityQuestion",
      securityQuestionSchema
    ),
  Settings:
    mongooseModels.Setting ||
    mongooseModel<SettingDocument, SettingModel>("Setting", settingSchema),
  States:
    mongooseModels.State ||
    mongooseModel<StateDocument, StateModel>("State", stateSchema),
  SubTopics:
    mongooseModels.SubTopic ||
    mongooseModel<SubTopicDocument, SubTopicModel>("SubTopic", subTopicSchema),
  SubSubTopics:
    mongooseModels.SubSubTopic ||
    mongooseModel<SubSubTopicDocument, SubSubTopicModel>("SubSubTopic", subSubTopicSchema),
  SubSubSubTopics:
    mongooseModels.SubSubSubTopic ||
    mongooseModel<SubSubSubTopicDocument, SubSubSubTopicModel>("SubSubSubTopic", subSubSubTopicSchema),
  Topics:
    mongooseModels.Topic ||
    mongooseModel<TopicDocument, TopicModel>("Topic", topicSchema),
  TrendingSearchKeywords:
    mongooseModels.TrendingSearchKeyword ||
    mongooseModel<TrendingSearchKeywordDocument, TrendingSearchKeywordModel>(
      "TrendingSearchKeyword",
      trendingSearchKeywordSchema
    ),
  Units:
    mongooseModels.Unit ||
    mongooseModel<UnitDocument, UnitModel>("Unit", unitSchema),
  Upgrades:
    mongooseModels.Upgrade ||
    mongooseModel<UpgradeDocument, UpgradeModel>("Upgrade", upgradeSchema),
  Vendors:
    mongooseModels.Vendor ||
    mongooseModel<VendorDocument, VendorModel>("Vendor", vendorSchema),
  VendorOfferCategories:
    mongooseModels.VendorOfferCategory ||
    mongooseModel<VendorOfferCategoryDocument, VendorOfferCategoryModel>(
      "VendorOfferCategory",
      vendorOfferCategorySchema
    ),
  VendorRequests:
    mongooseModels.VendorRequest ||
    mongooseModel<VendorRequestDocument, VendorRequestModel>(
      "VendorRequest",
      vendorRequestSchema
    ),
  Venues:
    mongooseModels.Venue ||
    mongooseModel<VenueDocument, VenueModel>("Venue", venueSchema)
};

// export
export default models;
