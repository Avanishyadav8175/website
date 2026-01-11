import { type QADocument } from "@/common/types/documentation/nestedDocuments/qa";

interface FormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  faqs: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  name: elements.name.value,
  faqs: JSON.parse(elements.faqs.value) as QADocument[],
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
