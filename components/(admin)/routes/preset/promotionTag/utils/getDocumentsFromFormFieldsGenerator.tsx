interface FormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  color: HTMLSelectElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  name: elements.name.value,
  color: elements.color.value,
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
