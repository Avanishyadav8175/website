// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type SecurityQuestionDocument } from "@/common/types/documentation/presets/securityQuestion";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: SecurityQuestionDocument;
}) {
  return (
    <>
      <Input
        type="text"
        name="question"
        isRequired
        labelConfig={{
          label: "Question",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.question || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
