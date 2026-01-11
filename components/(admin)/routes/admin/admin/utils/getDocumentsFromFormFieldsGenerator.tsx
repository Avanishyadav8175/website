interface FormFields extends HTMLFormControlsCollection {
  userName: HTMLInputElement;
  password: HTMLInputElement;
  isSuperAdmin: HTMLInputElement;
  role: HTMLSelectElement;
}

const getDocumentsFromFormFieldsGenerator = () => (elements: FormFields) => ({
  userName: elements.userName.value,
  password: elements.password.value,
  // isSuperAdmin: elements.isSuperAdmin.checked,
  isSuperAdmin: true,
  $unset: { role: "" },
  // ...(elements.isSuperAdmin.checked
  //   ? { $unset: { role: "" } }
  //   : { role: elements.role.value }),
  createdBy: "",
  updatedBy: ""
});

export default getDocumentsFromFormFieldsGenerator;
