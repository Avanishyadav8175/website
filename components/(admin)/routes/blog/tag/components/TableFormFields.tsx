// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type BlogTagDocument } from "@/common/types/documentation/blog/blogTag";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: BlogTagDocument;
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
