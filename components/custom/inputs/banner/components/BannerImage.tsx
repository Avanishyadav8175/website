// icons
import { X } from "lucide-react";

// components
import Input from "@/lib/Forms/Input/Input";
import SelectImage from "../../image/SelectImage";

// types
import { type BannerImageDocument } from "@/common/types/documentation/nestedDocuments/bannerImage";

export default function BannerImage({
  index,
  image,
  onChangeImage,
  onDeleteImage
}: {
  index: number;
  image: BannerImageDocument;
  onChangeImage: (newImage: BannerImageDocument) => void;
  onDeleteImage: () => void;
}) {
  return (
    <section className="flex flex-col gap-5 bg-ash/40 border border-ash relative rounded-2xl p-5">
      <div
        onClick={onDeleteImage}
        className="rounded-full bg-red-600 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700 absolute top-0 -translate-y-[calc(50%_-_4px)] right-0 translate-x-[calc(50%_-_4px)] z-10"
      >
        <X
          strokeWidth={1.5}
          width={16}
          height={16}
        />
      </div>
      <section className="grid grid-cols-2 gap-x-4 gap-y-2 grid-rows-[repeat(2,auto)]">
        <SelectImage
          name="desktop"
          label="Desktop"
          isRequired
          isBanner
          labelStyle="text-center"
          layoutStyle="flex-col space-y-2"
          value={image.desktop as string}
          onChangeValue={(desktop: string) => {
            onChangeImage({
              ...image,
              desktop
            } as BannerImageDocument);
          }}
        />
        <SelectImage
          name="mobile"
          label="Mobile"
          labelStyle="text-center"
          layoutStyle="flex-col space-y-2"
          isRequired
          isBanner
          value={image.mobile as string}
          onChangeValue={(mobile: string) => {
            onChangeImage({
              ...image,
              mobile
            } as BannerImageDocument);
          }}
        />
        <Input
          type="text"
          name="path"
          isRequired={false}
          labelConfig={{
            label: "Path",
            layoutStyle: "col-span-2 space-y-1"
          }}
          customValue={{
            value: image.path || "",
            setValue: (path: string) => {
              onChangeImage({
                ...image,
                path
              } as BannerImageDocument);
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
      </section>
    </section>
  );
}
