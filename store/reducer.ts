// libraries
import { combineReducers } from "redux";

// reducers
import { addonReducer } from "@/store/features/contents/addonSlice";
import { addonCategoryReducer } from "@/store/features/categories/addonCategorySlice";
import { adminReducer } from "@/store/features/users/adminSlice";
import { advancePaymentReducer } from "@/store/features/presets/advancePaymentSlice";
import { cityReducer } from "@/store/features/presets/citySlice";
import { adminRoleReducer } from "@/store/features/presets/adminRoleSlice";
import { aiTagCategoryReducer } from "@/store/features/categories/aiTagCategorySlice";
import { aiTagReducer } from "@/store/features/presets/aiTagSlice";
import { balloonColorGroupReducer } from "@/store/features/presets/balloonColorGroupSlice";
import { blogArticleReducer } from "@/store/features/blogs/blogArticleSlice";
import { blogAuthorReducer } from "@/store/features/blogs/blogAuthorSlice";
import { blogCategoryReducer } from "@/store/features/blogs/blogCategorySlice";
import { blogTagReducer } from "@/store/features/blogs/blogTagSlice";
import { brandReducer } from "@/store/features/presets/brandSlice";
import { cancellationPolicyReducer } from "@/store/features/presets/cancellationPolicySlice";
import { careInfoReducer } from "@/store/features/presets/careInfoSlice";
import { cartReducer } from "./features/dynamic/cartSlice";
import { catalogueReducer } from "./features/presets/catalogueSlice";
import { catalogueCategoryReducer } from "./features/categories/catalogueCategorySlice";
import { colorReducer } from "@/store/features/presets/colorSlice";
import { commissionReducer } from "@/store/features/presets/commissionSlice";
import { contentReducer } from "@/store/features/contents/contentSlice";
import { contentCategoryReducer } from "@/store/features/categories/contentCategorySlice";
import { countryCodeReducer } from "@/store/features/presets/countryCodeSlice";
import { couponReducer } from "@/store/features/contents/couponSlice";
import { customerReducer } from "@/store/features/users/customerSlice";
import { customizationImageReducer } from "@/store/features/media/customizationImageSlice";
import { deliveryReducer } from "./features/dynamic/deliverySlice";
import { deliveryDetailReducer } from "@/store/features/presets/deliveryDetailSlice";
import { deliveryTypeReducer } from "@/store/features/presets/deliveryTypeSlice";
import { dynamicPageReducer } from "./features/pages/dynamicSlice";
import { enhancementReducer } from "@/store/features/presets/enhancementSlice";
import { faqGroupReducer } from "@/store/features/presets/faqGroupSlice";
import { flavourReducer } from "@/store/features/presets/flavourSlice";
import { folderReducer } from "@/store/features/media/folderSlice";
import { footerSectionReducer } from "./features/pages/footerSectionSlice";
import { foundUsSourceReducer } from "@/store/features/presets/foundUsSourceSlice";
import { gstReducer } from "@/store/features/presets/gstSlice";
import { headerNavLinkReducer } from "./features/pages/headerNavLinkSlice";
import { homepageLayoutReducer } from "./features/pages/homepageLayoutSlice";
import { identificationImageReducer } from "@/store/features/media/identificationImageSlice";
import { imageReducer } from "@/store/features/media/imageSlice";
import { issueImageReducer } from "@/store/features/media/issueImageSlice";
import { labelReducer } from "@/store/features/presets/labelSlice";
import { noteGroupReducer } from "@/store/features/presets/noteGroupSlice";
import { occasionReducer } from "@/store/features/presets/occasionSlice";
import { orderReducer } from "./features/dynamic/orderSlice";
import { paymentCycleReducer } from "@/store/features/presets/paymentCycleSlice";
import { processingTimeReducer } from "@/store/features/presets/processingTimeSlice";
import { promotionTagReducer } from "@/store/features/presets/promotionTagSlice";
import { quickLinkReducer } from "@/store/features/presets/quickLinkSlice";
import { relationReducer } from "@/store/features/presets/relationSlice";
import { reviewGroupReducer } from "@/store/features/presets/reviewGroupSlice";
import { reviewImageReducer } from "@/store/features/media/reviewImageSlice";
import { searchTagReducer } from "@/store/features/presets/searchTagSlice";
import { securityQuestionReducer } from "@/store/features/presets/securityQuestionSlice";
import { settingReducer } from "./features/setting/settingSlice";
import { stateReducer } from "@/store/features/presets/stateSlice";
import { subTopicReducer } from "@/store/features/pages/subTopicSlice";
import { subSubTopicReducer } from "@/store/features/pages/subSubTopicSlice";
import { subSubSubTopicReducer } from "@/store/features/pages/subSubSubTopicSlice";
import { topicReducer } from "@/store/features/pages/topicSlice";
import { trendingSearchKeywordReducer } from "@/store/features/presets/trendingSearchKeywordSlice";
import { unitReducer } from "@/store/features/presets/unitSlice";
import { upgradeReducer } from "@/store/features/presets/upgradeSlice";
import { vendorOfferCategoryReducer } from "@/store/features/presets/vendorOfferCategorySlice";
import { vendorReducer } from "./features/users/vendorSlice";
import { vendorRequestReducer } from "@/store/features/actions/vendorRequestSlice";
import { venueReducer } from "@/store/features/presets/venueSlice";

