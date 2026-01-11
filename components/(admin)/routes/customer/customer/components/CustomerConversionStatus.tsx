// hooks
import { ChangeEvent, useEffect, useState } from "react";

// types
import { type ConversionStatus } from "../types/type";
import { type CustomerDocument } from "@/common/types/documentation/users/customer";

export default function CustomerConversionStatus({
  id,
  conversionStatus,
  updatedAt,
  isDisabled,
  onUpdateDocument
}: {
  id: string;
  conversionStatus?: ConversionStatus;
  updatedAt: string | Date;
  isDisabled: boolean;
  onUpdateDocument: ({
    documentId,
    updatedDocument
  }: {
    documentId: string;
    updatedDocument: Partial<CustomerDocument>;
  }) => void;
}) {
  // status
  const [customerConversionStatus, setCustomerConversionStatus] =
    useState<ConversionStatus>(conversionStatus || "new");

  // side effects
  useEffect(() => {
    if (conversionStatus) {
      setCustomerConversionStatus(conversionStatus);
    }
  }, [conversionStatus]);

  return (
    <select
      className={`transition-all duration-300 w-full min-w-36 cursor-pointer rounded-lg py-3 px-3 bg-transparent outline-none border-none hover:outline-1 hover:outline-offset-2 focus:outline-1 focus:outline-offset-2 ${customerConversionStatus === "interested" ? "text-orange-600 hover:outline-orange-600 focus:outline-orange-600" : customerConversionStatus === "not-interested" ? "text-red-600 hover:outline-red-600 focus:outline-red-600" : customerConversionStatus === "website" ? "text-blue-600 hover:outline-blue-600 focus:outline-blue-600" : customerConversionStatus === "whatsapp" ? "text-green-600 hover:outline-green-600 focus:outline-green-600" : "text-charcoal hover:outline-charcoal-3/20 focus:outline-charcoal-3/20"}`}
      name={conversionStatus}
      disabled={isDisabled}
      value={customerConversionStatus}
      onChange={({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
        onUpdateDocument({
          documentId: id as string,
          updatedDocument: {
            conversionStatus: value as ConversionStatus,
            updatedBy: "",
            updatedAt
          }
        });

        setCustomerConversionStatus(value as ConversionStatus);
      }}
    >
      <option
        className="text-charcoal"
        value={"new"}
      >
        {"New"}
      </option>
      <option
        className="text-orange-600"
        value={"interested"}
      >
        {"Interested"}
      </option>
      <option
        className="text-red-600"
        value={"not-interested"}
      >
        {"Not-Interested"}
      </option>
      <option
        className="text-blue-600"
        value={"website"}
      >
        {"Website"}
      </option>
      <option
        className="text-green-600"
        value={"whatsapp"}
      >
        {"WhatsApp"}
      </option>
    </select>
  );
}
