// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type PaymentCycleDocument } from "@/common/types/documentation/presets/paymentCycle";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: PaymentCycleDocument;
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
        name="days"
        isRequired
        labelConfig={{
          label: "Days",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.days?.toString() || ""}
        errorCheck={false}
        validCheck={false}
      />
    </>
  );
}
