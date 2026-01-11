interface FormFields extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  bio: HTMLTextAreaElement;
  photo: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  name: elements.name.value,
  ...(elements.bio.value
    ? { bio: elements.bio.value }
    : { $unset: { bio: "" } }),
  ...(elements.photo.value
    ? { photo: elements.photo.value }
    : { $unset: { photo: "" } }),
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
