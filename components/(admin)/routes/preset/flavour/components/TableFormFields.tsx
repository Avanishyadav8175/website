// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type FlavourDocument } from "@/common/types/documentation/presets/flavour";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: FlavourDocument;
}) {
  return (
    <>
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Flavour",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.name || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
