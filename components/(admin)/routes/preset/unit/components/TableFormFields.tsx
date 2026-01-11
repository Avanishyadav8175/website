// components
import Input from "@/lib/Forms/Input/Input";
import UnitServes from "@/components/custom/inputs/unitServes/UnitServes";

// types
import { type UnitDocument } from "@/common/types/documentation/presets/unit";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: UnitDocument;
}) {
  return (
    <section className="grid grid-cols-1 gap-5">
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
        type="text"
        name="abbr"
        isRequired
        labelConfig={{
          label: "Unit",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.abbr || ""}
        errorCheck={false}
        validCheck={false}
      />
      {/* <UnitServes
        name="serves"
        label="Serving Info"
        defaultValue={initialDocument?.serves}
      /> */}
    </section>
  );
}
