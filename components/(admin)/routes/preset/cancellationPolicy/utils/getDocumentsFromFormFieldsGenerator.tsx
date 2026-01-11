interface FormFields extends HTMLFormControlsCollection {
  label: HTMLInputElement;
  content: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  label: elements.label.value,
  content: elements.content.value,
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