// reducer
const reducer = combineReducers({
  addons: addonReducer,
  addonCategories: addonCategoryReducer,
  admins: adminReducer,
  adminRoles: adminRoleReducer,
  advancePayments: advancePaymentReducer,
  aiTagCategories: aiTagCategoryReducer,
  aiTags: aiTagReducer,
  balloonColorGroups: balloonColorGroupReducer,
  blogArticles: blogArticleReducer,
  blogAuthors: blogAuthorReducer,
  blogCategories: blogCategoryReducer,
  blogTags: blogTagReducer,
  brands: brandReducer,
  cancellationPolicies: cancellationPolicyReducer,
  careInfos: careInfoReducer,
  carts: cartReducer,
  catalogues: catalogueReducer,
  catalogueCategories: catalogueCategoryReducer,
  cities: cityReducer,
  colors: colorReducer,
  commissions: commissionReducer,
  contents: contentReducer,
  contentCategories: contentCategoryReducer,
  countryCodes: countryCodeReducer,
  coupons: couponReducer,
  customers: customerReducer,
  customizationImages: customizationImageReducer,
  deliveries: deliveryReducer,
  deliveryDetails: deliveryDetailReducer,
  deliveryTypes: deliveryTypeReducer,
  dynamicPages: dynamicPageReducer,
  enhancements: enhancementReducer,
  faqGroups: faqGroupReducer,
  flavours: flavourReducer,
  folders: folderReducer,
  footerSections: footerSectionReducer,
  foundUsSources: foundUsSourceReducer,
  gsts: gstReducer,
  headerNavLinks: headerNavLinkReducer,
  homepageLayouts: homepageLayoutReducer,
  identificationImages: identificationImageReducer,
  images: imageReducer,
  issueImages: issueImageReducer,
  labels: labelReducer,
  noteGroups: noteGroupReducer,
  occasions: occasionReducer,
  orders: orderReducer,
  paymentCycles: paymentCycleReducer,
  processingTimes: processingTimeReducer,
  promotionTags: promotionTagReducer,
  quickLinks: quickLinkReducer,
  relations: relationReducer,
  reviewGroups: reviewGroupReducer,
  reviewImages: reviewImageReducer,
  searchTags: searchTagReducer,
  securityQuestions: securityQuestionReducer,
  settings: settingReducer,
  states: stateReducer,
  subTopics: subTopicReducer,
  subSubTopics: subSubTopicReducer,
  subSubSubTopics: subSubSubTopicReducer,
  topics: topicReducer,
  trendingSearchKeywords: trendingSearchKeywordReducer,
  units: unitReducer,
  upgrades: upgradeReducer,
  vendorOfferCategories: vendorOfferCategoryReducer,
  vendors: vendorReducer,
  vendorRequests: vendorRequestReducer,
  venues: venueReducer
});

export default reducer;
