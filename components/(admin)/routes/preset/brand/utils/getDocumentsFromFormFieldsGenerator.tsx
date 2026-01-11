import { RatingDocument } from "@/common/types/documentation/nestedDocuments/rating";

interface FormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  mail: HTMLInputElement;
  contactNumber: HTMLInputElement;
  address: HTMLTextAreaElement;
  banner: HTMLInputElement;
  ratingValue: HTMLInputElement;
  ratingCount: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  name: elements.name.value,
  mail: elements.mail.value,
  contactNumber: elements.contactNumber.value,
  address: elements.address.value,
  ...(elements.banner.value
    ? {
        banner: JSON.parse(elements.banner.value)
      }
    : {}),
  ...(elements.ratingValue.value && elements.ratingCount.value
    ? {
        rating: {
          value: Number(elements.ratingValue.value),
          count: Number(elements.ratingCount.value)
        } as RatingDocument
      }
    : {}),
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
