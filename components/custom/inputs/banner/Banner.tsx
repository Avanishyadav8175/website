// libraries
// Removed mongoose import to prevent client-side build errors

// utils
import { getInitialBannerValue } from "./utils/getInitialBannerValue";

// hooks
import { useEffect, useState } from "react";

// components
import BannerImages from "./components/BannerImages";

// types
import { type BannerDocument } from "@/common/types/documentation/nestedDocuments/banner";
import {
  createFolderAction,
  selectFolder
} from "@/store/features/media/folderSlice";
import {
  createImageAction,
  selectImage
} from "@/store/features/media/imageSlice";
import { useDispatch, useSelector } from "@/store/withType";
import { FormSubSubTitle } from "../title/Form";

export default function Banner(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    defaultValue?: BannerDocument;
  } & (
      | {
        isRequired?: undefined;
      }
      | {
        isRequired?: boolean;
        label: string;
      }
    ) &
    (
      | {
        value?: undefined;
        defaultValue?: BannerDocument;
      }
      | {
        value?: BannerDocument;
        defaultValue?: undefined;
        onChangeValue: (newValue: BannerDocument) => void;
      }
    )
) {
  // props
  const { name, label, isRequired, performReset, defaultValue, value } = props;

  // hooks
  const dispatch = useDispatch();

  // redux
  const imageStatus = useSelector(selectImage.status);

  const folderStatus = useSelector(selectFolder.status);

  // states
  const [banner, setBanner] = useState<BannerDocument>(
    defaultValue || getInitialBannerValue()
  );

  // variables
  const returnValue = {
    ...banner,
    images: [...banner.images]
      .map((bannerImage) => {
        const validBannerImage = { ...bannerImage };

        if (!validBannerImage._id || typeof validBannerImage._id !== 'string' || validBannerImage._id.length !== 24) {
          delete validBannerImage._id;
        }

        return validBannerImage;
      })
      .filter(({ desktop, mobile }) => desktop && mobile)
  };

  // effects
  useEffect(() => {
    if (defaultValue) {
      setBanner(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    if (imageStatus === "idle") {
      dispatch(createImageAction.fetchDocumentList());
    }
  }, [imageStatus, dispatch]);

  useEffect(() => {
    if (folderStatus === "idle") {
      dispatch(createFolderAction.fetchDocumentList());
    }
  }, [folderStatus, dispatch]);

  return (
    <>
      {label && (
        <FormSubSubTitle subtitle={label} />
      )}
      {/* <div className="grid grid-cols-[repeat(2,auto)] grid-rows-3 gap-3  *:bg-teal-100/80 *:border *:border-teal-200 *:rounded-xl *:px-4 *:py-2.5">
        <Toggle
          name="autoScroll"
          label={"Auto Scroll"}
          isActive={banner.autoScroll}
          onChangeIsActive={(newAutoScroll) => {
            setBanner(
              (prevBanner) =>
                ({
                  ...prevBanner,
                  autoScroll: newAutoScroll,
                  ...(!newAutoScroll && prevBanner.loopInfinitely
                    ? { loopInfinitely: false }
                    : {})
                }) as BannerDocument
            );
          }}
          activeColor={{ bg: "bg-teal-300", bubble: "bg-teal-800" }}
        />
        <Input
          type="number"
          name="scrollInterval"
          isRequired={false}
          className="h-[90px]"
          labelConfig={{
            label: "Scroll Interval (in sec)",
            layoutStyle: "row-span-3 space-y-2"
          }}
          placeholder="7"
          customValue={{
            value: banner.scrollInterval
              ? banner.scrollInterval.toString()
              : "",
            setValue: (newScrollInterval) => {
              setBanner(
                (prevBanner) =>
                  ({
                    ...prevBanner,
                    scrollInterval: Number(newScrollInterval)
                  }) as BannerDocument
              );
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        <Toggle
          name="loopInfinitely"
          label={"Loop Infinitely"}
          isActive={banner.loopInfinitely}
          onChangeIsActive={(newLoopInfinitely) => {
            setBanner(
              (prevBanner) =>
                ({
                  ...prevBanner,
                  loopInfinitely: newLoopInfinitely,
                  ...(newLoopInfinitely && !banner.autoScroll
                    ? { autoScroll: true }
                    : {})
                }) as BannerDocument
            );
          }}
          activeColor={{ bg: "bg-teal-300", bubble: "bg-teal-800" }}
        />
        <Toggle
          name="showIndicators"
          label={"Show Indicators"}
          isActive={banner.showIndicators}
          onChangeIsActive={(newShowIndicators) => {
            setBanner(
              (prevBanner) =>
                ({
                  ...prevBanner,
                  showIndicators: newShowIndicators
                }) as BannerDocument
            );
          }}
          activeColor={{ bg: "bg-teal-300", bubble: "bg-teal-800" }}
        />
      </div> */}
      <BannerImages
        images={banner.images}
        onChangeImages={(newImages) => {
          setBanner(
            (prevBanner) =>
              ({
                ...prevBanner,
                images: newImages
              }) as BannerDocument
          );
        }}
      />
      <input
        className="hidden"
        type="text"
        name={name}
        value={returnValue.images.length ? JSON.stringify(returnValue) : ""}
        onChange={() => { }}
      />
    </>
  );
}
