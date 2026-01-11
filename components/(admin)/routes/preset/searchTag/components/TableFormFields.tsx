// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type SearchTagDocument } from "@/common/types/documentation/presets/searchTag";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: SearchTagDocument;
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
