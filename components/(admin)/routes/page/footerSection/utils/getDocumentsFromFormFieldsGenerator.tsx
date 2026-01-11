// types
import { type FooterSectionDocument } from "@/common/types/documentation/pages/footerSection";
import { type FooterSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/footerSectionLink";

interface FormFields extends HTMLFormControlsCollection {
  heading: HTMLInputElement;
  path: HTMLInputElement;
  links: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) =>
  ({
    heading: elements.heading.value,
    ...(elements?.path?.value
      ? {
          path: elements.path.value
        }
      : { $unset: { path: "" } }),
    ...(elements?.links?.value
      ? {
          links: JSON.parse(elements.links.value) as FooterSectionLinkDocument[]
        }
      : { $unset: { links: "" } }),
    createdBy: "",
    updatedBy: ""
  }) as FooterSectionDocument;

export default getDocumentsFromFormFieldsGenerator;
