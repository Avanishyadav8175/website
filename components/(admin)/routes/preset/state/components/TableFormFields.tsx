// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type StateDocument } from "@/common/types/documentation/presets/state";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: StateDocument;
}) {
  return (
    <>
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Name",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.name || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
