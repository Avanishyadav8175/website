// constants
import { folderColorClasses, folderColors } from "../constants/folderColors";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createFolderAction,
  selectFolder
} from "@/store/features/media/folderSlice";

// components
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Form from "@/lib/Forms/Form/Form";
import Input from "@/lib/Forms/Input/Input";
import { SubmitAndReset } from "@/lib/Forms/layouts/layouts";
import Reset from "@/lib/Forms/Submit_Reset/Reset";
import Submit from "@/lib/Forms/Submit_Reset/Submit";

// types
import { type FolderDocument } from "@/common/types/documentation/media/folder";
import { type FormEntriesType } from "@/common/types/types";

export default function FolderForm({
  userName,
  folderId,
  showForm,
  onChangeShowForm,
  onAddFolder,
  onUpdateFolder
}: {
  userName?: string;
  folderId?: string;
  showForm: boolean;
  onChangeShowForm: (newShowForm: boolean) => void;
  onAddFolder: (folder: Partial<FolderDocument>) => void;
  onUpdateFolder: (
    folderId: string,
    updateData: Partial<FolderDocument>
  ) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const { documents: folders } = useSelector(selectFolder.documentList);

  // variables
  const folder = folders.find(({ _id }) => _id === folderId);

  // states
  const [colorName, setColorName] = useState<string>("blue");

  // side effects
  useEffect(() => {
    if (folderId && !folder) {
      dispatch(
        createFolderAction.fetchOrSelectDocument({ documentId: folderId })
      );
    }
  }, [folderId, folder, dispatch]);

  return (
    <Dialog
      open={showForm}
      onOpenChange={onChangeShowForm}
    >
      <DialogContent>
        <DialogTitle></DialogTitle>
        <div className="text-2xl font-light pb-3">
          {folder ? "Update Folder" : "Add Folder"}
        </div>
        <Form
          onSubmit={(formEntries: FormEntriesType) => {
            const newFolder = {
              label: formEntries.label,
              colorName,
              ...(folder ? {} : { createdBy: userName }),
              updatedBy: userName
            } as Partial<FolderDocument>;

            if (folder) onUpdateFolder(folder._id as string, newFolder);
            else onAddFolder(newFolder);
          }}
        >
          <Input
            type="text"
            name="label"
            isRequired
            errorCheck={false}
            validCheck={false}
            labelConfig={{ label: "Folder Name" }}
            defaultValue={folder?.label || ""}
          />
          <SubmitAndReset position="right">
            <Reset label="Reset" />
            <Submit label={folder ? "Modify" : "Create"} />
          </SubmitAndReset>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
