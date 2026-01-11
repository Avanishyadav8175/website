interface FormFields extends HTMLFormControlsCollection {
  source: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  source: elements.source.value,
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
