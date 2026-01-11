// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type FoundUsSourceDocument } from "@/common/types/documentation/presets/foundUsSource";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: FoundUsSourceDocument;
}) {
  return (
    <>
      <Input
        type="text"
        name="source"
        isRequired
        labelConfig={{
          label: "Source",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.source || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
