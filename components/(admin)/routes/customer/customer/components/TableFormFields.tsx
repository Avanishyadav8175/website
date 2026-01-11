// hooks
import { useEffect, useState } from "react";

// components
import CustomerAddress from "@/components/custom/inputs/customerAddress/CustomerAddress";
import Input from "@/lib/Forms/Input/Input";
import MobileNumber from "@/components/custom/inputs/mobileNumber/MobileNumber";
import Toggle from "@/lib/Forms/Toggle/Toggle";

// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: CustomerDocument;
}) {
  // states
  const [includeAddress, setIncludeAddress] = useState<boolean>(
    Boolean(initialDocument?.addresses.find(({ isDefault }) => isDefault))
  );

  useEffect(() => {
    if (initialDocument) {
      setIncludeAddress(
        Boolean(initialDocument?.addresses.find(({ isDefault }) => isDefault))
      );
    }
  }, [initialDocument]);

  return (
    <section className="flex flex-col gap-3 w-[80dvw] p-1">
      <Input
        type="text"
        name="name"
        labelConfig={{
          label: "Name"
        }}
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        defaultValue={initialDocument?.name || ""}
      />
      <MobileNumber
        name="mobileNumber"
        label="Mobile Number"
        defaultValue={initialDocument?.mobileNumber}
      />
      <Input
        type="email"
        name="mail"
        labelConfig={{
          label: "Mail"
        }}
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        defaultValue={initialDocument?.mail || ""}
      />
      <Input
        type="password"
        name="password"
        labelConfig={{
          label: "Password"
        }}
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        defaultValue={initialDocument?.password || ""}
      />
      <Toggle
        name="includeAddress"
        label="Include Address"
        isActive={includeAddress}
        onChangeIsActive={setIncludeAddress}
      />
      {includeAddress && (
        <CustomerAddress
          name="address"
          label="Address"
          defaultValue={initialDocument?.addresses?.find(
            ({ isDefault }) => isDefault
          )}
        />
      )}
    </section>
  );
}
