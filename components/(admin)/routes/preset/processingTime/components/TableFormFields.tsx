// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type ProcessingTimeDocument } from "@/common/types/documentation/presets/processingTime";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: ProcessingTimeDocument;
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
      <Input
        type="number"
        name="hours"
        isRequired
        labelConfig={{
          label: "Hours",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.hours?.toString() || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
