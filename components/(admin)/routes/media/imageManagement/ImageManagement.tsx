// constants
import { unauthorizedPermission } from "./constants/unauthorizedPermission";
import { superAdminPermission } from "./constants/superAdminPermission";

// hooks
import { useState } from "react";
import { useAdminAuth } from "@/hooks/auth/useAdminAuth";

// components
import ImageManagementFolders from "./components/folders/ImageManagementFolders";
import ImageManagementImages from "./components/images/ImageManagementImages";
import ImageManagementWrapper from "./components/ImageManagementWrapper";
import { allPermissions } from "@/common/constants/values";

// types

export default function ImageManagement(
  props: {
    manage:
    | "image"
    | "customization-image"
    | "identification-image"
    | "issue-image"
    | "review-image";
  } & (
      | { asPopup?: false }
      | ({
        asPopup: true;
        openPopup: boolean;
        onChangeOpenPopup: (openPopup: boolean) => void;
      } & (
          | {
            selectMultiple?: false;
            onSelect: (selectedImageId: string) => void;
          }
          | {
            selectMultiple: true;
            maxSelections?: number;
            onSelect: (selectedImageIds: string[]) => void;
          }
        ))
    )
) {
  const { manage, asPopup } = props;
  const { data: { userName } } = useAdminAuth();

  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string>("");
  const [showingDeletedImages, setShowingDeletedImages] = useState<boolean>(false);

  const permission = superAdminPermission;

  const handleSelect = () => {
    if (asPopup) {
      if (props.selectMultiple) props.onSelect(selectedImageIds);
      else props.onSelect(selectedImageIds.length ? selectedImageIds[0] : "");

      props.onChangeOpenPopup(false);
    }
  };

  return (
    <ImageManagementWrapper
      asPopup={asPopup}
      open={asPopup ? props.openPopup : false}
      setOpen={asPopup ? props.onChangeOpenPopup : () => { }}
    >
      <div
        className={
          asPopup
            ? `grid grid-cols-1 ${manage === "image" ? "sm:grid-cols-[260px_1fr]" : ""} *:grid *:grid-rows-[auto_1fr] w-max relative pl-5 pr-7`
            : `h-device w-device grid grid-cols-1 ${manage === "image" ? "sm:grid-cols-[260px_1fr]" : ""} *:grid *:grid-rows-[auto_1fr] relative`
        }
      >
        {manage === "image" && (
          <ImageManagementFolders
            asPopup={asPopup}
            userName={userName}
            isSuperAdmin={true}
            permission={allPermissions}
            showingDeletedImages={showingDeletedImages}
            onChangeSelectedFolderId={setSelectedFolderId}
          />
        )}
        <ImageManagementImages
          asPopup={asPopup}
          userName={userName}
          isSuperAdmin={true}
          permission={allPermissions}
          manage={manage}
          withFolders={manage === "image"}
          selectedFolderId={selectedFolderId}
          selectMultiple={asPopup ? props.selectMultiple : undefined}
          maxSelections={asPopup && props.selectMultiple ? props.maxSelections : undefined}
          onChangeShowingDeletedImages={setShowingDeletedImages}
          onSelect={setSelectedImageIds}
        />
        <div
          onClick={handleSelect}
          className={`!z-50 absolute bottom-5 shadow-lg right-5 p-3 px-16 rounded-full bg-green-500 text-white cursor-pointer ${selectedImageIds.length ? "translate-y-0" : "translate-y-20"} transition-all duration-300`}
        >
          DONE
        </div>
      </div>
    </ImageManagementWrapper>
  );
}
