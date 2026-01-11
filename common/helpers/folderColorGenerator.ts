import { FolderColors } from "../constants/adminFolders";
import { FolderColorType } from "../types/types";

export const folderColorGenerator = (color: FolderColorType): FolderColors =>
  color === "amber"
    ? "bg-amber-600"
    : color === "blue"
      ? "bg-blue-600"
      : color === "jade"
        ? "bg-emerald-600"
        : color === "purple"
          ? "bg-purple-600"
          : "bg-red-600";

export const folderDocColorParser = (color: FolderColors): FolderColorType =>
  color === "bg-amber-600"
    ? "amber"
    : color === "bg-blue-600"
      ? "blue"
      : color === "bg-emerald-600"
        ? "jade"
        : color === "bg-purple-600"
          ? "purple"
          : "red";
