import { FolderPen, Recycle, Trash2 } from "lucide-react";
import { folderColorClasses } from "../constants/folderColors";
import { useSelector } from "@/store/withType";
import { selectImage } from "@/store/features/media/imageSlice";
import ConfirmDestructiveAction from "@/components/(_common)/Dialogs/ConfirmDestructiveAction";
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/components/ui/context-menu";
import FolderIcon from "./FolderIcon";
import { type FolderDocument } from "@/common/types/documentation/media/folder";
import { type FolderColor } from "../types/folderColor";

export default function ImageManagementFoldersList({
  showingDeletedImages,
  showingDelete,
  showUpdate,
  showDelete,
  asPopup,
  folderLayout,
  activeColor,
  folders,
  selectedFolderId,
  onSelectFolder,
  onEditFolder,
  onUpdateFolderColor,
  onDeleteFolder,
  onRestoreFolder
}: {
  showingDeletedImages?: boolean;
  showingDelete: boolean;
  showUpdate: boolean;
  showDelete: boolean;
  asPopup?: boolean;
  folderLayout: "list" | "tiles";
  activeColor: "blue";
  folders: FolderDocument[];
  selectedFolderId: string;
  onSelectFolder: (folderId: string) => void;
  onEditFolder: (folderId: string) => void;
  onUpdateFolderColor: (folderId: string, colorName: FolderColor) => void;
  onDeleteFolder: (folderId: string) => void;
  onRestoreFolder: (folderId: string) => void;
}) {
  const { documents: images } = useSelector((state) =>
    selectImage.documentList(state, {
      deleted: Boolean(showingDeletedImages)
    })
  );

  return (
    <>
      <div
        className={`relative overflow-y-scroll scrollbar-hide pb-20 ${asPopup ? "max-h-[calc(95dvh_-_66px)]" : "h-[calc(100dvh_-_66px)]"} grid ${folderLayout === "tiles" ? "grid-cols-2 gap-2" : "grid-cols-1 gap-0.5"} auto-rows-min transition-all duration-300`}
      >
        {folders.map(({ _id, label, colorName, imageCount }, index) => (
          <ContextMenu key={index}>
            <ContextMenuTrigger>
              <div
                className={`transition-all duration-300 cursor-pointer ${folderLayout === "list" ? "grid grid-cols-[30px_1fr_44px] py-2.5 pr-5 pl-4 gap-1 rounded-lg " : "flex flex-col items-center justify-center aspect-square rounded-2xl"} ${_id === selectedFolderId ? "bg-teal-700 text-white " : "hover:bg-ash/40 text-"}`}
                onClick={() => {
                  if (!showingDelete) {
                    if (_id === selectedFolderId) {
                      onSelectFolder("");
                    } else {
                      onSelectFolder(_id as string);
                    }
                  }
                }}
              >
                <div className="grid *:row-start-1 *:col-start-1 place-items-center aspect-square w-3/5">
                  <FolderIcon
                    open={_id === selectedFolderId}
                    type={folderLayout === "list" ? "small" : "large"}
                    color={folderColorClasses[colorName]}
                  />
                  {folderLayout === "tiles" && (
                    <span
                      className={`text-lg font-medium z-10 translate-y-2.5 ${showingDeletedImages ? "text-red-600" : "text-charcoal/95"}`}
                    >
                      {
                        images.filter(({ folderId }) => folderId === _id)
                          ?.length
                      }
                    </span>
                  )}
                </div>
                <span
                  className={`${folderLayout === "tiles" ? "text-sm text-center line-clamp-2 scale-95" : "line-clamp-1"}`}
                >
                  {label}
                </span>
                {folderLayout === "list" && (
                  <span
                    className={`truncate text-right text-sm flex items-center justify-end ${showingDeletedImages ? "text-red-600" : "text-charcoal/95"}`}
                  >
                    {
                      images.filter(({ folderId }) => folderId === _id)
                        ?.length
                    }
                  </span>
                )}
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="flex flex-col justify-start p-1.5 pr-2 py-2 rounded-lg border shadow-xl border-ash">
              {showUpdate && (
                <>
                  <div
                    className="grid grid-cols-[24px_1fr] gap-2 py-2 cursor-pointer rounded-md items-center transition-all duration-300 hover:bg-ash/50 px-3"
                    onClick={() => {
                      onEditFolder(_id as string);
                    }}
                  >
                    <span className="flex justify-center">
                      <FolderPen
                        strokeWidth={1.5}
                        width={19}
                        height={19}
                      />
                    </span>
                    <span>Edit</span>
                  </div>
                  <div className="h-px w-full bg-charcoal-3/40 my-2" />
                </>
              )}
              {showingDelete && (
                <div
                  className="grid grid-cols-[24px_1fr] gap-2 py-2 cursor-pointer rounded-md items-center transition-all duration-300 hover:bg-ash/50 px-3"
                  onClick={() => {
                    onRestoreFolder(_id as string);
                  }}
                >
                  <span className="flex justify-center">
                    <Recycle
                      strokeWidth={1.5}
                      width={19}
                      height={19}
                    />
                  </span>
                  <span>Restore</span>
                </div>
              )}
              {showDelete && (
                <ConfirmDestructiveAction
                  mode={showingDelete ? "delete" : "trash"}
                  trigger={
                    <div className="grid grid-cols-[24px_1fr] gap-2 py-2 text-left cursor-pointer rounded-md items-center transition-all duration-300 hover:bg-red-100 text-red-600 px-3">
                      <span className="flex justify-center">
                        <Trash2
                          strokeWidth={1.5}
                          width={19}
                          height={19}
                        />
                      </span>
                      <span>{showingDelete ? "Delete" : "Trash"}</span>
                    </div>
                  }
                  itemName="Folder"
                  onConfirm={() => {
                    onDeleteFolder(_id as string);
                  }}
                />
              )}
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
    </>
  );
}
