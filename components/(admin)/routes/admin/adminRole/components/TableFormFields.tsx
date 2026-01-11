// hooks
import { useEffect } from "react";

// components
import AdminRoleInput from "./AdminRoleInput";
import Input from "@/lib/Forms/Input/Input";

// types
import { type AdminRoleDocument } from "@/common/types/documentation/presets/adminRole";
import { type AdminRolePermissionDocument } from "@/common/types/documentation/nestedDocuments/adminRolePermission";

export default function TableFormFields({
  initialDocument,
  adminRolePermission,
  onChangeAdminRolePermission
}: {
  initialDocument?: AdminRoleDocument;
  adminRolePermission: AdminRolePermissionDocument;
  onChangeAdminRolePermission: (
    newAdminRolePermission: AdminRolePermissionDocument
  ) => void;
}) {
  useEffect(() => {
    if (initialDocument) {
      onChangeAdminRolePermission(initialDocument.permission);
    } else {
      onChangeAdminRolePermission({} as AdminRolePermissionDocument);
    }
  }, [initialDocument, onChangeAdminRolePermission]);

  return (
    <section className="w-[40dvw]">
      <Input
        type="text"
        name="label"
        isRequired
        labelConfig={{
          label: "Label",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.label}
        errorCheck={false}
        validCheck={false}
      />
      <AdminRoleInput
        adminRolePermission={adminRolePermission}
        onChangeAdminRolePermission={onChangeAdminRolePermission}
      />
    </section>
  );
}
