// hooks
import { useEffect, useState } from "react";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type VendorDocument } from "@/common/types/documentation/users/vendor";

export default function VendorStatus({
  id,
  status,
  isDisabled,
  onUpdateDocument
}: {
  id: string;
  status: "new" | "active" | "inactive" | "blocked" | "deleted";
  isDisabled: boolean;
  onUpdateDocument: ({
    documentId,
    updatedDocument
  }: {
    documentId: string;
    updatedDocument: Partial<VendorDocument>;
  }) => void;
}) {
  const [vendorStatus, setVendorStatus] = useState<
    "new" | "active" | "inactive" | "blocked" | "deleted"
  >(status);

  useEffect(() => {
    setVendorStatus(status);
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
        { label: "New", value: "new" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Blocked", value: "blocked" },
        { label: "Deleted", value: "deleted" }
      ]}
      customValue={{
        value: vendorStatus,
        setValue: (newValue) => {
          onUpdateDocument({
            documentId: id as string,
            updatedDocument: {
              status: newValue as
                | "new"
                | "active"
                | "inactive"
                | "blocked"
                | "deleted",
              updatedBy: ""
            }
          });
          setVendorStatus(
            newValue as "new" | "active" | "inactive" | "blocked" | "deleted"
          );
        }
      }}
    />
  );
}
