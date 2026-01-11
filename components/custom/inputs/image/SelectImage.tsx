
// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// icons
import {
  MousePointerClick,
  Pen,
  PenLine,
  Plus,
  Trash,
  Trash2,
  X
} from "lucide-react";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createFolderAction,
  selectFolder
} from "@/store/features/media/folderSlice";
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";
import {
  createIdentificationImageAction,
  selectIdentificationImage
} from "@/store/features/media/identificationImageSlice";

// components
import Image from "next/image";
import ImageManagement from "@/components/(admin)/routes/media/imageManagement/ImageManagement";
import LabelWrapper from "@/lib/Forms/_utils/LabelWrapper";

// types
import { type ImageDocument } from "@/common/types/documentation/media/image";
import { type IdentificationImageDocument } from "@/common/types/documentation/media/identificationImage";

export default function SelectImage(
  props: {
    manage?: "image" | "identification-image";
    name: string;
    label?: string;
    disabled?: boolean;
    isBanner?: boolean;
    performReset?: boolean;
    // defaultValue?: string | string[];
    blockNonImageUpdates?: boolean;
    onUpdate?: (selectedIds: string | string[]) => void;
    className?: string;
    wrapperClassName?: string;
    onDeleteImages?: (deletedIds?: string[]) => void;
  } & (
    | {
        isRequired?: undefined;
        labelStyle?: string | undefined;
        layoutStyle?: string | undefined;
      }
    | {
        isRequired?: boolean;
        label: string;
        labelStyle?: string;
        layoutStyle?: string;
      }
  ) &
    (
      | {
          selectMultiple?: false;
          value?: undefined;
          defaultValue: string;
        }
      | {
          selectMultiple?: false;
          value: string;
          defaultValue?: undefined;
          onChangeValue: (newValue: string) => void;
        }
      | {
          selectMultiple: true;
          maxSelections?: number;
          
          value?: undefined;
          defaultValue: string[];
        }
      | {
          selectMultiple: true;
          maxSelections?: number;
          value: string[];
          defaultValue?: undefined;
          onChangeValue: (newValue: string[]) => void;
        }
    )
) {
  // props
  const {
    manage,
    name,
    label,
    isRequired,
    disabled,
    isBanner,
    performReset,
    selectMultiple,
    defaultValue,
    value,
    blockNonImageUpdates,
    labelStyle,
    layoutStyle,
    onUpdate,
    className,
    wrapperClassName
  } = props;

  // hooks
  const dispatch = useDispatch();

  // redux
  const contentImageStatus = useSelector(selectImage.status);

  const { documents: contentImageDocuments } = useSelector(
    selectImage.documentList
  );

  const folderStatus = useSelector(selectFolder.status);

  const identificationImageStatus = useSelector(
    selectIdentificationImage.status
  );

  const { documents: identificationImageDocuments } = useSelector(
    selectIdentificationImage.documentList
  );

  // states
  const [isSelected, setIsSelected] = useState<boolean>(
    defaultValue || value ? true : false
  );
  const [showImageManagement, setShowImageManagement] =
    useState<boolean>(false);
  const [imageIds, setImageIds] = useState<string[]>(
    defaultValue
      ? Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue]
      : value
        ? Array.isArray(value)
          ? value
          : [value]
        : []
  );
  const [images, setImages] = useState<
    ImageDocument[] | IdentificationImageDocument[]
  >([]);

  // variables
  const imageDocuments =
    manage && manage === "identification-image"
      ? identificationImageDocuments
      : contentImageDocuments;

  // utils
  const getImageDocumentFromId = ({
    imageId
  }: {
    imageId: string;
  }): ImageDocument | IdentificationImageDocument | undefined =>
    imageDocuments.find(({ _id }) => _id === imageId);

  // effects
  useEffect(() => {
    if (manage === "image" && contentImageStatus === "idle") {
      dispatch(createImageAction.fetchDocumentList());
    }
  }, [manage, contentImageStatus, dispatch]);

  useEffect(() => {
    if (manage === "image" && folderStatus === "idle") {
      dispatch(createFolderAction.fetchDocumentList());
    }
  }, [manage, folderStatus, dispatch]);

  useEffect(() => {
    if (
      manage === "identification-image" &&
      identificationImageStatus === "idle"
    ) {
      dispatch(createIdentificationImageAction.fetchDocumentList());
    }
  }, [manage, identificationImageStatus, dispatch]);

  useEffect(() => {
    if (defaultValue !== undefined) {
      if (Array.isArray(defaultValue)) {
        if (defaultValue.length > 0) setImageIds(defaultValue);
      } else {
        if (defaultValue.length > 0) setImageIds([defaultValue]);
      }
    }

    if (value !== undefined) {
      if (Array.isArray(value)) {
        setImageIds(value);
      } else {
        setImageIds(value ? [value] : []);
      }
    }
  }, [defaultValue, value]);

  useEffect(() => {
    if (!blockNonImageUpdates) {
      if (manage && manage === "identification-image") {
        setImages(
          imageIds
            .filter((imageId) => getImageDocumentFromId({ imageId }))
            .map(
              (imageId) =>
                getImageDocumentFromId({
                  imageId
                }) as IdentificationImageDocument
            )
        );
      } else {
        setImages(
          imageIds
            .filter((imageId) => getImageDocumentFromId({ imageId }))
            .map(
              (imageId) => getImageDocumentFromId({ imageId }) as ImageDocument
            )
        );
      }
    }
    if ("onChangeValue" in props) {
      if (selectMultiple) {
        props.onChangeValue(imageIds || []);
      } else {
        if (imageIds[0] !== value) {
          props.onChangeValue(imageIds[0] || "");
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageIds, imageDocuments]);

  useEffect(() => {
    if (onUpdate) onUpdate(imageIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageIds]);

  useEffect(() => {
    if (performReset) {
      setImageIds([]);
    }
  }, [performReset]);

  return (
    <LabelWrapper
      label={label}
      isRequired={isRequired}
      isTextArea
      labelStyle={labelStyle}
      layoutStyle={layoutStyle}
    >
      <div
        className={`relative ${images.length ? "border" : "border-[3px] border-dashed"} ${isRequired ? (imageIds.length || !isSelected ? "border-charcoal-3/30" : "border-rose-300/80") : "border-charcoal-3/30"} rounded-xl gap-4 overflow-hidden ${selectMultiple ? "w-full min-h-40" : isBanner ? "w-full min-h-40" : "w-full max-w-40 aspect-square"} ${wrapperClassName || ""}`}
      >
        {images.length ? (
          <div className="flex flex-col justify-start">
            {selectMultiple && (
              <div className="flex items-center justify-between pl-4 pr-2 border-b border-charcoal-3/30">
                <span className="text-base">Selected Images</span>
                <div className="flex items-center justify-end gap-2">
                  <div
                    className="rounded-full transition-all duration-300 cursor-pointer p-2.5 hover:bg-charcoal-3/10"
                    onClick={() => {
                      setShowImageManagement(true);
                    }}
                  >
                    <Plus
                      strokeWidth={1.5}
                      height={22}
                      width={22}
                    />
                  </div>
                  <div
                    className="rounded-full transition-all duration-300 cursor-pointer p-2.5 hover:bg-rose-100 hover:text-rose-500"
                    onClick={() => {
                      setImageIds([]);
                      if (props.onDeleteImages) props.onDeleteImages();
                    }}
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
            )}
            <div
              className={`grid ${selectMultiple ? (isBanner ? "grid-cols-1 gap-4 p-3" : "grid-cols-6 gap-4 p-3") : "grid-cols-1"} ${className || ""}`}
            >
              {images.map((image, index) => {
                return (
                  <div
                    key={index}
                    className={`grid *:col-start-1 *:row-start-1 rounded-xl group ${isBanner ? "" : "aspect-square"}`}
                  >
                    <Image
                      src={image.url}
                      alt={
                        manage && manage === "identification-image"
                          ? "identification image"
                          : (image as ImageDocument)?.alt ||
                            (image as ImageDocument)?.defaultAlt ||
                            "Image"
                      }
                      unoptimized={!OPTIMIZE_IMAGE}
                      decoding="async"
                      draggable={false}
                      height={isBanner ? 300 : 100}
                      width={isBanner ? 300 : 100}
                      className={`w-full h-full object-cover object-center rounded-xl`}
                    />
                    {!disabled && (
                      <div className="flex items-center justify-center gap-5 w-full h-full group-hover:backdrop-blur-[3px] rounded-xl transition-all duration-300">
                        {!selectMultiple && (
                          <PenLine
                            className="p-2 text-blue-600 hover:text-white bg-transparent hover:bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300"
                            strokeWidth={2}
                            width={40}
                            height={40}
                            onClick={() => {
                              setShowImageManagement(true);
                            }}
                          />
                        )}
                        <Trash2
                          className="p-2 text-red-600 hover:text-white bg-transparent hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300"
                          strokeWidth={2}
                          width={40}
                          height={40}
                          onClick={() => {
                            setImageIds((prevImageIds) =>
                              [...prevImageIds].filter(
                                (imageId) => imageId !== image._id
                              )
                            );
                            if (props.onDeleteImages) props.onDeleteImages();
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // NO IMAGE SELECTED YET ---------------------------------------------------------
          <div
            onClick={() => {
              setShowImageManagement(true);
            }}
            className={`cursor-pointer flex items-center justify-center flex-col gap-2 ${selectMultiple ? "mt-20" : ""} ${isBanner ? "pt-10" : "relative top-1/2 -translate-y-1/2 px-5"} w-full text-center ${isRequired && isSelected ? "text-rose-400 bg-rose-50/50" : "text-charcoal-3/50"}`}
          >
            <MousePointerClick
              strokeWidth={1.5}
              width={36}
              height={36}
            />
            <span>Select</span>
          </div>
        )}
      </div>
      <ImageManagement
        manage={manage || "image"}
        asPopup
        openPopup={showImageManagement}
        onChangeOpenPopup={setShowImageManagement}
        selectMultiple={selectMultiple}
        maxSelections={
          props.selectMultiple ? props.maxSelections || undefined : undefined
        }
        onSelect={(selectedImages: string | string[]) => {
          if (!isSelected) {
            setIsSelected(true);
          }

          setImageIds((prevImageIds) =>
            selectMultiple
              ? [...prevImageIds, ...(selectedImages as string[])]
              : [selectedImages as string]
          );
        }}
      />
      <input
        className="hidden"
        type="text"
        name={name}
        required={isRequired}
        value={imageIds.join(",")}
        onChange={() => {}}
      />
    </LabelWrapper>
  );
}
