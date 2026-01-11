import { type BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";
import { type ClickableImageDocument } from "@/common/types/documentation/nestedDocuments/clickableImage";
import { type InfoDocument } from "@/common/types/documentation/nestedDocuments/info";
import { type SEODocument } from "@/common/types/documentation/nestedDocuments/seo";
import { type SEOMetaDocument } from "@/common/types/documentation/nestedDocuments/seoMeta";
import { type TopicMediaDocument } from "@/common/types/documentation/nestedDocuments/topicMedia";

interface FormFields extends HTMLFormControlsCollection {
  category: HTMLSelectElement;
  topic: HTMLSelectElement;
  subTopic: HTMLSelectElement;
  subSubTopic: HTMLSelectElement;
  name: HTMLInputElement;
  slugPlaceholder: HTMLInputElement;
  slug: HTMLInputElement;
  redirectFrom: HTMLInputElement;
  city: HTMLSelectElement;
  relatedCategories: HTMLInputElement;
  openIn: HTMLSelectElement;
  heading: HTMLInputElement;
  topContent: HTMLInputElement;
  bottomContent: HTMLInputElement;
  banner: HTMLInputElement;
  quickLinks: HTMLInputElement;
  meta: HTMLInputElement;
  faqs: HTMLInputElement;
  contents: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  category: elements.category.value,
  topic: elements.topic.value,
  subTopic: elements.subTopic.value,
  subSubTopic: elements.subSubTopic.value,
  name: elements.name.value,
  slug: elements.slug.value || elements.slugPlaceholder.value,
  // ...(elements.redirectFrom.value
  //   ? {
  //       redirectFrom: JSON.parse(elements.redirectFrom.value) as string[]
  //     }
  //   : { redirectFrom: [] }),
  redirectFrom: [],
  ...(elements.city.value
    ? { city: elements.city.value }
    : { $unset: { city: "" } }),
  // relatedCategories: elements.relatedCategories?.value
  //   ? (JSON.parse(
  //       elements.relatedCategories.value
  //     ) as RelatedContentCategoriesDocument)
  //   : ({ show: false } as RelatedContentCategoriesDocument),
  show: false,
  info: {
    // openIn: elements.openIn.value,
    openIn: "_self",
    heading: elements.heading.value,
    ...(elements.topContent.value
      ? {
        topContent: elements.topContent.value
      }
      : { $unset: { media: "" } }),
    ...(elements.bottomContent.value
      ? {
        bottomContent: elements.bottomContent.value
      }
      : { $unset: { media: "" } })
  } as InfoDocument,
  ...(elements.banner?.value || elements.quickLinks?.value
    ? {
      media: {
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
      } as TopicMediaDocument
    }
    : {
      $unset: { media: "" }
    }),
  seo: {
    meta: JSON.parse(elements.meta.value) as SEOMetaDocument,
    ...(elements.faqs.value ? { faqs: JSON.parse(elements.faqs.value) } : {})
  } as SEODocument,
  contents: JSON.parse(elements.contents.value),
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
