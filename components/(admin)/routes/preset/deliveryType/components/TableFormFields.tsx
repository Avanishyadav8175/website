// components
import Input from "@/lib/Forms/Input/Input";
import TimeSlots from "@/components/custom/inputs/timeSlots/TimeSlots";

// types
import { type DeliveryTypeDocument } from "@/common/types/documentation/presets/deliveryType";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: DeliveryTypeDocument;
}) {
  return (
    <section className="flex flex-col gap-3">
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
      <Input
        type="number"
        name="price"
        isRequired
        labelConfig={{
          label: "Price",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.price?.toString() || ""}
        errorCheck={false}
        validCheck={false}
      />
      <TimeSlots
        name="timeSlots"
        label="Time Slots"
        defaultValue={initialDocument?.timeSlots}
      />
    </section>
  );
}
