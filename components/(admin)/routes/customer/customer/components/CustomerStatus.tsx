// icons
import { Power, PowerOff } from "lucide-react";

// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type Status } from "../types/type";

export default function CustomerStatus({
  id,
  status,
  isDisabled,
  onUpdateDocument
}: {
  id: string;
  status: Status;
  isDisabled: boolean;
  onUpdateDocument: ({
    documentId,
    updatedDocument
  }: {
    documentId: string;
    updatedDocument: Partial<CustomerDocument>;
  }) => void;
}) {
  return (
    <div
      className={`transition-all duration-300 ${status === "active" ? "hover:text-emerald-700" : "hover:text-neutral-700"} ${isDisabled ? "pointer-events-none" : ""}`}
      onClick={() => {
        onUpdateDocument({
          documentId: id as string,
          updatedDocument: {
            status: status === "active" ? "blocked" : "active",
            updatedBy: ""
          }
        });
      }}
    >
      {status === "active" ? (
        <Power
          strokeWidth={1.5}
          width={18}
          className="cursor-pointer text-green-700"
        />
      ) : (
        <PowerOff
          strokeWidth={1.5}
          width={18}
          className="cursor-pointer text-red-600"
        />
      )}
    </div>
  );
}
