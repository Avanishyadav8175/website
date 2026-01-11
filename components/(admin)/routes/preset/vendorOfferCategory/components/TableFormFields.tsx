// constants
import { categoryTypeOptions } from "../constants/categoryTypeOptions";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type VendorOfferCategoryDocument } from "@/common/types/documentation/presets/vendorOfferCategory";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: VendorOfferCategoryDocument;
}) {
  return (
    <>
      <Input
        type="dropdown"
        name="type"
        isRequired
        labelConfig={{
          label: "For",
          layoutStyle: ""
        }}
        errorCheck={false}
        validCheck={false}
        nullOption
        customInitialValuePlaceholderLabel="None"
        defaultValue={initialDocument?.type}
        options={categoryTypeOptions}
      />
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Name",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.name?.toString() || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
