// utils
import { type createAsyncThunk } from "@/store/withType";

// types
import {
  type Action,
  type ActionCreatorWithoutPayload,
  type Dispatch,
  type ThunkDispatch
} from "@reduxjs/toolkit";
import { type Document as MongooseDocument } from "mongoose";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type QueryReturn, type SliceState } from "@/common/types/redux/redux";
import {
  type SwapOrderType,
  type ResponseDataType
} from "@/common/types/apiTypes";
import { type SelectOption } from "@/common/types/inputs";
import { type ToastType } from "@/common/types/toast";

// documents
import { type AddonDocument } from "@/common/types/documentation/contents/addon";
import { type AddonCategoryDocument } from "@/common/types/documentation/categories/addonCategory";
import { type AdminDocument } from "@/common/types/documentation/users/admin";
import { type AdminRoleDocument } from "@/common/types/documentation/presets/adminRole";
import { type AdvancePaymentDocument } from "@/common/types/documentation/presets/advancePayment";
import { type AITagCategoryDocument } from "@/common/types/documentation/categories/aiTagCategory";
import { type AITagDocument } from "@/common/types/documentation/presets/aiTag";
import { type BalloonColorGroupDocument } from "@/common/types/documentation/presets/balloonColorGroup";
import { type BlogArticleDocument } from "@/common/types/documentation/blog/blogArticle";
import { type BlogAuthorDocument } from "@/common/types/documentation/blog/blogAuthor";
import { type BlogCategoryDocument } from "@/common/types/documentation/blog/blogCategory";
import { type BlogTagDocument } from "@/common/types/documentation/blog/blogTag";
import { type BrandDocument } from "@/common/types/documentation/presets/brand";
import { type CancellationPolicyDocument } from "@/common/types/documentation/presets/cancellationPolicy";
import { type CareInfoDocument } from "@/common/types/documentation/presets/careInfo";
import { type CartDocument } from "@/common/types/documentation/dynamic/cart";
import { type CatalogueDocument } from "@/common/types/documentation/presets/catalogue";
import { type CatalogueCategoryDocument } from "@/common/types/documentation/categories/catalogueCategory";
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type ColorDocument } from "@/common/types/documentation/presets/color";
import { type CommissionDocument } from "@/common/types/documentation/presets/commission";
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentCategoryDocument } from "@/common/types/documentation/categories/contentCategory";
import { type CountryCodeDocument } from "@/common/types/documentation/presets/countryCode";
import { type CouponDocument } from "@/common/types/documentation/contents/coupon";
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";
import { type DeliveryDetailDocument } from "@/common/types/documentation/presets/deliveryDetail";
import { type DeliveryDocument } from "@/common/types/documentation/dynamic/delivery";
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";
import { type DynamicPageDocument } from "@/common/types/documentation/pages/dynamicPage";
import { type EnhancementDocument } from "@/common/types/documentation/presets/enhancement";
import { type FAQGroupDocument } from "@/common/types/documentation/presets/faqGroup";
import { type FlavourDocument } from "@/common/types/documentation/presets/flavour";
import { type FolderDocument } from "@/common/types/documentation/media/folder";
import { type FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";
import { type FoundUsSourceDocument } from "@/common/types/documentation/presets/foundUsSource";
import { type GSTDocument } from "@/common/types/documentation/presets/gst";
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";
import { type HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";
import { type IdentificationImageDocument } from "@/common/types/documentation/media/identificationImage";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type IssueImageDocument } from "@/common/types/documentation/media/issueImage";
import { type LabelDocument } from "@/common/types/documentation/presets/label";
import { type NoteGroupDocument } from "@/common/types/documentation/presets/noteGroup";
import { type OccasionDocument } from "@/common/types/documentation/presets/occasion";
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";
import { type PaymentCycleDocument } from "@/common/types/documentation/presets/paymentCycle";
import { type ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";
import { type PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";
import { type QuickLinkDocument } from "@/common/types/documentation/presets/quickLink";
import { type RelationDocument } from "@/common/types/documentation/presets/relation";
import { type ReviewGroupDocument } from "@/common/types/documentation/presets/reviewGroup";
import { type ReviewImageDocument } from "@/common/types/documentation/media/reviewImage";
import { type SearchTagDocument } from "@/common/types/documentation/presets/searchTag";
import { type SecurityQuestionDocument } from "@/common/types/documentation/presets/securityQuestion";
import { type SettingDocument } from "@/common/types/documentation/settings/setting";
import { type StateDocument } from "@/common/types/documentation/presets/state";
import { type SubTopicDocument } from "@/common/types/documentation/pages/subTopic";
import { type SubSubTopicDocument } from "@/common/types/documentation/pages/subSubTopic";
import { type SubSubSubTopicDocument } from "@/common/types/documentation/pages/subSubSubTopic";
import { type TopicDocument } from "@/common/types/documentation/pages/topic";
import { type TrendingSearchKeywordDocument } from "@/common/types/documentation/presets/trendingSearchKeyword";
import { type UnitDocument } from "@/common/types/documentation/presets/unit";
import { type UpgradeDocument } from "@/common/types/documentation/presets/upgrade";
import { type VendorDocument } from "@/common/types/documentation/users/vendor";
import { type VendorOfferCategoryDocument } from "@/common/types/documentation/presets/vendorOfferCategory";
import { type VenueDocument } from "@/common/types/documentation/presets/venue";
import { type VendorRequestDocument } from "@/common/types/documentation/actions/vendorRequest";

export type StateType = {
  addons: SliceState<AddonDocument>;
  addonCategories: SliceState<AddonCategoryDocument>;
  admins: SliceState<AdminDocument>;
  adminRoles: SliceState<AdminRoleDocument>;
  advancePayments: SliceState<AdvancePaymentDocument>;
  aiTagCategories: SliceState<AITagCategoryDocument>;
  aiTags: SliceState<AITagDocument>;
  balloonColorGroups: SliceState<BalloonColorGroupDocument>;
  blogArticles: SliceState<BlogArticleDocument>;
  blogAuthors: SliceState<BlogAuthorDocument>;
  blogCategories: SliceState<BlogCategoryDocument>;
  blogTags: SliceState<BlogTagDocument>;
  brands: SliceState<BrandDocument>;
  cancellationPolicies: SliceState<CancellationPolicyDocument>;
  careInfos: SliceState<CareInfoDocument>;
  carts: SliceState<CartDocument>;
  catalogues: SliceState<CatalogueDocument>;
  catalogueCategories: SliceState<CatalogueCategoryDocument>;
  cities: SliceState<CityDocument>;
  colors: SliceState<ColorDocument>;
  commissions: SliceState<CommissionDocument>;
  contents: SliceState<ContentDocument>;
  contentCategories: SliceState<ContentCategoryDocument>;
  countryCodes: SliceState<CountryCodeDocument>;
  coupons: SliceState<CouponDocument>;
  customers: SliceState<CustomerDocument>;
  customizationImages: SliceState<CustomizationImageDocument>;
  deliveries: SliceState<DeliveryDocument>;
  deliveryDetails: SliceState<DeliveryDetailDocument>;
  deliveryTypes: SliceState<DeliveryTypeDocument>;
  dynamicPages: SliceState<DynamicPageDocument>;
  enhancements: SliceState<EnhancementDocument>;
  faqGroups: SliceState<FAQGroupDocument>;
  flavours: SliceState<FlavourDocument>;
  folders: SliceState<FolderDocument>;
  footerSections: SliceState<FooterSectionDocument>;
  foundUsSources: SliceState<FoundUsSourceDocument>;
  gsts: SliceState<GSTDocument>;
  headerNavLinks: SliceState<HeaderNavLinkDocument>;
  homepageLayouts: SliceState<HomepageLayoutDocument>;
  identificationImages: SliceState<IdentificationImageDocument>;
  images: SliceState<ImageDocument>;
  issueImages: SliceState<IssueImageDocument>;
  labels: SliceState<LabelDocument>;
  noteGroups: SliceState<NoteGroupDocument>;
  occasions: SliceState<OccasionDocument>;
  orders: SliceState<OrderDocument>;
  paymentCycles: SliceState<PaymentCycleDocument>;
  processingTimes: SliceState<ProcessingTimeDocument>;
  promotionTags: SliceState<PromotionTagDocument>;
  quickLinks: SliceState<QuickLinkDocument>;
  relations: SliceState<RelationDocument>;
  reviewGroups: SliceState<ReviewGroupDocument>;
  reviewImages: SliceState<ReviewImageDocument>;
  searchTags: SliceState<SearchTagDocument>;
  securityQuestions: SliceState<SecurityQuestionDocument>;
  settings: SliceState<SettingDocument>;
  states: SliceState<StateDocument>;
  subTopics: SliceState<SubTopicDocument>;
  subSubTopics: SliceState<SubSubTopicDocument>;
  subSubSubTopics: SliceState<SubSubSubTopicDocument>;
  topics: SliceState<TopicDocument>;
  trendingSearchKeywords: SliceState<TrendingSearchKeywordDocument>;
  units: SliceState<UnitDocument>;
  upgrades: SliceState<UpgradeDocument>;
  vendorOfferCategories: SliceState<VendorOfferCategoryDocument>;
  vendors: SliceState<VendorDocument>;
  vendorRequests: SliceState<VendorRequestDocument>;
  venues: SliceState<VenueDocument>;
};

export type DispatchType = ThunkDispatch<StateType, undefined, Action> &
  Dispatch<Action>;

export type CreateActionType<Document extends MongooseDocument> = {
  resetNotifications: ActionCreatorWithoutPayload<`${string}/resetNotifications`>;
  fetchDocumentList: ReturnType<
    typeof createAsyncThunk<
      ResponseDataType<Document[]>,
      void,
      { rejectValue: ToastType[] }
    >
  >;
  fetchDocument: ReturnType<
    typeof createAsyncThunk<
      ResponseDataType<Document>,
      { documentId: string },
      { rejectValue: ToastType[] }
    >
  >;
  fetchOrSelectDocument: ReturnType<
    typeof createAsyncThunk<
      Document,
      { documentId: string },
      { state: StateType; rejectValue: ToastType[] }
    >
  >;
  fetchDocuments: ReturnType<
    typeof createAsyncThunk<
      ResponseDataType<Document[]>,
      void,
      { rejectValue: ToastType[] }
    >
  >;
  addDocuments: ReturnType<
    typeof createAsyncThunk<
      ResponseDataType<Document | Document[]>,
      { newDocuments: Document | Document[] },
      { rejectValue: ToastType[] }
    >
  >;
  updateDocument: ReturnType<
    typeof createAsyncThunk<
      ResponseDataType<Document>,
      { documentId: string; updateData: Partial<Document> },
      { rejectValue: ToastType[] }
    >
  >;
  activateDocument: ReturnType<
    typeof createAsyncThunk<
      ResponseDataType<Document>,
      { documentId: string },
      { rejectValue: ToastType[] }
    >
  >;
  activateDocuments: ReturnType<
    typeof createAsyncThunk<
      {
        documentIds: string[];
        response: ResponseDataType<boolean>;
      },
      { documentIds: string[] },
      { rejectValue: ToastType[] }
    >
  >;
  deactivateDocument: ReturnType<
    typeof createAsyncThunk<
      ResponseDataType<Document>,
      { documentId: string },
      { rejectValue: ToastType[] }
    >
  >;
  deactivateDocuments: ReturnType<
    typeof createAsyncThunk<
      {
        documentIds: string[];
        response: ResponseDataType<boolean>;
      },
      { documentIds: string[] },
      { rejectValue: ToastType[] }
    >
  >;
  trashDocument: ReturnType<
    typeof createAsyncThunk<
      ResponseDataType<Document>,
      { documentId: string },
      { rejectValue: ToastType[] }
    >
  >;
  trashDocuments: ReturnType<
    typeof createAsyncThunk<
      {
        documentIds: string[];
        response: ResponseDataType<boolean>;
      },
      { documentIds: string[] },
      { rejectValue: ToastType[] }
    >
  >;
  restoreDocument: ReturnType<
    typeof createAsyncThunk<
      ResponseDataType<Document>,
      { documentId: string },
      { rejectValue: ToastType[] }
    >
  >;
  restoreDocuments: ReturnType<
    typeof createAsyncThunk<
      {
        documentIds: string[];
        response: ResponseDataType<boolean>;
      },
      { documentIds: string[] },
      { rejectValue: ToastType[] }
    >
  >;
  swapDocumentsOrder: ReturnType<
    typeof createAsyncThunk<
      { response: ResponseDataType<Document[]> },
      { swapOrder: SwapOrderType },
      { rejectValue: ToastType[] }
    >
  >;
  deleteDocument: ReturnType<
    typeof createAsyncThunk<
      ResponseDataType<Document>,
      { documentId: string },
      { rejectValue: ToastType[] }
    >
  >;
  deleteDocuments: ReturnType<
    typeof createAsyncThunk<
      {
        documentIds: string[];
        response: ResponseDataType<boolean>;
      },
      { documentIds: string[] },
      { rejectValue: ToastType[] }
    >
  >;
};

export type SelectType<Document extends MongooseDocument> = {
  documentList: (
    state: StateType,
    options?: {
      active?: boolean;
      deleted?: boolean;
      offset?: number;
      limit?: number;
      searchKeyword?: string;
      defaultFilterBy?: string;
      defaultFilterKeyword?: string;
      filterBy?: string;
      filterKeyword?: string;
      filterFunction?: (document: Document) => boolean;
      sortBy?: string;
      orderBy?: "asc" | "desc";
    }
  ) => {
    count: number;
    documents: Document[];
    options: SelectOption[];
  };
  documents: (state: StateType) => Document[];
  document: (state: StateType, documentId: string) => Document | undefined;
  query: (
    state: StateType,
    filterKeywordOptions: FilterKeywordOptions<Document>
  ) => QueryReturn;
  status: (state: StateType) => "idle" | "pending" | "fulfilled" | "rejected";
  notifications: (state: StateType) => ToastType[];
};
