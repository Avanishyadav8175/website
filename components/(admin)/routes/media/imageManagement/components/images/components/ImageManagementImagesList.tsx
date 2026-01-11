// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// icons
import { Recycle, Square, SquareCheckBig, Trash } from "lucide-react";

// components
import ConfirmDestructiveAction from "@/components/(_common)/Dialogs/ConfirmDestructiveAction";
import Image from "next/image";
import ImageDetails from "./ImageDetails";
import Input from "@/lib/Forms/Input/Input";

// types
import { type CustomizationImageDocument } from "@/common/types/documentation/media/customizationImage";
import { type IdentificationImageDocument } from "@/common/types/documentation/media/identificationImage";
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type IssueImageDocument } from "@/common/types/documentation/media/issueImage";
import { type ReviewImageDocument } from "@/common/types/documentation/media/reviewImage";

export default function ImageManagementImagesList({
  asPopup,
  manage,
  showUpdate,
  showDelete,
  showingDelete,
  showingAlt,
  enableSelection,
  images,
  selectedImageIds,
  onSelectImage,
  onDeleteImage,
  onRestoreImage,
  onUpdateAlt
}: {
  asPopup?: boolean;
  manage:
    | "image"
    | "customization-image"
    | "identification-image"
    | "issue-image"
    | "review-image";
  showUpdate: boolean;
  showDelete: boolean;
  showingDelete: boolean;
  showingAlt: boolean;
  enableSelection: boolean;
  images:
    | ImageDocument[]
    | CustomizationImageDocument[]
    | IdentificationImageDocument[]
    | IssueImageDocument[]
    | ReviewImageDocument[];
  selectedImageIds: string[];
  onSelectImage: (imageId: string) => void;
  onDeleteImage: (imageId: string) => void;
  onRestoreImage: (imageId: string) => void;
  onUpdateAlt: (imageId: string, alt: string) => void;
}) {
  return (
    <div
      className={`mt-2 sm:max-w-[calc(100dvw_-_640px)] ${asPopup ? "h-[calc(91dvh_-_72px)] sm:h-[calc(91dvh_-_120px)] grid-cols-3 sm:grid-cols-6 pt-3" : "h-[calc(100dvh_-_72px)] sm:h-[calc(100dvh_-_66px)] grid-cols-3 sm:grid-cols-6 "} max-sm:pb-40 overflow-y-scroll scrollbar-hide grid auto-rows-min ${showingAlt ? "gap-1.5 sm:gap-3" : enableSelection ? "gap-2" : "gap-0"} *:border *:overflow-hidden *:relative transition-all duration-300 z-[100]`}
    >
      {images.map((image, index) => {
        const isSelected = selectedImageIds.includes(image._id as string);

        return (
          <div
            className={`flex flex-col justify-start ${showingAlt ? "rounded-lg" : "rounded-none"} overflow-hidden transition-all duration-300`}
            key={index}
          >
            <div className="relative group bg-neutral-400 aspect-square grid *:row-start-1 *:col-start-1">
              {manage === "image" &&
                (image as ImageDocument)?.alt &&
                (image as ImageDocument)?.alt?.length && (
                  <div
                    className="absolute top-0 right-0 bg-amber-500 aspect-square w-5 z-20"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
                  />
                )}
              <div className="w-full h-full overflow-hidden relative z-10 aspect-square">
                <Image
                  className="w-full h-full object-cover object-center"
                  src={image.url}
                  alt={
                    manage === "image"
                      ? (image as ImageDocument)?.alt ||
                        (image as ImageDocument).defaultAlt ||
                        "Image"
                      : "Image"
                  }
                  height={500}
                  width={500}
                  priority
                  decoding="async"
                  draggable={false}
                  unoptimized={!OPTIMIZE_IMAGE}
                />
              </div>
              {!enableSelection && (
                <div className="flex items-center justify-center gap-2.5 z-20 opacity-0 bg-charcoal-3/60 text-white/90 backdrop-blur-sm group-hover:opacity-100 transition-all duration-300">
                  <ImageDetails
                    manage={manage}
                    image={image}
                    showDelete={showDelete}
                    onDeleteImage={onDeleteImage}
                  />
                  {showingDelete && (
                    <span
                      className="cursor-pointer p-1"
                      onClick={() => {
                        onRestoreImage(image._id as string);
                      }}
                    >
                      <Recycle
                        strokeWidth={1.5}
                        height={21}
                        width={21}
                        className="cursor-pointer hover:text-amber-300 transition-all duration-300"
                      />
                    </span>
                  )}
                  {showDelete && (
                    <ConfirmDestructiveAction
                      mode={showingDelete ? "delete" : "trash"}
                      trigger={
                        <span className="cursor-pointer p-1">
                          <Trash
                            strokeWidth={1.5}
                            height={21}
                            width={21}
                            className="cursor-pointer hover:text-rose-300 transition-all duration-300"
                          />
                        </span>
                      }
                      itemName="Image"
                      onConfirm={() => {
                        onDeleteImage(image._id as string);
                      }}
                    />
                  )}
                </div>
              )}
              {enableSelection && (
                <>
                  <div
                    className={`z-50 text-white cursor-pointer flex items-start ring-2 justify-start p-2 ${isSelected ? "" : ""} bg-gradient-to-b from-black/70 to-transparent to-40%`}
                    onClick={() => onSelectImage(image._id as string)}
                  >
                    {isSelected ? (
                      <SquareCheckBig
                        strokeWidth={2}
                        width={24}
                        height={24}
                        className="brightness-200 text-[#becf20]"
                      />
                    ) : (
                      <Square
                        strokeWidth={2}
                        width={24}
                        height={24}
                        className="brightness-200"
                      />
                    )}
                  </div>
                  <div
                    className={`z-20 ${isSelected ? "opacity-100" : "opacity-0"} transition-all duration-200 relative`}
                  >
                    <div className="absolute bg-yellow-500 top-0 left-0 w-full h-1" />
                    <div className="absolute bg-yellow-500 top-0 left-0 h-full w-1" />
                    <div className="absolute bg-yellow-500 bottom-0 right-0 w-full h-1" />
                    <div className="absolute bg-yellow-500 bottom-0 right-0 h-full w-1" />
                  </div>
                </>
              )}
            </div>
            {showUpdate && (
              <div
                className={`py-0 transition-all duration-300 ${showingAlt ? "h-8" : "h-0"}`}
              >
                <Input
                  type="text"
                  errorCheck={false}
                  validCheck={false}
                  isRequired={false}
                  name=""
                  defaultValue={
                    manage === "image"
                      ? (image as ImageDocument)?.alt || ""
                      : ""
                  }
                  onChange={(alt: string) =>
                    onUpdateAlt(image._id as string, alt)
                  }
                  customStyle="bg-neutral-100 text-charcoal-3/80 pl-1 h-8 outline-none border-none flex items-center justify-start text-left w-full overflow-auto transition-all duration-300 focus:bg-teal-200 hover:bg-teal-100"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
