import { FolderColors } from "@/common/constants/adminFolders";
import { FormEntriesType } from "@/common/types/types";
import { DialogContent } from "@/components/ui/dialog";
import Form from "@/lib/Forms/Form/Form";
import Input from "@/lib/Forms/Input/Input";
import { SubmitAndReset } from "@/lib/Forms/layouts/layouts";
import Reset from "@/lib/Forms/Submit_Reset/Reset";
import Submit from "@/lib/Forms/Submit_Reset/Submit";
import { useEffect, useState } from "react";
import { ImageManagementFolderType } from "../../ImageManagementDeprecated";

export default function EditOrAddFolderDialog({
  targetFolderId,
  folders,
  handleFormSubmit
}: {
  targetFolderId: string;
  folders: ImageManagementFolderType[];
  handleFormSubmit: (formData: FormEntriesType) => void;
}) {
  const [selectedColor, setSelectedColor] = useState<FolderColors>("bg-blue-600");

  useEffect(() => {
    const newColor: FolderColors = "bg-blue-600";
    setSelectedColor((prev) => newColor);
  }, [targetFolderId, folders]);

  return (
    <DialogContent>
      <div className="text-2xl font-light pb-3">
        {targetFolderId.length
          ? `Editing "${folders.find(({ _id }) => targetFolderId === _id)?.label || "__null__"}"`
          : "Add Folder"}
      </div>
      <Form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          errorCheck={false}
          validCheck={false}
          isRequired
          labelConfig={{ label: "Folder Name" }}
          name="folder-name"
          defaultValue={
            targetFolderId.length
              ? folders.find(({ _id }) => targetFolderId === _id)?.label || ""
              : ""
          }
        />
        <input
          type="text"
          name="folder-color"
          readOnly
          value={selectedColor}
          className="hidden"
        />
        <input
          type="text"
          name="folder-id"
          readOnly
          value={targetFolderId}
          className="hidden"
        />
        <SubmitAndReset position="right">
          <Reset label="Reset" />
          <Submit label={targetFolderId.length ? "Save" : "Add Folder"} />{" "}
        </SubmitAndReset>
      </Form>
    </DialogContent>
  );
}
