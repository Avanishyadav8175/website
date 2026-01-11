// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type BlogCategoryDocument } from "@/common/types/documentation/blog/blogCategory";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: BlogCategoryDocument;
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
