// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// libraries
import moment from "moment";

// icons
import { Copy, Eye, Trash } from "lucide-react";

// utils
import { copyToClipboard } from "@/common/helpers/copyToClipboard";

// hooks
import { useSelector } from "@/store/withType";
import { useToast } from "@/components/ui/use-toast";

// redux
import { selectFolder } from "@/store/features/media/folderSlice";

// components
import ConfirmDestructiveAction from "@/components/(_common)/Dialogs/ConfirmDestructiveAction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import Image from "next/image";

// types
import { type CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";
import { type IdentificationImageDocument } from "@/common/types/documentation/media/identificationImage";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type IssueImageDocument } from "@/common/types/documentation/media/issueImage";
import { type ReviewImageDocument } from "@/common/types/documentation/media/reviewImage";

export default function ImageDetails({
  manage,
  image,
  showDelete,
  onDeleteImage
}: {
  manage:
    | "image"
    | "customization-image"
    | "identification-image"
    | "issue-image"
    | "review-image";
  image:
    | ImageDocument
    | CustomizationImageDocument
    | IdentificationImageDocument
    | IssueImageDocument
    | ReviewImageDocument;
  showDelete?: boolean;
  onDeleteImage: (imageId: string) => void;
}) {
  // hooks
  const { toast } = useToast();

  // redux states
  const { documents: folders } = useSelector(selectFolder.documentList);

  return (
    <Dialog>
      <DialogTrigger>
        <span className="cursor-pointer p-1">
          <Eye
            strokeWidth={1.5}
            height={21}
            width={21}
            className="cursor-pointer hover:text-sky-300 transition-all duration-300"
          />
        </span>
      </DialogTrigger>
      <DialogContent className="min-w-fit grid grid-cols-1 max-sm:auto-rows-min sm:grid-cols-[1fr_320px] max-sm:h-device max-sm:w-device max-sm:px-2">
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="max-sm:row-start-2 sm:min-w-[380px] md:min-w-[540px] flex flex-col justify-start *:grid *:grid-cols-1 *:max-sm:gap-y-0.5 *:sm:grid-cols-[1fr_3fr_40px] *:items-center *:justify-start *:border-b *:border-charcoal/20 *:py-3 *:sm:py-2 *:px-4 *:sm:px-3 *:transition-all *:duration-300">
          <div className="hover:bg-teal-200 hover:border-transparent hover:rounded-lg">
            <span>URL:</span>
            <span>{image.url}</span>
            <span
              className="cursor-pointer flex items-center justify-start sm:justify-center max-sm:mt-2 w-fit py-2 transition-all duration-300 hover:bg-ash/50 gap-x-3"
              onClick={() => {
                copyToClipboard(image.url)
                  .then(() =>
                    toast({
                      title: "Copied to clipboard",
                      variant: "success"
                    })
                  )
                  .catch((err) =>
                    toast({
                      title: "Couldn't copy",
                      description: "Try again",
                      variant: "destructive"
                    })
                  );
              }}
            >
              <Copy
                strokeWidth={1.5}
                height={18}
                width={18}
              />
              <span className="sm:hidden">Copy</span>
            </span>
          </div>
          {manage === "image" && (
            <>
              <div className="hover:bg-teal-200 hover:border-transparent hover:rounded-lg">
                <span>Alt:</span>
                <span>{(image as ImageDocument)?.alt || "-"}</span>
                <span></span>
              </div>
              <div className="hover:bg-teal-200 hover:border-transparent hover:rounded-lg">
                <span>Folder:</span>
                <span>
                  {folders.find(
                    ({ _id }) => _id === (image as ImageDocument).folderId
                  )?.label || ""}
                </span>
                <span></span>
              </div>
            </>
          )}
          {manage === "customization-image" && (
            <div className="hover:bg-teal-200 hover:border-transparent hover:rounded-lg">
              <span>Content Name:</span>
              <span>
                {(image as CustomizationImageDocument)?.contentName || "-"}
              </span>
              <span></span>
            </div>
          )}
          <div className="hover:bg-teal-200 hover:border-transparent hover:rounded-lg">
            <span>Uploaded By:</span>
            <span>{image?.createdBy || "-"}</span>
            <span></span>
          </div>
          <div className="hover:bg-teal-200 hover:border-transparent hover:rounded-lg">
            <span>Uploaded At:</span>
            <span>{moment(image.createdAt).format("DD MMM YYYY") || "-"}</span>
            <span></span>
          </div>
        </div>
        <div className="max-sm:row-start-1 flex flex-col justify-between items-center gap-3 h-fit">
          <div className="w-auto sm:min-w-full h-40 sm:h-auto">
            <Image
              src={image.url}
              alt={
                manage === "image"
                  ? (image as ImageDocument)?.alt ||
                    (image as ImageDocument).defaultAlt ||
                    "Image"
                  : "Image"
              }
              width={800}
              height={800}
              unoptimized={!OPTIMIZE_IMAGE}
              draggable={false}
              decoding="async"
              className="h-full w-full object-cover object-center rounded-lg"
            />
          </div>
          {showDelete && (
            <ConfirmDestructiveAction
              mode={"trash"}
              trigger={
                <div className="cursor-pointer max-sm:hidden flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-red-500 transition-all duration-300 hover:bg-red-700">
                  <Trash
                    strokeWidth={1.5}
                    width={18}
                    height={18}
                  />
                  <span>Delete</span>
                </div>
              }
              itemName="Image"
              onConfirm={() => {
                onDeleteImage(image._id as string);
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
