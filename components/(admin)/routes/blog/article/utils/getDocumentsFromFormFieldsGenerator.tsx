interface FormFields extends HTMLFormControlsCollection {}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
