// components
import Input from "@/lib/Forms/Input/Input";
import RichTextEditor from "@/lib/Forms/RichTextEditor/temp/RichTextEditor";

// types
import { type CancellationPolicyDocument } from "@/common/types/documentation/presets/cancellationPolicy";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: CancellationPolicyDocument;
}) {
  return (
    <section className="flex flex-col gap-5 w-[600px]">
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
      <RichTextEditor
        name="content"
        label="Content"
        isRequired
        width={"600px"}
        defaultValue={initialDocument?.content}
      />
    </section>
  );
}
