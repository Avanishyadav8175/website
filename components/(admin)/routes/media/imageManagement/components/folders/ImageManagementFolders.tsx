// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";
import { useToast } from "@/components/ui/use-toast";

// redux
import {
  createFolderAction,
  selectFolder
} from "@/store/features/media/folderSlice";

// components
import ImageManagementFoldersHeader from "./components/ImageManagementFoldersHeader";
import ImageManagementFoldersList from "./components/ImageManagementFoldersList";
import FolderForm from "./components/FolderForm";

// types
import { type FolderDocument } from "@/common/types/documentation/media/folder";
import { type FolderColor } from "./types/folderColor";
import { type PermissionDocument } from "@/common/types/documentation/nestedDocuments/permission";

export default function ImageManagementFolders({
  asPopup,
  userName,
  isSuperAdmin,
  permission,
  showingDeletedImages,
  onChangeSelectedFolderId
}: {
  asPopup?: boolean;
  userName?: string;
  isSuperAdmin?: boolean;
  permission?: PermissionDocument;
  showingDeletedImages?: boolean;
  onChangeSelectedFolderId?: (selectedFolderId: string) => void;
}) {
  const dispatch = useDispatch();

  const { toast } = useToast();

  const folderStatus = useSelector(selectFolder.status);
  const notifications = useSelector(selectFolder.notifications);

  const [showBin, setShowBin] = useState<boolean>(false);

  const { documents: folders } = useSelector((state) =>
    selectFolder.documentList(state, {
      deleted: showBin,
      sortBy: "label",
      orderBy: "asc"
    })
  );

  const folderLayout = "tiles";
  const [currentFolderId, setCurrentFolderId] = useState<string>("");
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");
  const [showFolderForm, setShowFolderForm] = useState<boolean>(false);

  // handlers
  const handleRefresh = () => {
    dispatch(createFolderAction.fetchDocumentList());
  };

  const handleAddFolder = (newFolder: Partial<FolderDocument>) => {
    dispatch(
      createFolderAction.addDocuments({
        newDocuments: newFolder as FolderDocument
      })
    );
  };

  const handleUpdateFolder = (
    folderId: string,
    updatedFolder: Partial<FolderDocument>
  ) => {
    dispatch(
      createFolderAction.updateDocument({
        documentId: folderId,
        updateData: updatedFolder
      })
    );
  };

  const handleUpdateFolderColor = (
    folderId: string,
    colorName: FolderColor
  ) => {
    dispatch(
      createFolderAction.updateDocument({
        documentId: folderId,
        updateData: {
          colorName,
          updatedBy: userName || "Admin"
        }
      })
    );
  };

  const handleDropFolder = (folderId: string) => {
    const folder = folders?.find(({ _id }) => _id === folderId);

    if (!folder) {
      toast({
        title: "ERROR",
        description: "Not Found",
        variant: "destructive"
      });

      return;
    }

    if (folder.imageCount) {
      toast({
        title: "WARNING",
        description: "Non empty folder can't be deleted",
        variant: "warning"
      });

      return;
    }

    dispatch(
      createFolderAction.updateDocument({
        documentId: folderId,
        updateData: { isDeleted: true, updatedBy: userName || "Admin" }
      })
    );
  };

  const handleRestoreFolder = (folderId: string) => {
    dispatch(
      createFolderAction.updateDocument({
        documentId: folderId,
        updateData: { isDeleted: false, updatedBy: userName || "Admin" }
      })
    );
  };

  const handleDeleteFolder = (folderId: string) => {
    dispatch(
      createFolderAction.deleteDocument({
        documentId: folderId
      })
    );
  };

  // side effects
  useEffect(() => {
    if (folderStatus === "idle") {
      dispatch(createFolderAction.fetchDocumentList());
    }
  }, [folderStatus, dispatch]);

  useEffect(() => {
    if (notifications.length) {
      notifications.forEach((notification) => {
        toast({
          title: notification.type.toUpperCase(),
          description: notification.message,
          variant:
            notification.type === "error"
              ? "destructive"
              : notification.type === "success"
                ? "success"
                : "warning"
        });
      });

      dispatch(createFolderAction.resetNotifications());
    }
  }, [notifications, toast, dispatch]);

  useEffect(() => {
    if (
      selectedFolderId &&
      !folders.find(({ _id }) => _id === selectedFolderId)
    ) {
      setSelectedFolderId("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folders]);

  useEffect(() => {
    if (onChangeSelectedFolderId) {
      onChangeSelectedFolderId(selectedFolderId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFolderId]);

  return (
    <>
      <FolderForm
        userName={userName}
        folderId={currentFolderId}
        showForm={showFolderForm}
        onChangeShowForm={setShowFolderForm}
        onAddFolder={handleAddFolder}
        onUpdateFolder={handleUpdateFolder}
      />
      <section className={`gap-3 max-sm:hidden ${asPopup && "pt-4"}`}>
        <ImageManagementFoldersHeader
          showAddIcon={!showBin && Boolean(permission?.create)}
          showBinIcon={!asPopup && Boolean(isSuperAdmin)}
          showBin={showBin}
          folderLayout={folderLayout}
          onRefresh={handleRefresh}
          onAddFolder={() => {
            setCurrentFolderId("");
            setShowFolderForm(true);
          }}
          onToggleShowBin={() => {
            setShowBin((prevShowBin) => !prevShowBin);
          }}
          onToggleFolderLayout={() => { }}
        />
        <ImageManagementFoldersList
          showingDeletedImages={showingDeletedImages}
          showingDelete={showBin}
          showUpdate={!showBin && Boolean(permission?.update)}
          showDelete={
            showBin ? Boolean(isSuperAdmin) : Boolean(permission?.delete)
          }
          asPopup={asPopup}
          folderLayout={folderLayout}
          activeColor={"blue"}
          folders={folders}
          selectedFolderId={selectedFolderId}
          onSelectFolder={setSelectedFolderId}
          onEditFolder={(folderId: string) => {
            setCurrentFolderId(folderId);
            setShowFolderForm(true);
          }}
          onUpdateFolderColor={handleUpdateFolderColor}
          onDeleteFolder={(folderId: string) => {
            if (showBin) {
              handleDeleteFolder(folderId);
            } else {
              handleDropFolder(folderId);
            }
          }}
          onRestoreFolder={handleRestoreFolder}
        />
      </section>
    </>
  );
}
