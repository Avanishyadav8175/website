// redux
import {
  createOccasionAction,
  selectOccasion
} from "@/store/features/presets/occasionSlice";

// hooks
import { useDispatch, useSelector } from "@/store/withType";
import { useEffect } from "react";

// components
import Input from "@/lib/Forms/Input/Input";
import TextareaList from "@/components/custom/inputs/textareaList/TextareaList";

// types
import { type NoteGroupDocument } from "@/common/types/documentation/presets/noteGroup";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: NoteGroupDocument;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const occasionStatus = useSelector(selectOccasion.status);

  const { options: occasionOptions } = useSelector((state) =>
    selectOccasion.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // effects
  useEffect(() => {
    if (occasionStatus === "idle") {
      dispatch(createOccasionAction.fetchDocuments());
    }
  }, [occasionStatus, dispatch]);

  return (
    <section className="flex flex-col gap-3 w-[75dvw] p-2">
      <Input
        type="dropdown"
        name="occasion"
        isRequired
        labelConfig={{
          label: "Occasion",
          layoutStyle: ""
        }}
        errorCheck={false}
        validCheck={false}
        nullOption
        customInitialValuePlaceholderLabel="None"
        defaultValue={initialDocument?.occasion as string}
        options={occasionOptions}
      />
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
      <TextareaList
        name="templates"
        label="Templates"
        itemLabel="Template"
        defaultValue={initialDocument?.templates}
      />
    </section>
  );
}
