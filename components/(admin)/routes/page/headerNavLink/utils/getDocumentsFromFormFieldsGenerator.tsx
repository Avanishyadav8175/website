import { type ClickableImageDocument } from "@/common/types/documentation/nestedDocuments/clickableImage";
import { type HeaderNavLinkDocument } from "@/common/types/documentation/pages/headerNavLink";
import { type HeaderNavLinkSectionDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSection";

interface FormFields extends HTMLFormControlsCollection {
  label: HTMLInputElement;
  path: HTMLInputElement;
  sections: HTMLInputElement;
  quickLinks: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) =>
  ({
    label: elements.label.value,
    ...(elements?.path?.value
      ? {
          path: elements.path.value
        }
      : { $unset: { path: "" } }),
    ...(elements?.sections?.value
      ? {
          sections: JSON.parse(
            elements.sections.value
          ) as HeaderNavLinkSectionDocument[]
        }
      : { $unset: { sections: "" } }),
    ...(elements?.quickLinks?.value
      ? {
          quickLinks: JSON.parse(
            elements.quickLinks.value
          ) as ClickableImageDocument[]
        }
      : { $unset: { quickLinks: "" } }),
    createdBy: "",
    updatedBy: ""
  }) as HeaderNavLinkDocument;

export default getDocumentsFromFormFieldsGenerator;
