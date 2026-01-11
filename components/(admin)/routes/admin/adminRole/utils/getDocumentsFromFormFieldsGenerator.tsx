import { AdminRolePermissionDocument } from "@/common/types/documentation/nestedDocuments/adminRolePermission";

interface FormFields extends HTMLFormControlsCollection {
  label: HTMLInputElement;
}

const getDocumentsFromFormFieldsGenerator =
  ({
    adminRolePermission
  }: {
    adminRolePermission: AdminRolePermissionDocument;
  }) =>
  (elements: FormFields) => ({
    label: elements.label.value,
    permission: adminRolePermission,
    createdBy: "",
    updatedBy: ""
  });

export default getDocumentsFromFormFieldsGenerator;
