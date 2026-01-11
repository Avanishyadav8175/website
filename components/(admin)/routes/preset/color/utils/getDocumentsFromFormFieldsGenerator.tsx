interface FormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  hexCode: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  name: elements.name.value,
  hexCode: elements.hexCode.value,
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
