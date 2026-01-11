// hooks
import { useEffect, useState } from "react";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type VendorRequestDocument } from "@/common/types/documentation/actions/vendorRequest";

export default function VendorRequestStatus({
  userName,
  id,
  status,
  isDisabled,
  onUpdateDocument
}: {
  userName?: string;
  id: string;
  status: "new" | "processing" | "registered" | "rejected";
  isDisabled: boolean;
  onUpdateDocument: ({
    documentId,
    updatedDocument
  }: {
    documentId: string;
    updatedDocument: Partial<VendorRequestDocument>;
  }) => void;
}) {
  const [vendorRequestStatus, setVendorRequestStatus] = useState<
    "new" | "processing" | "registered" | "rejected"
  >(status);

  useEffect(() => {
    setVendorRequestStatus(status);
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
        { label: "Processing", value: "processing" },
        { label: "Registered", value: "registered" },
        { label: "Rejected", value: "rejected" }
      ]}
      customValue={{
        value: vendorRequestStatus,
        setValue: (newValue) => {
          onUpdateDocument({
            documentId: id as string,
            updatedDocument: {
              status: newValue as
                | "new"
                | "processing"
                | "registered"
                | "rejected",
              updatedBy: userName || ""
            }
          });
          setVendorRequestStatus(
            newValue as "new" | "processing" | "registered" | "rejected"
          );
        }
      }}
    />
  );
}
