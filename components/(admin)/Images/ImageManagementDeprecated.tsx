import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";
import { useDispatch, useSelector } from "@/store/withType";
import { INITIAL_LIMIT } from "@/common/constants/adminTable";
import { CurrFilterType } from "@/common/types/layouts/admin/adminPanelLayout";
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";
import { FolderColors } from "@/common/constants/adminFolders";
import { FolderColorType, FormEntriesType } from "@/common/types/types";
import ImageManagementFolders from "./components/Folders/ImageManagementFolders";
import ImageManagementImages from "./components/Images/ImageManagementImages";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { SelectedImages } from "@/lib/Forms/FileSelect/static/types";
import {
  createFolderAction,
  selectFolder
} from "@/store/features/media/folderSlice";
import { FolderDocument } from "@/common/types/documentation/media/folder";
import { folderDocColorParser } from "@/common/helpers/folderColorGenerator";
import { useToast } from "@/components/ui/use-toast";
import { ImageManagementType } from "./static/types";
import { Children, SetStateType } from "@/common/types/reactTypes";

export type ImageManagementFolderType = FolderDocument;

export default function ImageManagementDeprecated(props: ImageManagementType) {
  const { asPopup, maxSelections } = props;
  const { toast } = useToast();

  const [folderLayout, setFolderLayout] = useState<"tiles" | "list">("list");
  const [selectedFolder, setSelectedFolder] = useState<{
    _id: string;
  }>({ _id: "" });
  const [folderDataInQ, setFolderDataInQ] = useState<{ _id: string }>({
    _id: ""
  });
  const [currColorFilter, setCurrColorFilter] = useState<FolderColors>();
  const [showImgDetails, setShowImgDetails] = useState<boolean>(false);
  const [openImg, setOpenImg] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<{
    mode: "image" | "folder";
    showDialog: boolean;
  }>({ mode: "folder", showDialog: false });
  const [showFolderDetails, setShowFolderDetails] = useState<boolean>(false);
  const [showAlts, setShowAlts] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [dummy, setDummy] = useState<boolean>(false);
  const [enableSelection, setEnableSelection] = useState<boolean>(
    asPopup ? true : false
  );
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const updateSelectedImgs = (incomingId: string) => {
    const imgSelected = selectedImages.includes(incomingId);
    if (imgSelected)
      setSelectedImages((prev) => prev.filter((id) => id !== incomingId));
    else
      setSelectedImages((prev) =>
        props.asPopup && props.multiSelect
          ? Array.from(new Set([...prev, incomingId]))
          : [incomingId]
      );
  };

  const handleSelectionsDone = () => {
    if (asPopup) {
      if (props.multiSelect) props.onSelectImages(selectedImages);
      else props.onSelectImages(selectedImages.length ? selectedImages[0] : "");

      props.setOpen((prev) => false);
    }
  };

  useEffect(() => {
    if (asPopup)
      if (!props.open) {
        setEnableSelection((prev) => true);
        setSelectedImages((prev) => []);
      }
  }, [asPopup, props]);

  /*####################################################################################
  ############## [ REDUX ] ################################################## */

  // IMAGE REDUX ]============================================
  const imageStatus = useSelector(selectImage.status);
  const { documents: allImgDocuments } = useSelector(selectImage.documentList);

  const {
    options: { filter: availableImgFilters, sort: availableImgSorts },
    default: { sort: defaultImgSortByValue, order: defaultImgOrderByValue }
  } = useSelector((state) =>
    selectImage.query(state, {
      createdBy: [
        ...Array.from(
          new Set(allImgDocuments.map(({ createdBy }) => createdBy))
        )
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(
          new Set(allImgDocuments.map(({ updatedBy }) => updatedBy))
        )
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    })
  );

  // FOLDER REDUX ]============================================
  const folderStatus = useSelector(selectFolder.status);
  const { documents: allFolderDocuments } = useSelector(
    selectFolder.documentList
  );

  const {
    options: { filter: availableFolderFilters, sort: availableFolderSorts },
    default: {
      sort: defaultFolderSortByValue,
      order: defaultFolderOrderByValue
    }
  } = useSelector((state) =>
    selectFolder.query(state, {
      createdBy: [
        ...Array.from(
          new Set(allImgDocuments.map(({ createdBy }) => createdBy))
        )
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(
          new Set(allImgDocuments.map(({ updatedBy }) => updatedBy))
        )
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    })
  );

  const [showTrash, setShowTrash] = useState<{
    folder: boolean;
    image: boolean;
  }>({ folder: false, image: false });
  const [dataInQ, setDataInQ] = useState<{
    folderName: string;
    url: string;
    alt: string;
  }>({ url: "", alt: "", folderName: "" });
  const [imgIdToDelete, setImgIdToDelete] = useState<string>("");
  const [sortBy, setSortBy] = useState<{ folder: string; image: string }>({
    folder: defaultFolderSortByValue,
    image: defaultImgSortByValue
  });
  const [offset, setOffset] = useState<{ folder: number; image: number }>({
    folder: 0,
    image: 0
  });
  const [limit, setLimit] = useState<{ folder: number; image: number }>({
    folder: 1000,
    image: INITIAL_LIMIT * 100
  });
  const [searchKeyword, setSearchKeyword] = useState<{
    folder: string;
    image: string;
  }>({ folder: "", image: "" });
  const [appliedFilter, setAppliedFilter] = useState<{
    folder: CurrFilterType;
    image: CurrFilterType;
  }>();
  const [orderBy, setOrderBy] = useState<{
    folder: "asc" | "desc";
    image: "asc" | "desc";
  }>({
    folder: defaultFolderOrderByValue as "asc" | "desc",
    image: defaultImgOrderByValue as "asc" | "desc"
  });
  const [optedFolder, setOptedFolder] = useState<string>("");
  const [selectedImgs, setSelectedImgs] = useState<ImageDocument[]>([]);

  const dispatch = useDispatch();

  const { count: imgCount, documents: imagesData } = useSelector((state) =>
    selectImage.documentList(state, {
      deleted: showTrash.image,
      sortBy: sortBy.image,
      orderBy: orderBy.image,
      offset: offset.image,
      limit: limit.image,
      filterBy: appliedFilter?.image?.value || "",
      filterKeyword: appliedFilter?.image?.keyword.value || "",
      searchKeyword: searchKeyword.image
    })
  );

  const {
    count: folderCount,
    documents: folderData,
    options: folderOptions
  } = useSelector((state) =>
    selectFolder.documentList(state, {
      deleted: showTrash.folder,
      sortBy: sortBy.folder,
      orderBy: orderBy.folder,
      offset: offset.folder,
      limit: limit.folder,
      filterBy: appliedFilter?.folder?.value || "",
      filterKeyword: appliedFilter?.folder?.keyword.value || "",
      searchKeyword: searchKeyword.folder
    })
  );

  useEffect(() => {
    if (folderStatus === "idle") {
      dispatch(createFolderAction.fetchDocuments());
    }
  }, [folderStatus, dispatch]);

  useEffect(() => {
    if (imageStatus === "idle") {
      dispatch(createImageAction.fetchDocuments());
    }
  }, [imageStatus, dispatch]);

  const processImgToImgDoc = (selectedImgs: SelectedImages[]) => {
    setSelectedImgs((prev) =>
      selectedImgs.map(
        ({ alt, extension, width, height, size, data }) =>
          ({
            defaultAlt: alt,
            width,
            height,
            extension,
            data,
            size,
            folderId: "",
            folderName: ""
          }) as ImageDocument
      )
    );
  };

  /*####################################################################################
  ############## [ CRUD operations ] ################################################## */

  // ================( FOLDERS )=====================================================
  const createOrEditFolder = (formData: FormEntriesType) => {
    const folderId = formData["folder-id"] as string;
    const folderName = formData["folder-name"] as string;
    const folderColor = formData["folder-color"] as FolderColors;

    const folderDoc: FolderDocument = {
      label: folderName,
      colorName: folderDocColorParser(folderColor),
      updatedBy: "Tester",
      createdBy: "Tester"
    } as FolderDocument;

    if (folderId.length) {
      // EDIT ------------------------------
      dispatch(
        createFolderAction.updateDocument({
          documentId: folderId,
          updateData: folderDoc
        })
      );

      toast({
        title: `${folderName} updated`,
        variant: "default"
      });
    } else {
      // CREATE ------------------------------
      dispatch(
        createFolderAction.addDocuments({
          newDocuments: folderDoc
        })
      );

      toast({
        title: "Folder created",
        description: `Name: ${folderName}`,
        variant: "success"
      });
    }

    // after cleanup --------------------
    setShowFolderDetails((prev) => false);
    setFolderDataInQ((prev) => ({ _id: "" }));
  };

  const dropFolder = (id: string) => {
    const folder = folderData.find(({ _id }) => _id === id);

    if (!id.length || !folder) return;
    if (folder.imageCount > 0) alert("Empty this folder to drop it");
    else {
      if (showTrash.folder)
        dispatch(createFolderAction.deleteDocument({ documentId: id }));
      else dispatch(createFolderAction.trashDocument({ documentId: id }));

      toast({
        title: `${folder.label} ${showTrash.folder ? "deleted" : "dropped"}`,
        description: showTrash.folder
          ? "Data cleared successfully"
          : "Find it in Trash section",
        variant: showTrash.folder ? "success" : "default"
      });
    }

    // cleanup ------------------------
    setFolderDataInQ((prev) => ({ _id: "" }));
  };

  const updateFolderColor = (id: string, color: FolderColorType) => {
    dispatch(
      createFolderAction.updateDocument({
        documentId: id,
        updateData: {
          colorName: color
        }
      })
    );

    toast({
      title: `Color updated`,
      description: `New color: ${color[0].toUpperCase + color.substring(1)}`,
      variant: "default"
    });
  };

  // ================( IMAGES )=====================================================
  const uploadNewImage = () => {
    const folderId = optedFolder;

    const selectedFolder = folderData.find(({ _id }) => _id === folderId);

    if (selectedFolder) {
      const updatedImagesDoc: ImageDocument[] = selectedImgs.map(
        (img) =>
          ({
            ...img,
            folderId: selectedFolder._id,
            folderName: selectedFolder.name,
            createdBy: "Tester",
            updatedBy: "Tester"
          }) as ImageDocument
      );

      dispatch(
        createImageAction.addDocuments({
          newDocuments: updatedImagesDoc
        })
      );

      toast({
        title: `Image uploaded`,
        description: `Uploaded to: ${selectedFolder.label} folder`,
        variant: "success"
      });

      setOpenImg((prev) => false);
    }
  };

  const deleteImage = (id: string) => {
    if (showTrash.image)
      dispatch(
        createImageAction.deleteDocument({
          documentId: id as string
        })
      );

    dispatch(
      createImageAction.trashDocument({
        documentId: id as string
      })
    );

    toast({
      title: `Image ${showTrash.image ? "deleted" : "dropped"}`,
      description: showTrash.image
        ? `Data cleared successfully`
        : "Find it in Trash section",
      variant: showTrash.image ? "success" : "default"
    });

    // after delete...
    setShowImgDetails((prev) => false);
    setConfirmDelete((prev) => ({ mode: "image", showDialog: false }));
    setImgIdToDelete((prev) => "");
  };

  const updateImageAlt = (id: string, newAlt: string) => {
    dispatch(
      createImageAction.updateDocument({
        documentId: id,
        updateData: { alt: newAlt }
      })
    );

    toast({
      title: `Alt updated`,
      description: `New alt: ${newAlt.length > 15 ? `${newAlt.substring(0, 15)}...` : newAlt}`,
      variant: "success"
    });
  };

  const restoreImage = (id: string) => {
    dispatch(createImageAction.restoreDocument({ documentId: id }));
    toast({
      title: `Image restored`,
      variant: "success"
    });
  };

  return (
    <ImageManagementWrapper
      asPopup={asPopup || false}
      open={asPopup ? props.open : false}
      setOpen={asPopup ? props.setOpen : setDummy}
    >
      <div
        className={
          asPopup
            ? "grid grid-cols-1 sm:grid-cols-[260px_1fr] *:grid *:grid-rows-[auto_1fr] relative pl-5 pr-7"
            : "h-device w-device grid grid-cols-1 sm:grid-cols-[260px_1fr] *:grid *:grid-rows-[auto_1fr] relative"
        }
      >
        {/* FOLDERS -------------------------------------------------------------- */}
        <ImageManagementFolders
          folders={folderData}
          folderLayout={folderLayout}
          setFolderLayout={setFolderLayout}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          currColorFilter={currColorFilter}
          setCurrColorFilter={setCurrColorFilter}
          setConfirmDelete={setConfirmDelete}
          setFolderDataInQ={setFolderDataInQ}
          setShowFolderDetails={setShowFolderDetails}
          showFolderDetails={showFolderDetails}
          folderDataInQ={folderDataInQ}
          createOrEditFolder={createOrEditFolder}
          updateFolderColor={updateFolderColor}
          asPopup={asPopup || false}
        />

        {/* IMAGES -------------------------------------------------------------- */}
        <ImageManagementImages
          images={imagesData}
          folders={folderData}
          selectedFolder={selectedFolder}
          dataInQ={dataInQ}
          setDataInQ={setDataInQ}
          showImgDetails={showImgDetails}
          setShowImgDetails={setShowImgDetails}
          showEditImgDialog={openImg}
          setShowEditImgDialog={setOpenImg}
          setImgIdToDelete={setImgIdToDelete}
          setConfirmDelete={setConfirmDelete}
          showAlts={showAlts}
          setShowAlts={setShowAlts}
          handleImgSelections={processImgToImgDoc}
          onSubmitImgUpload={uploadNewImage}
          updateAlt={updateImageAlt}
          isOptionsOpen={showOptions}
          toggleOptionsView={() => setShowOptions((prev) => !prev)}
          isTrashOpen={!showTrash.image}
          showTrash={() =>
            setShowTrash((prev) => ({ ...prev, image: !prev.image }))
          }
          folderOptions={folderOptions}
          enableSelection={enableSelection}
          setEnableSelection={setEnableSelection}
          selectedImgs={selectedImages}
          setSelectedImgs={updateSelectedImgs}
          restoreImage={!showTrash.image ? (id: string) => {} : restoreImage}
          asPopup={asPopup || false}
          optedFolder={optedFolder}
          setOptedFolder={(newId: string) => setOptedFolder((prev) => newId)}
        />

        <div
          onClick={handleSelectionsDone}
          className={`!z-50 absolute bottom-5 right-5 p-3 px-16 rounded-full bg-green-500 text-white cursor-pointer ${selectedImages.length ? "translate-y-0" : "translate-y-20"} transition-all duration-300`}
        >
          DONE
        </div>
      </div>

      {/* DELETE IMAGE/FOLDER ======================================== */}
      <Dialog
        open={confirmDelete.showDialog}
        onOpenChange={() =>
          setConfirmDelete((prev) => ({
            ...prev,
            showDialog: !prev.showDialog
          }))
        }
      >
        <DialogContent className="grid grid-cols-[auto_auto_1fr] grid-rows-[auto_auto_auto] rounded-2xl gap-y-1 gap-x-2.5 text-neutral-900 max-w-[92dvw] sm:max-w-[350px]">
          <span className="col-span-3 text-2xl font-light mt-2 mb-0.5">
            {"Confirm Delete?"}
          </span>
          <span className="col-span-3 mb-6">
            {`This action would drop this ${confirmDelete.mode}.`}
          </span>

          <div
            className={`${BUTTON_STYLES.DESTRUCTIVE}`}
            onClick={() => {
              if (confirmDelete.mode === "image") deleteImage(imgIdToDelete);
              else if (confirmDelete.mode === "folder")
                dropFolder(folderDataInQ._id);
              setConfirmDelete((prev) => ({ ...prev, showDialog: false }));
            }}
          >
            Confirm
          </div>

          <div
            className={`px-6 ${BUTTON_STYLES.GHOST}`}
            onClick={() => {
              if (confirmDelete.mode === "image")
                setImgIdToDelete((prev) => "");
              else if (confirmDelete.mode === "folder")
                setFolderDataInQ((prev) => ({ _id: "" }));
              setConfirmDelete((prev) => ({ ...prev, showDialog: false }));
            }}
          >
            Cancel
          </div>
          <span />
        </DialogContent>
      </Dialog>
    </ImageManagementWrapper>
  );
}

const ImageManagementWrapper = ({
  children,
  asPopup,
  open,
  setOpen
}: {
  children: Children;
  asPopup: boolean;
  open: boolean;
  setOpen: SetStateType<boolean>;
}) =>
  asPopup ? (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent className="outline-none min-w-fit p-0 border-none bg-ivory-1 max-h-[95dvh] max-1200:max-w-[90dvw] max-w-1200 rounded-3xl overflow-hidden">
        {children}
      </DialogContent>
    </Dialog>
  ) : (
    <>{children}</>
  );
