interface FormFields extends HTMLFormControlsCollection {
  image: HTMLInputElement;
  label: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  image: elements.image.value,
  label: elements.label.value,
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
