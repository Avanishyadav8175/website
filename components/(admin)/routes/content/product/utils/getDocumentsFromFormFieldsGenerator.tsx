// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";
import { type ContentClassificationDocument } from "@/common/types/documentation/nestedDocuments/contentClassification";
import { type ContentMediaDocument } from "@/common/types/documentation/nestedDocuments/contentMedia";

interface FormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  slug: HTMLInputElement;
  redirectFrom: HTMLInputElement;
  category: HTMLSelectElement;
  media: HTMLInputElement;
  isBestseller: HTMLInputElement;
  isCorporate: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) =>
  ({
    type: "product",
    name: elements.name.value,
    slug: elements.slug.value,
    $unset: { redirectFrom: "" },
    category: JSON.parse(
      elements.category.value
    ) as ContentClassificationDocument,
    media: JSON.parse(elements.media.value) as ContentMediaDocument,
    isBestseller: false,
    // isBestseller: elements.isBestseller.checked,
    isCorporate: false,
    createdBy: "",
    updatedBy: ""
  }) as Partial<ContentDocument>;

export default getDocumentsFromFormFieldsGenerator;
