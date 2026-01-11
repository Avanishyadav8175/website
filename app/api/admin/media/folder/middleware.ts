// libraries
import { v4 as uuid } from "uuid";

// operations
import { folderOperation } from "@/app/api/admin/media/mediaOperation";

// types
import { type FolderDocument } from "@/common/types/documentation/media/folder";

export const generateFolderNameMiddleware = async (
  folder: Partial<FolderDocument>
) => {
  folder.name = uuid();

  return folder as FolderDocument;
};

export const createFolderMiddleware = async (folder: FolderDocument) => {
  await folderOperation({
    type: "add",
    folderName: folder.name
  });

  return folder;
};

export const deleteFolderMiddleware = async (folder: FolderDocument) => {
  await folderOperation({
    type: "delete",
    folderName: folder.name
  });

  return folder;
};
