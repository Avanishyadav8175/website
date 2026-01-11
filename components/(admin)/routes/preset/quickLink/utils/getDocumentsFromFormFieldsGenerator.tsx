interface FormFields extends HTMLFormControlsCollection {
  label: HTMLInputElement;
  path: HTMLInputElement;
  image: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  label: elements.label.value,
  path: elements.path.value,
  ...(elements.image.value
    ? {
        image: elements.image.value
      }
    : {}),
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
