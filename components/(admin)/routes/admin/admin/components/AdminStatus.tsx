// hooks
import { useEffect, useState } from "react";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type AdminDocument } from "@/common/types/documentation/users/admin";

export default function AdminStatus({
  id,
  status,
  isDisabled,
  onUpdateDocument
}: {
  id: string;
  status: "inactive" | "active" | "blocked";
  isDisabled: boolean;
  onUpdateDocument: ({
    documentId,
    updatedDocument
  }: {
    documentId: string;
    updatedDocument: Partial<AdminDocument>;
  }) => void;
}) {
  const [adminStatus, setAdminStatus] = useState<
    "inactive" | "active" | "blocked"
  >(status);

  useEffect(() => {
    setAdminStatus(status);
  }, [status]);

  return (
    <Input
      type="dropdown"
      name="status"
      isRequired={false}
      isDisabled={isDisabled}
      errorCheck={false}
      validCheck={false}
      nullOption={false}
      options={[
        { label: "Inactive", value: "inactive" },
        { label: "Active", value: "active" },
        // { label: "Blocked", value: "blocked" }
      ]}
      customValue={{
        value: adminStatus,
        setValue: (newValue) => {
          onUpdateDocument({
            documentId: id as string,
            updatedDocument: {
              status: newValue as "inactive" | "active" | "blocked",
              updatedBy: ""
            }
          });
          setAdminStatus(newValue as "inactive" | "active" | "blocked");
        }
      }}
    />
  );
}