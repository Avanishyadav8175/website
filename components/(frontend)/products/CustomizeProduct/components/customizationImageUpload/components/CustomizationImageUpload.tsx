// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// icons
import { ImageUpIcon, Plus, Trash, X } from "lucide-react";

// constants
import { CUSTOMIZATION_IMAGE_MAX_SIZE } from "@/common/constants/imageMaxSize";

// utils
import { getImgData } from "../utils/getImgData";
import { getImageProps } from "../utils/getImageProps";

// hooks
import { useEffect, useId, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// components
import Image from "next/image";

// types
import { type ChangeEvent } from "react";
import {
  type CustomSelectInputType,
  type SelectedImages
} from "../types/types";

export default function CustomizationImageUpload(props: CustomSelectInputType) {
  const {
    customValue,
    isRequired,
    limit,
    name,
    showEmptyFieldError,
    className,
    customStyles,
    isDisabled,
    onImagesSelect
  } = props;

  // hooks
  const { toast } = useToast();

  const inputId = useId();

  const [images, setImages] = useState<SelectedImages[]>([]);
  const [hasChanged, setHasChanged] = useState<boolean>(false);

  const handleMaskedInputClick = () =>
    (document.getElementById(inputId) as HTMLElement).click();

  const handleImgFieldChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length) {
      const imgArr: SelectedImages[] = [];

      for (let i = 0; i < Math.min(limit, files.length); i++) {
        const imgFile = files[i] as File;

        if (imgFile.size <= CUSTOMIZATION_IMAGE_MAX_SIZE) {
          const imgData = await getImgData(imgFile);
          const img = await getImageProps(imgData);

          if (img && imgData) {
            const aboutImg: SelectedImages = {
              alt: imgFile.name
                .split(".")[0]
                .replace(/[^A-Za-z0-9\s]/g, "")
                .replace(/\s+/g, " "),
              data: imgData.split(",")[1],
              extension: imgFile.type.split("/")[1],
              height: img.height,
              width: img.width,
              name: imgFile.name,
              size: imgFile.size,
              url: URL.createObjectURL(imgFile)
            };

            imgArr.push(aboutImg);
          }
        } else {
          toast({
            variant: "warning",
            title: "Warning!",
            description: `"${imgFile.name}" exceeds allowed image size`
          });
        }
      }

      setImages((prev) => [...prev, ...imgArr]);
    }
  };

  const handleImgDelete = (imgSrc: string) =>
    setImages((prev) => prev.filter(({ url }) => url !== imgSrc));

  const deleteAllImages = () => setImages((prev) => []);

  useEffect(() => {
    if (images.length && !hasChanged) setHasChanged((prev) => true);
  }, [hasChanged, images]);

  useEffect(() => {
    onImagesSelect(images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <div
      className={` ${images.length ? "pb-4 pt-2 border" : "border-[3px] border-dashed"} ${showEmptyFieldError ? (images.length || !hasChanged ? "border-charcoal-3/30" : "border-rose-300/80") : "border-charcoal-3/30"}  overflow-hidden rounded-xl mt-3 mb-5 gap-4`}
    >
      {images.length ? (
        <div className="flex flex-col justify-start">
          <div className="flex items-center justify-between px-4 pb-1.5 mb-5 border-b border-charcoal-3/30">
            <span className="text-lg">Selected Images</span>
            <div className="flex items-center justify-end gap-2">
              <div
                className="rounded-full transition-all duration-300 cursor-pointer p-2.5 hover:bg-charcoal-3/10"
                onClick={handleMaskedInputClick}
              >
                <Plus
                  strokeWidth={1.5}
                  height={22}
                  width={22}
                />
              </div>

              <div
                className="rounded-full transition-all duration-300 cursor-pointer p-2.5 hover:bg-rose-100 hover:text-rose-500"
                onClick={deleteAllImages}
              >
                <Trash
                  strokeWidth={1.5}
                  height={22}
                  width={22}
                  className="scale-90"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-4 px-4 py-2">
            {images.map(({ url, alt }, index) => {
              return (
                <div
                  key={index}
                  className="relative rounded-xl border border-charcoal-3/50 flex items-center justify-center aspect-square"
                >
                  <Image
                    className="w-full h-full object-cover object-center rounded-xl"
                    src={url}
                    alt={alt || "Customization Image"}
                    width={500}
                    height={100}
                    decoding="async"
                    draggable={false}
                    unoptimized={!OPTIMIZE_IMAGE}
                  />
                  <div
                    onClick={() => handleImgDelete(url)}
                    className="absolute top-0 right-0 translate-x-[calc(50%_-_3px)] -translate-y-[calc(50%_-_3px)] rounded-full bg-red-600 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700"
                  >
                    <X
                      strokeWidth={1.5}
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          onClick={handleMaskedInputClick}
          className={`cursor-pointer flex items-center justify-center flex-col gap-2 py-14 px-5 w-full text-center ${hasChanged && showEmptyFieldError ? "text-rose-400 bg-rose-50/50" : "text-charcoal-3/50"} ${className || ""}`}
        >
          <ImageUpIcon
            strokeWidth={1.5}
            width={36}
            height={36}
          />
          <span>
            {hasChanged && showEmptyFieldError
              ? props.emptyFieldErrorText
              : "Select Images"}
          </span>
        </div>
      )}
      <SelectInput
        id={inputId}
        name={name}
        isRequired={isRequired}
        isDisabled={isDisabled}
        multipleAllowed={limit > 1}
        handleImgFieldChange={handleImgFieldChange}
      />
    </div>
  );
}

const SelectInput = ({
  name,
  multipleAllowed,
  isRequired,
  isDisabled,
  handleImgFieldChange,
  id
}: {
  name: string;
  multipleAllowed?: boolean;
  isRequired: boolean;
  isDisabled: boolean | undefined;
  id: string;
  handleImgFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => (
  <input
    id={id}
    type="file"
    name={name}
    className="hidden"
    accept={".jpg,.jpeg,.webp,.avif"}
    multiple={multipleAllowed}
    required={isRequired || false}
    disabled={isDisabled || false}
    onChange={handleImgFieldChange}
  />
);
