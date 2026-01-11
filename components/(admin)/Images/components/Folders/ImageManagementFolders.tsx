import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/components/ui/context-menu";
import { FolderPen, LayoutGrid, List, ListRestart, Plus, Trash2 } from "lucide-react";
import FolderSVG from "../../utils/folderSVG";
import { folderColors } from "@/common/constants/adminFolders";
import { Dialog } from "@/components/ui/dialog";
import EditOrAddFolderDialog from "./EditOrAddFolderDialog";
import { ImageManagementFoldersType } from "./static/types";
import { folderColorGenerator } from "@/common/helpers/folderColorGenerator";

export default function ImageManagementFolders({
  folders,
  folderLayout,
  setFolderLayout,
  currColorFilter,
  setCurrColorFilter,
  setFolderDataInQ,
  selectedFolder,
  setSelectedFolder,
  setShowFolderDetails,
  setConfirmDelete,
  showFolderDetails,
  folderDataInQ,
  createOrEditFolder,
  updateFolderColor,
  asPopup
}: ImageManagementFoldersType) {
  return (
    <>
      <div className={`gap-3 max-sm:hidden ${asPopup && "pt-4"}`}>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-light">Folders</span>
          <div className="flex items-center justify-end gap-1 *:p-2.5 *:rounded-full *:transition-all *:duration-300 translate-x-1">
            {/* ADD FOLDER ------------------------------ */}
            <span
              className="hover:bg-emerald-100/30 hover:text-emerald-700 cursor-pointer"
              onClick={() => {
                setFolderDataInQ((prev) => ({ _id: "" }));
                setShowFolderDetails((prev) => true);
              }}
            >
              <Plus
                strokeWidth={1.5}
                width={22}
                height={22}
              />
            </span>

            {/* ALL FOLDERS ------------------------------ */}
            <span
              className="hover:bg-ash/30 cursor-pointer"
              onClick={() => setSelectedFolder((prev) => ({ _id: "" }))}
            >
              <ListRestart
                strokeWidth={1.5}
                width={22}
                height={22}
              />
            </span>

            {/* CHANGE LAYOUT ------------------------------ */}
            <span
              onClick={() =>
                setFolderLayout((prev) => (prev === "list" ? "tiles" : "list"))
              }
              className="hover:bg-ash/30 cursor-pointer"
            >
              {folderLayout === "list" ? (
                <List
                  strokeWidth={1.5}
                  width={21}
                  height={21}
                />
              ) : (
                <LayoutGrid
                  strokeWidth={1.5}
                  width={21}
                  height={21}
                />
              )}
            </span>
          </div>
        </div>
        <div
          className={`relative overflow-y-scroll scrollbar-hide pb-32 ${asPopup ? "max-h-[calc(95dvh_-_66px)]" : "max-h-[calc(100dvh_-_66px)]"} grid ${folderLayout === "tiles" ? "grid-cols-2 gap-2" : "grid-cols-1 gap-0.5"} auto-rows-min transition-all duration-300`}
        >
          {folders
            .filter(({ colorName }) =>
              currColorFilter
                ? folderColorGenerator(colorName) === currColorFilter
                : true
            )
            .map(
              ({ imageCount, colorName, label: folder_name, _id }, index) => (
                <ContextMenu key={index}>
                  <ContextMenuTrigger>
                    <div
                      onClick={() =>
                        setSelectedFolder((prev) =>
                          prev._id === _id
                            ? { _id: "" }
                            : { _id: _id as string }
                        )
                      }
                      className={`transition-all duration-300 cursor-pointer ${folderLayout === "list" ? "grid grid-cols-[30px_1fr_44px] py-2.5 pr-5 pl-4 gap-1 rounded-lg " : "flex flex-col items-center justify-center aspect-square rounded-2xl"} ${_id === selectedFolder._id ? "bg-teal-700 text-white " : "hover:bg-ash/40 text-"}`}
                    >
                      <div className="grid *:row-start-1 *:col-start-1 place-items-center aspect-square w-3/5">
                        <FolderSVG
                          open={_id === selectedFolder._id}
                          type={folderLayout === "list" ? "small" : "large"}
                          color={folderColorGenerator(colorName || "red")}
                        />
                        {folderLayout === "tiles" && (
                          <span className="text-lg font-medium z-10 translate-y-2.5 text-charcoal/95">
                            {imageCount}
                          </span>
                        )}
                      </div>
                      <span
                        className={`truncate ${folderLayout === "tiles" ? "text-base scale-95" : ""}`}
                      >
                        {folder_name}
                      </span>

                      {folderLayout === "list" && (
                        <span className="truncate text-right text-sm flex items-center justify-end">
                          {imageCount}
                        </span>
                      )}
                    </div>
                  </ContextMenuTrigger>

                  <ContextMenuContent className="flex flex-col justify-start p-1.5 pr-2 py-2 rounded-lg border shadow-xl border-ash  ">
                    <div
                      className="grid grid-cols-[24px_1fr] gap-2 py-2 cursor-pointer rounded-md items-center transition-all duration-300 hover:bg-ash/50 px-3"
                      onClick={() => {
                        setFolderDataInQ((prev) => ({ _id: _id as string }));
                        setShowFolderDetails((prev) => true);
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

                    <div
                      onClick={() => {
                        setFolderDataInQ((prev) => ({ _id: _id as string }));
                        setConfirmDelete((prev) => ({
                          mode: "folder",
                          showDialog: true
                        }));
                      }}
                      className="grid grid-cols-[24px_1fr] gap-2 py-2 cursor-pointer rounded-md items-center transition-all duration-300 hover:bg-red-100 text-red-600 px-3"
                    >
                      <span className="flex justify-center">
                        <Trash2
                          strokeWidth={1.5}
                          width={19}
                          height={19}
                        />
                      </span>
                      <span>Drop</span>
                    </div>
                  </ContextMenuContent>
                </ContextMenu>
              )
            )}

          {/* BOTTOM COLOR FILTER */}
          <div
            className={`${folderLayout === "tiles" ? "col-span-2" : ""} z-50 sticky -bottom-28 px-4 py-3.5 rounded-xl grid grid-cols-6 place-items-center gap-4 bg-ivory-1/55 border border-ash-3 backdrop-blur-sm`}
          >
            <span
              onClick={() => setCurrColorFilter((prev) => undefined)}
              className={`${currColorFilter === undefined ? "ring-2 ring-offset-2 ring-charcoal-3/60" : ""} rounded-full w-[18px] aspect-square bg-[conic-gradient(var(--tw-gradient-stops))] from-amber-500 via-blue-600 to-red-500 cursor-pointer transition-all duration-300`}
            />
            {folderColors.map((color, index) => (
              <span
                onClick={() => setCurrColorFilter((prev) => color)}
                className={`${currColorFilter === color ? "ring-2 ring-offset-2 ring-charcoal-3/60" : ""} rounded-full w-[18px] aspect-square ${color} cursor-pointer transition-all duration-300`}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ADD/EDIT FOLDER ======================================== */}
      <Dialog
        open={showFolderDetails}
        onOpenChange={setShowFolderDetails}
      >
        <EditOrAddFolderDialog
          folders={folders}
          targetFolderId={folderDataInQ._id || ""}
          handleFormSubmit={createOrEditFolder}
        />
      </Dialog>
    </>
  );
}
