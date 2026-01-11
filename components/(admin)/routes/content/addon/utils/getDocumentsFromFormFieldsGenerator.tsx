import { EdibleDocument } from "@/common/types/documentation/nestedDocuments/edible";

interface FormFields extends HTMLFormControlsCollection {
  category: HTMLSelectElement;
  name: HTMLInputElement;
  price: HTMLInputElement;
  image: HTMLInputElement;
  isEdible: HTMLInputElement;
  edibleType: HTMLSelectElement;
  isCustomizable: HTMLInputElement;
  customizationLabel: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  category: elements.category.value,
  name: elements.name.value,
  price: Number(elements.price.value),
  ...(elements.image.value ? { image: elements.image.value } : {}),
  edible: {
    // isEdible: elements.isEdible.checked,
    isEdible: false,
    // ...(elements.isEdible.checked ? { type: elements.edibleType.value } : {})
  } as EdibleDocument,
  isCustomizable: false,
  // isCustomizable: elements.isCustomizable.checked,
  // ...(elements.isCustomizable.checked
  //   ? { customizationLabel: elements.customizationLabel.value }
  //   : {}),
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
