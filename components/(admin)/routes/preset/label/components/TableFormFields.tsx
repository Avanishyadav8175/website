// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type LabelDocument } from "@/common/types/documentation/presets/label";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: LabelDocument;
}) {
  return (
    <>
      <Input
        type="text"
        name="label"
        isRequired
        labelConfig={{
          label: "Label",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.label || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
