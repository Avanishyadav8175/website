// icons
import { ImagePlus } from "lucide-react";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";
import { useToast } from "@/components/ui/use-toast";

// redux
import {
  // createFolderAction,
  selectFolder
} from "@/store/features/media/folderSlice";

// components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import Input from "@/lib/Forms/Input/Input";
import Select from "@/lib/Forms/FileSelect/ImageSelectInput";
import Submit from "@/lib/Forms/Submit_Reset/Submit";

// types
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type SelectedImages } from "@/lib/Forms/FileSelect/static/types";

export default function ImageForm(
  props: {
    userName?: string;
    onUpload: (images: ImageDocument[]) => void;
  } & (
    | {
        withFolders?: false;
      }
    | {
        withFolders: true;
        selectedFolder: string;
      }
  )
) {
  // props
  const { userName, withFolders, onUpload } = props;

  // hooks
  // const dispatch = useDispatch();
  const { toast } = useToast();

  // redux
  // const folderStatus = useSelector(selectFolder.status);

  const { documents: folders, options: folderOptions } = useSelector((state) =>
    selectFolder.documentList(state, {
      deleted: false,
      sortBy: "label",
      orderBy: "asc"
    })
  );

  // states
  const [folderId, setFolderId] = useState<string>(
    withFolders ? props.selectedFolder : ""
  );
  const [selectedImages, setSelectedImages] = useState<ImageDocument[]>([]);

  // event handlers
  const handleSelectImages = (selectedImages: SelectedImages[]) => {
    const folder =
      withFolders && folderId
        ? folders.find(({ _id }) => _id === folderId)
        : undefined;

    setSelectedImages(
      selectedImages.map(
        ({ alt, extension, width, height, size, data }) =>
          ({
            defaultAlt: alt,
            width,
            height,
            extension,
            data,
            size,
            ...(withFolders
              ? {
                  folderId: folder?._id || "",
                  folderName: folder?.name || ""
                }
              : {}),
            createdBy: userName || "Admin",
            updatedBy: userName || "Admin"
          }) as ImageDocument
      )
    );
  };

  const handleUpload = () => {
    if (!selectedImages.length) {
      toast({
        title: "WARNING",
        description: "No Images Selected",
        variant: "warning"
      });

      return;
    }

    if (withFolders && !folderId) {
      toast({
        title: "WARNING",
        description: "Select Folder",
        variant: "warning"
      });

      return;
    }

    onUpload(selectedImages);
  };

  // side effects
  // useEffect(() => {
  //   if (folderStatus === "idle") {
  //     dispatch(createFolderAction.fetchDocuments());
  //   }
  // }, [folderStatus, dispatch]);

  useEffect(() => {
    if (withFolders) {
      const folder = folderId
        ? folders.find(({ _id }) => _id === folderId)
        : undefined;

      setSelectedImages(
        [...selectedImages].map(
          (selectedImage) =>
            ({
              ...selectedImage,
              ...(withFolders
                ? {
                    folderId: folder?._id || "",
                    folderName: folder?.name || ""
                  }
                : {})
            }) as ImageDocument
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withFolders, folders, folderId]);

  useEffect(() => {
    if ("selectedFolder" in props) {
      setFolderId(props.selectedFolder);
    }
  }, [props]);

  return (
    <Dialog>
      <DialogTrigger>
        <span className="transition-all duration-300 hover:bg-emerald-100/50 hover:text-emerald-700 aspect-square rounded-full">
          <ImagePlus
            strokeWidth={1.5}
            width={24}
            height={24}
          />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:min-w-[600px] md:min-w-[760px] flex flex-col justify-start gap-0 overflow-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <span className="text-2xl font-light pb-3">Upload Image(s)</span>
        <div>
          {withFolders && (
            <Input
              type="dropdown"
              isRequired
              errorCheck={false}
              validCheck={false}
              labelConfig={{
                label: "Folder",
                layoutStyle: "grid grid-cols-[180px_1fr] items-center"
              }}
              name="folder"
              nullOption
              customInitialValuePlaceholderLabel="Select Folder"
              className="my-4"
              options={folderOptions}
              customValue={{
                value: folderId,
                setValue: setFolderId
              }}
            />
          )}
          <Select
            type="image"
            isRequired
            labelConfig={{ label: "Images" }}
            name="images"
            multipleAllowed
            showEmptyFieldError={true}
            emptyFieldErrorText="At least one image is required"
            onImagesSelect={handleSelectImages}
          />
          <div className="flex items-center justify-center *:w-fit gap-x-5">
            <div
              className="hover:underline hover:underline-offset-2 px-4 cursor-pointer"
              onClick={() => {
                setSelectedImages([]);
              }}
            >
              Reset
            </div>
            <DialogClose>
              <Submit
                masked
                label="Upload"
                onClick={handleUpload}
              />
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
