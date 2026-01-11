interface FormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  title: HTMLInputElement;
  icon: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  name: elements.name.value,
  title: elements.title.value,
  icon: elements.icon.value,
  isActive: true,
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
