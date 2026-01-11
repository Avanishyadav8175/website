// icons
import {
  ArchiveRestore,
  Captions,
  CaptionsOff,
  Recycle,
  RefreshCcw,
  Reply,
  SquareCheckBig,
  SquareMousePointer,
  SquareX,
  Trash,
  Trash2
} from "lucide-react";

// hooks
// import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  // createFolderAction,
  selectFolder
} from "@/store/features/media/folderSlice";

// components
import ImageForm from "./ImageForm";

// types
import { type ImageDocument } from "@/common/types/documentation/media/image";

export default function ImageManagementImagesHeader(
  props: {
    userName?: string;
    asPopup?: boolean;
    manage:
    | "image"
    | "customization-image"
    | "identification-image"
    | "issue-image"
    | "review-image";
    showAddIcon: boolean;
    showAltIcon: boolean;
    showBinIcon: boolean;
    showBin: boolean;
    enableSelection: boolean;
    showAlt: boolean;
    isSelected: boolean;
    onUpload: (images: ImageDocument[]) => void;
    onRefresh: () => void;
    onToggleShowBin: () => void;
    onToggleEnableSelection: () => void;
    onToggleShowAlt: () => void;
    onTrashSelection: () => void;
    onRestoreSelection: () => void;
    onDeleteSelection: () => void;
  } & (
      | {
        withFolders?: false;
      }
      | {
        withFolders: true;
        selectedFolderId: string;
      }
    )
) {
  // props
  const {
    userName,
    asPopup,
    manage,
    withFolders,
    showAddIcon,
    showAltIcon,
    showBinIcon,
    showBin,
    enableSelection,
    showAlt,
    isSelected,
    onUpload,
    onRefresh,
    onToggleShowBin,
    onToggleEnableSelection,
    onToggleShowAlt,
    onTrashSelection,
    onRestoreSelection,
    onDeleteSelection
  } = props;

  // hooks
  // const dispatch = useDispatch();

  // redux states
  // const folderStatus = useSelector(selectFolder.status);

  const { documents: folders } = useSelector(selectFolder.documentList);

  // variables
  const selectedFolder = withFolders
    ? folders.find(({ _id }) => _id === props.selectedFolderId)
    : undefined;

  // side effects
  // useEffect(() => {
  //   if (folderStatus === "idle") {
  //     dispatch(createFolderAction.fetchDocumentList());
  //   }
  // }, [folderStatus, dispatch]);

  return (
    <div
      className={`${asPopup ? "sm:h-[60px]" : "sm:h-[50px]"} sm:max-w-[calc(100dvw_-_637px)] flex items-center justify-between max-1200:pl-3 max-1200:pr-2 max-sm:py-3.5 ${asPopup && "pt-5"}`}
    >
      <span className="text-2xl font-light truncate line-clamp-1">
        {`${withFolders ? (selectedFolder ? `${selectedFolder.label} ` : "All ") : ""}${manage === "image" ? "Images" : manage === "customization-image" ? "Customization Images" : manage === "identification-image" ? "Identification Images" : manage === "issue-image" ? "Issue Images" : "Review Images"}`}
      </span>
      <div
        className={`flex items-center justify-end gap-5 *:cursor-pointer sm:pr-2`}
      >
        {/* {!enableSelection && (
          <span
            className="transition-all duration-300 hover:bg-ash/40 aspect-square rounded-full"
            onClick={onRefresh}
          >
            <RefreshCcw
              strokeWidth={1.5}
              width={24}
              height={24}
            />
          </span>
        )} */}
        {showAddIcon && !showBin && !enableSelection && (
          <ImageForm
            userName={userName}
            withFolders={withFolders}
            selectedFolder={withFolders ? props.selectedFolderId : ""}
            onUpload={onUpload}
          />
        )}
        {!asPopup && isSelected && !showBin && (
          <span
            className={`transition-all duration-300 hover:text-red-800 aspect-square rounded-full`}
            onClick={onTrashSelection}
          >
            <Trash2
              strokeWidth={1.5}
              width={24}
              height={24}
            />
          </span>
        )}
        {!asPopup && isSelected && showBin && (
          <span
            className={`transition-all duration-300 hover:text-green-800 aspect-square rounded-full`}
            onClick={onRestoreSelection}
          >
            <ArchiveRestore
              strokeWidth={1.5}
              width={24}
              height={24}
            />
          </span>
        )}
        {!asPopup && isSelected && showBin && (
          <span
            className={`transition-all duration-300 hover:text-red-800 aspect-square rounded-full`}
            onClick={onDeleteSelection}
          >
            <Trash2
              strokeWidth={1.5}
              width={24}
              height={24}
            />
          </span>
        )}
        {showAltIcon && !showBin && !enableSelection && (
          <span
            className="transition-all duration-300 hover:bg-ash/40 aspect-square rounded-full"
            onClick={onToggleShowAlt}
          >
            {showAlt ? (
              <Captions
                strokeWidth={1.5}
                width={24}
                height={24}
              />
            ) : (
              <CaptionsOff
                strokeWidth={1.5}
                width={24}
                height={24}
              />
            )}
          </span>
        )}
        <span
          className={`transition-all duration-300 ${enableSelection ? "bg-blue-100 text-blue-800" : "hover:bg-ash/40"} aspect-square rounded-full`}
          onClick={onToggleEnableSelection}
        >
          {asPopup ? (
            <SquareCheckBig
              strokeWidth={1.5}
              width={24}
              height={24}
            />
          ) : (
            <SquareMousePointer
              strokeWidth={1.5}
              width={23}
              height={23}
            />
          )}
        </span>
        {showBinIcon && !enableSelection && (
          <span
            className={`transition-all duration-300 ${showBin ? "hover:bg-blue-100/50 hover:text-blue-700" : "hover:bg-rose-100/50 hover:text-rose-700"} aspect-square rounded-full`}
            onClick={onToggleShowBin}
          >
            {showBin ? (
              <Reply
                strokeWidth={1.5}
                width={24}
                height={24}
              />
            ) : (
              <SquareX
                className="text-red-600"
                strokeWidth={1.5}
                width={24}
                height={24}
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
}
