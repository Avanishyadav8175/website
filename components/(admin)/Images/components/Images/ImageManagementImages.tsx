import {
  ArchiveX,
  Captions,
  CaptionsOff,
  Copy,
  Eye,
  ImagePlus,
  Reply,
  RotateCcw,
  Square,
  SquareCheckBig,
  Trash
} from "lucide-react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ImageManagementImagesType } from "./static/types";
import Input from "@/lib/Forms/Input/Input";
import Submit from "@/lib/Forms/Submit_Reset/Submit";
import Select from "@/lib/Forms/FileSelect/ImageSelectInput";
import { copyToClipboard } from "@/common/helpers/copyToClipboard";
import { useToast } from "@/components/ui/use-toast";
import { OPTIMIZE_IMAGE } from "@/config/image";

export default function ImageManagementImages({
  images,
  folders,
  selectedFolder,
  setConfirmDelete,
  setImgIdToDelete,
  showImgDetails,
  setShowImgDetails,
  dataInQ,
  setDataInQ,
  showEditImgDialog,
  setShowEditImgDialog,
  showAlts,
  setShowAlts,
  isOptionsOpen,
  toggleOptionsView,
  isTrashOpen,
  showTrash,
  handleImgSelections,
  onSubmitImgUpload,
  updateAlt,
  folderOptions,
  restoreImage,
  asPopup,
  selectedImgs,
  setSelectedImgs,
  enableSelection,
  setEnableSelection,
  optedFolder,
  setOptedFolder
}: ImageManagementImagesType) {
  const { toast } = useToast();

  return (
    <>
      <div
        className={`grid grid-cols-1 ${asPopup ? "sm:grid-cols-[60px_1fr]" : "sm:grid-cols-[44px_1fr]"}`}
      >
        <div className="row-span-2 grid place-items-stretch justify-center max-sm:hidden">
          <div className="w-px bg-charcoal-3/25" />
        </div>
        <div
          className={`${asPopup ? "sm:h-[60px]" : "sm:h-[50px]"} sm:max-w-[calc(100dvw_-_397px)] flex items-center justify-between max-1200:pl-3 max-1200:pr-2 max-sm:py-3.5 ${asPopup && "pt-5"}`}
        >
          <span className="text-2xl font-light sm:-translate-y-1 truncate line-clamp-1">
            {selectedFolder._id.length
              ? folders.find(({ _id }) => _id === selectedFolder._id)?.label ||
                "All"
              : "All"}
            {" Images"}
          </span>
          <div
            className={`flex items-center justify-end gap-2 *:cursor-pointer sm:-translate-y-1 sm:pr-2 `}
          >
            {/* add new image ---------------------------------------- */}
            <span
              className="transition-all duration-300 hover:bg-emerald-100/50 hover:text-emerald-700 p-2.5 aspect-square rounded-full"
              onClick={() => setShowEditImgDialog((prev) => true)}
            >
              <ImagePlus
                strokeWidth={1.5}
                width={20}
                height={20}
              />
            </span>

            {/* enable selection ---------------------------------------- */}
            {asPopup && (
              <span
                className={`transition-all duration-300 ${enableSelection ? "bg-blue-100 text-blue-800" : "hover:bg-ash/40"}  p-2.5 aspect-square rounded-full`}
                onClick={() => setEnableSelection((prev) => !prev)}
              >
                <SquareCheckBig
                  strokeWidth={1.5}
                  width={20}
                  height={20}
                />
              </span>
            )}

            {/* show alts ---------------------------------------- */}
            <span
              className="transition-all duration-300 hover:bg-ash/40 p-2.5 aspect-square rounded-full"
              onClick={() => setShowAlts((prev) => !prev)}
            >
              {showAlts ? (
                <Captions
                  strokeWidth={1.5}
                  width={20}
                  height={20}
                />
              ) : (
                <CaptionsOff
                  strokeWidth={1.5}
                  width={20}
                  height={20}
                />
              )}
            </span>

            {/* filters ---------------------------------------- */}
            {/* <span
              className={`transition-all duration-300 ${isOptionsOpen ? "bg-ash/40" : "hover:bg-ash/40"} p-2.5 aspect-square rounded-full`}
              onClick={toggleOptionsView}
            >
              <SlidersHorizontal
                strokeWidth={1.5}
                width={20}
                height={20}
                className="scale-90"
              />
            </span> */}

            {/* image trash ---------------------------------------- */}
            <span
              className={`transition-all duration-300 ${!isTrashOpen ? "hover:bg-blue-100/50 hover:text-blue-700" : "hover:bg-rose-100/50 hover:text-rose-700"} p-2.5 aspect-square rounded-full`}
              onClick={showTrash}
            >
              {isTrashOpen ? (
                <ArchiveX
                  strokeWidth={1.5}
                  width={20}
                  height={20}
                />
              ) : (
                <Reply
                  strokeWidth={1.5}
                  width={20}
                  height={20}
                />
              )}
            </span>
          </div>
        </div>

        {/* images area --------------------------------------------------------------- */}
        <div
          className={`sm:max-w-[calc(100dvw_-_397px)] ${asPopup ? "max-h-[calc(95dvh_-_72px)] sm:max-h-[calc(95dvh_-_66px)] grid-cols-3 sm:grid-cols-6 pt-3" : "max-h-[calc(100dvh_-_72px)] sm:max-h-[calc(100dvh_-_66px)] grid-cols-3 sm:grid-cols-8 "}  max-sm:pb-40 overflow-y-scroll scrollbar-hide grid auto-rows-min ${showAlts ? "gap-1.5 sm:gap-3" : enableSelection ? "gap-2" : "gap-0"} *:border *:overflow-hidden *:relative transition-all duration-300`}
        >
          {images
            .filter(({ folderId }) =>
              selectedFolder._id.length ? folderId === selectedFolder._id : true
            )
            .map(({ url, alt, defaultAlt, _id, folderId }, index) => {
              const imgSelected: boolean = selectedImgs.includes(_id as string);

              return (
                <div
                  className={`flex flex-col justify-start ${showAlts ? "rounded-lg" : "rounded-none"} overflow-hidden transition-all duration-300`}
                  key={index}
                >
                  <div className="relative group bg-neutral-400 aspect-square grid *:row-start-1 *:col-start-1">
                    {alt && alt.length && (
                      <div
                        className="absolute top-0 right-0 bg-amber-500 aspect-square w-5 z-20"
                        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
                      />
                    )}
                    <div className="w-full h-full overflow-hidden relative z-10 aspect-square">
                      <Image
                        src={url}
                        alt={alt || defaultAlt || ""}
                        height={100}
                        width={100}
                        priority
                        decoding="async"
                        draggable={false}
                        className="w-full h-full object-cover object-center"
                        unoptimized={!OPTIMIZE_IMAGE}
                      />
                    </div>
                    {!enableSelection && (
                      <div className="flex items-center justify-center gap-2.5 z-20 opacity-0 bg-charcoal-3/60 text-white/90 backdrop-blur-sm group-hover:opacity-100 transition-all duration-300">
                        <span
                          className="cursor-pointer p-1"
                          onClick={() => {
                            setDataInQ((prev) => ({
                              alt,
                              folderName:
                                folders.find(({ _id }) => _id === folderId)
                                  ?.label || "-",
                              url
                            }));
                            setShowImgDetails((prev) => true);
                          }}
                        >
                          <Eye
                            strokeWidth={1.5}
                            height={21}
                            width={21}
                            className="cursor-pointer hover:text-sky-300 transition-all duration-300"
                          />
                        </span>

                        {!isTrashOpen && (
                          <span
                            className="cursor-pointer p-1"
                            onClick={() => restoreImage(_id as string)}
                          >
                            <RotateCcw
                              strokeWidth={1.5}
                              height={21}
                              width={21}
                              className="cursor-pointer hover:text-amber-300 transition-all duration-300"
                            />
                          </span>
                        )}

                        <span
                          className="cursor-pointer p-1"
                          onClick={() => {
                            setImgIdToDelete((prev) => _id as string);
                            setConfirmDelete((prev) => ({
                              mode: "image",
                              showDialog: true
                            }));
                          }}
                        >
                          <Trash
                            strokeWidth={1.5}
                            height={21}
                            width={21}
                            className="cursor-pointer hover:text-rose-300 transition-all duration-300"
                          />
                        </span>
                      </div>
                    )}
                    {enableSelection && (
                      <>
                        <div
                          onClick={() => setSelectedImgs(_id as string)}
                          className={`z-50 text-white cursor-pointer flex items-start ring-2 justify-start p-2 ${imgSelected ? "" : ""} bg-gradient-to-b from-black/70 to-transparent to-40%`}
                        >
                          {imgSelected ? (
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
                          className={`z-20 ${imgSelected ? "opacity-100" : "opacity-0"} transition-all duration-200 relative`}
                        >
                          <div className="absolute bg-yellow-500 top-0 left-0 w-full h-1" />
                          <div className="absolute bg-yellow-500 top-0 left-0 h-full w-1" />
                          <div className="absolute bg-yellow-500 bottom-0 right-0 w-full h-1" />
                          <div className="absolute bg-yellow-500 bottom-0 right-0 h-full w-1" />
                        </div>
                      </>
                    )}
                  </div>

                  {/* show alt text box ------------------------------- */}
                  <div
                    className={`py-0 transition-all duration-300 ${showAlts ? "h-8" : "h-0"}`}
                  >
                    <Input
                      type="text"
                      errorCheck={false}
                      validCheck={false}
                      isRequired={false}
                      name=""
                      defaultValue={alt || ""}
                      onChange={(val: string) => updateAlt(_id as string, val)}
                      customStyle="bg-neutral-100 text-charcoal-3/80 pl-1 h-8 outline-none border-none flex items-center justify-start text-left w-full overflow-auto transition-all duration-300 focus:bg-teal-200 hover:bg-teal-100"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* ===========[ IMAGE DETAILS DIALOG ]======================================================================= */}
      <Dialog
        open={showImgDetails}
        onOpenChange={setShowImgDetails}
      >
        <DialogContent className="min-w-fit grid grid-cols-1 max-sm:auto-rows-min sm:grid-cols-[1fr_320px] max-sm:h-device max-sm:w-device max-sm:px-2">
          <div className="max-sm:row-start-2 sm:min-w-[380px] md:min-w-[540px] flex flex-col justify-start *:grid *:grid-cols-1 *:max-sm:gap-y-0.5 *:sm:grid-cols-[1fr_3fr_40px] *:items-center *:justify-start *:border-b *:border-charcoal/20 *:py-3 *:sm:py-2 *:px-4 *:sm:px-3 *:transition-all *:duration-300">
            <div className="hover:bg-teal-200 hover:border-transparent hover:rounded-lg">
              <span>URL:</span>
              <span>{dataInQ.url}</span>
              <span
                className="cursor-pointer flex items-center justify-start sm:justify-center max-sm:mt-2 w-fit py-2 transition-all duration-300 hover:bg-ash/50 gap-x-3"
                onClick={() => {
                  copyToClipboard(dataInQ.url)
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
            <div className="hover:bg-teal-200 hover:border-transparent hover:rounded-lg">
              <span>alt:</span>
              <span>{dataInQ.alt || "-"}</span>
              <span></span>
            </div>
            <div className="hover:bg-teal-200 hover:border-transparent hover:rounded-lg">
              <span>Folder:</span>
              <span>{dataInQ.folderName}</span>
              <span></span>
            </div>
          </div>
          <div className="max-sm:row-start-1 flex flex-col justify-between items-center gap-3 h-fit">
            <div className="w-auto sm:min-w-full h-40 sm:h-auto">
              <Image
                src={dataInQ.url}
                alt={dataInQ.alt || "Image"}
                width={800}
                height={800}
                unoptimized={!OPTIMIZE_IMAGE}
                draggable={false}
                decoding="async"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div
              onClick={() =>
                setConfirmDelete((prev) => ({
                  mode: "image",
                  showDialog: true
                }))
              }
              className="cursor-pointer max-sm:hidden flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-red-500 transition-all duration-300 hover:bg-red-700"
            >
              <Trash
                strokeWidth={1.5}
                width={18}
                height={18}
              />
              <span>Delete</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===========[ ADD/EDIT IMAGE DIALOG ]======================================================================= */}
      <Dialog
        open={showEditImgDialog}
        onOpenChange={setShowEditImgDialog}
      >
        <DialogContent className="sm:min-w-[600px] md:min-w-[760px] flex flex-col justify-start gap-0  overflow-auto scrollbar-hide">
          <span className="text-2xl font-light pb-3">Upload Image(s)</span>

          <div>
            <Input
              type="dropdown"
              errorCheck={false}
              validCheck={false}
              isRequired
              labelConfig={{
                label: "Associated Folder",
                layoutStyle: "grid grid-cols-[180px_1fr] items-center"
              }}
              name="associated-folder"
              nullOption
              customInitialValuePlaceholderLabel="Select Folder"
              className="my-4"
              options={folderOptions}
              customValue={{
                value: optedFolder,
                setValue: setOptedFolder
              }}
            />

            <Select
              type="image"
              isRequired
              labelConfig={{ label: "Images" }}
              name="images"
              multipleAllowed
              showEmptyFieldError={true}
              emptyFieldErrorText="Atleast one image is required"
              onImagesSelect={handleImgSelections}
            />

            <div className="flex items-center justify-center *:w-fit gap-x-5">
              <Submit
                masked
                label="Upload"
                onClick={onSubmitImgUpload}
              />
              <div
                className="hover:underline hover:underline-offset-2 px-4 cursor-pointer"
                onClick={() => {
                  handleImgSelections([]);
                }}
              >
                Reset
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
