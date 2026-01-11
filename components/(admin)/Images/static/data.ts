import { FolderColors } from "@/common/constants/adminFolders";
import { ImageManagementFolderType } from "../ImageManagementDeprecated";
import { FolderDocument } from "@/common/types/documentation/media/folder";

export function generateRandomId(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const DUMMY_FOLDERS: Array<ImageManagementFolderType> = [
  {
    _id: generateRandomId(6),
    label: "Documents",
    imageCount: 120
    // folderColor: "bg-purple-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Photos",
    imageCount: 350
    // folderColor: "bg-blue-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Music",
    imageCount: 75
    // folderColor: "bg-emerald-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Videos",
    imageCount: 60
    // folderColor: "bg-amber-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Downloads",
    imageCount: 90
    // folderColor: "bg-red-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Projects",
    imageCount: 45
    // folderColor: "bg-emerald-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Work",
    imageCount: 200
    // folderColor: "bg-purple-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "School",
    imageCount: 30
    // folderColor: "bg-amber-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Personal",
    imageCount: 80
    // folderColor: "bg-blue-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Finance",
    imageCount: 15
    // folderColor: "bg-red-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Travel",
    imageCount: 50
    // folderColor: "bg-blue-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Recipes",
    imageCount: 25
    // folderColor: "bg-amber-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Books",
    imageCount: 10
    // folderColor: "bg-purple-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Archives",
    imageCount: 5
    // folderColor: "bg-emerald-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Backups",
    imageCount: 100
    // folderColor: "bg-blue-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Templates",
    imageCount: 40
    // folderColor: "bg-red-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Presentations",
    imageCount: 20
    // folderColor: "bg-purple-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Designs",
    imageCount: 70
    // folderColor: "bg-amber-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Scripts",
    imageCount: 35
    // folderColor: "bg-emerald-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Apps",
    imageCount: 25
    // folderColor: "bg-red-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Research",
    imageCount: 55
    // folderColor: "bg-purple-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Favorites",
    imageCount: 15
    // folderColor: "bg-blue-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "OldFiles",
    imageCount: 120
    // folderColor: "bg-emerald-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Miscellaneous",
    imageCount: 85
    // folderColor: "bg-amber-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "Shared",
    imageCount: 30
    // folderColor: "bg-red-600"
  } as FolderDocument,
  {
    _id: generateRandomId(6),
    label: "ClientWork",
    imageCount: 60
    // folderColor: "bg-blue-600"
  } as FolderDocument
];
