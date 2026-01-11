// icons
import {
  LayoutGrid,
  List,
  Plus,
  RefreshCcw,
  Reply,
  Trash2
} from "lucide-react";

export default function ImageManagementFoldersHeader({
  showAddIcon,
  showBinIcon,
  showBin,
  folderLayout,
  onRefresh,
  onAddFolder,
  onToggleShowBin,
  onToggleFolderLayout
}: {
  showAddIcon: boolean;
  showBinIcon: boolean;
  showBin: boolean;
  folderLayout: "list" | "tiles";
  onRefresh: () => void;
  onAddFolder: () => void;
  onToggleShowBin: () => void;
  onToggleFolderLayout: () => void;
}) {
  return (
    <section className="flex items-center justify-between pb-3">
      <span className="text-2xl font-light">Folders</span>
      <div className="flex items-center justify-end gap-3 *:rounded-full *:transition-all *:duration-300 translate-x-1">
        {showAddIcon && (
          <span
            className="hover:bg-emerald-100/30 hover:text-emerald-700 cursor-pointer"
            onClick={onAddFolder}
          >
            <Plus
              strokeWidth={1.5}
              width={22}
              height={22}
            />
          </span>
        )}
        {/* {showBinIcon && (
          <span
            className="cursor-pointer"
            onClick={onToggleShowBin}
          >
            {showBin ? (
              <Reply
                className={`${showBin ? "" : "text-neutral-500"}`}
                strokeWidth={1.5}
                width={22}
                height={22}
              />
            ) : (
              <Trash2
                strokeWidth={1.5}
                width={22}
                height={22}
              />
            )}
          </span>
        )}
        <span
          onClick={onToggleFolderLayout}
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
        </span> */}
      </div>
    </section>
  );
}
