// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type CountryCodeDocument } from "@/common/types/documentation/presets/countryCode";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: CountryCodeDocument;
}) {
  return (
    <>
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Country",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.name || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="text"
        name="code"
        isRequired
        labelConfig={{
          label: "Code",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.code || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
