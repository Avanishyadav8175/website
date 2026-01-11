import { type BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";
import { type CategoryChargesDocument } from "@/common/types/documentation/nestedDocuments/categoryCharges";
import { type CategoryMediaDocument } from "@/common/types/documentation/nestedDocuments/categoryMedia";
import { type ClickableImageDocument } from "@/common/types/documentation/nestedDocuments/clickableImage";
import { type InfoDocument } from "@/common/types/documentation/nestedDocuments/info";
import { type RelatedContentCategoriesDocument } from "@/common/types/documentation/nestedDocuments/relatedContentCategories";
import { type SEODocument } from "@/common/types/documentation/nestedDocuments/seo";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";

interface FormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  slugPlaceholder: HTMLInputElement;
  slug: HTMLInputElement;
  redirectFrom: HTMLInputElement;
  relatedCategories: HTMLInputElement;
  openIn: HTMLSelectElement;
  heading: HTMLInputElement;
  topContent: HTMLInputElement;
  bottomContent: HTMLInputElement;
  advancePayment: HTMLSelectElement;
  deliveryCharge: HTMLInputElement;
  gst: HTMLSelectElement;
  icon: HTMLInputElement;
  banner: HTMLInputElement;
  quickLinks: HTMLInputElement;
  meta: HTMLInputElement;
  faqs: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  name: elements.name.value,
  slug: elements.slug.value || elements.slugPlaceholder.value,
  $unset: { redirectFrom: "" },
  relatedCategories: elements.relatedCategories?.value
    ? (JSON.parse(
      elements.relatedCategories.value
    ) as RelatedContentCategoriesDocument)
    : ({ show: false } as RelatedContentCategoriesDocument),
  info: {
    openIn: "_self",
    heading: elements.heading.value,
    ...(elements.topContent.value
      ? {
        topContent: elements.topContent.value
      }
      : {}),
    ...(elements.bottomContent.value
      ? {
        bottomContent: elements.bottomContent.value
      }
      : {})
  } as InfoDocument,
  charges: {
    advancePayment: elements.advancePayment.value,
    deliveryCharge: Number(elements.deliveryCharge.value)
  } as CategoryChargesDocument,
  media: {
    icon: elements.icon.value,
    ...(elements.banner?.value
      ? {
        banner: JSON.parse(elements.banner.value) as BannerDocument
      }
      : { $unset: { banner: "" } }),
    ...(elements.quickLinks?.value
      ? {
        quickLinks: JSON.parse(
          elements.quickLinks.value
        ) as ClickableImageDocument[]
      }
      : { $unset: { quickLinks: "" } })
  } as CategoryMediaDocument,
  seo: {
    meta: JSON.parse(elements.meta.value) as SEOMetaDocument,
    ...(elements.faqs.value ? { faqs: JSON.parse(elements.faqs.value) } : {})
  } as SEODocument,
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
