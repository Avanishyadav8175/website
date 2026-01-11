// config
import { OPTIMIZE_IMAGE } from "@/config/image";

// utils
import { getInitialMediaValue } from "./utils/getInitialMediaValue";

// hooks
import { useEffect, useState } from "react";

// components
import Image from "next/image";
import Input from "@/lib/Forms/Input/Input";
import SelectImage from "../image/SelectImage";

// types
import { type ContentMediaDocument } from "@/common/types/documentation/nestedDocuments/contentMedia";

export default function ContentMedia(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    defaultValue?: ContentMediaDocument;
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
        defaultValue?: ContentMediaDocument;
      }
      | {
        value?: ContentMediaDocument;
        defaultValue?: undefined;
        onChangeValue: (newValue: ContentMediaDocument) => void;
      }
    )
) {
  const { name, label, defaultValue } = props;

  const [media, setMedia] = useState<ContentMediaDocument>(
    defaultValue || getInitialMediaValue()
  );

  useEffect(() => {
    if (defaultValue) setMedia(defaultValue);
    else setMedia(getInitialMediaValue());
  }, [defaultValue]);

  return (
    <section className="grid grid-cols-1 gap-3 w-full py-3">
      {label && (
        <div className="text-2xl text-center font-light pb-2">{label}</div>
      )}
      <SelectImage
        name="primaryImage"
        label="First Image"
        isRequired
        value={media.primary as string}
        onChangeValue={(primary: string) => {
          setMedia({
            ...media,
            primary
          } as ContentMediaDocument);
        }}
      />
      <SelectImage
        name="galleryImages"
        label="Other Images"
        selectMultiple
        value={media.gallery as string[]}
        onChangeValue={(gallery: string[]) => {
          setMedia({
            ...media,
            gallery
          } as ContentMediaDocument);
        }}
      />
      {/* {media.video &&
        media.video.length === 43 &&
        media.video.startsWith("https://www.youtube.com/watch?v=") && (
          <Image
            className="ml-[150px] rounded-lg"
            src={`https://img.youtube.com/vi/${media.video.slice(32)}/maxresdefault.jpg`}
            alt={"Video Thumbnail"}
            width={600}
            height={400}
            unoptimized={!OPTIMIZE_IMAGE}
            decoding="async"
          />
        )}
      <Input
        type="text"
        name="video"
        isRequired={false}
        labelConfig={{
          label: "Video"
        }}
        customValue={{
          value: media.video || "",
          setValue: (video) => {
            setMedia({
              ...media,
              video
            } as ContentMediaDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      /> */}
      {/* <SelectImage
        name="reviewImages"
        label="Review Images"
        selectMultiple
        value={media.review as string[]}
        onChangeValue={(review: string[]) => {
          setMedia({
            ...media,
            review
          } as ContentMediaDocument);
        }}
      /> */}
      <input
        className="hidden"
        type="text"
        name={name}
        value={JSON.stringify(media)}
        onChange={() => { }}
      />
    </section>
  );
}
