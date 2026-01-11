interface FormFields extends HTMLFormControlsCollection {
  type: HTMLSelectElement;
  name: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  type: elements.type.value as "product" | "service",
  name: elements.name.value,
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
