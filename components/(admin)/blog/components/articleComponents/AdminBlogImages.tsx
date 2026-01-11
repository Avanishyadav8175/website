
import { ImageDocument } from "@/common/types/documentation/media/image";
import { BlogLayoutImageDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutImage";
import ImageManagementDeprecated from "@/components/(admin)/Images/ImageManagementDeprecated";
import ImageManagement from "@/components/(admin)/routes/media/imageManagement/ImageManagement";
import { OPTIMIZE_IMAGE } from "@/config/image";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { memo, useEffect, useState } from "react";

const getImgDocFromIds = (
  ids: string[],
  images: ImageDocument[]
): ImageDocument[] => {
  if (ids && ids.length) {
    const imagesList: ImageDocument[] = ids.map((strId) => {
      const doc: ImageDocument = images.find(
        ({ _id }) => _id === strId
      ) as ImageDocument;
      return doc;
    });

    return imagesList;
  }
  return [];
};

const AdminBlogImages = memo(function BlogImages({
  data,
  images,
  onEdits
}: {
  data: BlogLayoutImageDocument;
  images: ImageDocument[];
  onEdits: (updatedImages: BlogLayoutImageDocument) => void;
}) {
  const [totalImgsSelected, setTotalImgsSelected] = useState<number>(0);
  const [shape, setShape] = useState<BlogLayoutImageDocument["shape"]>(
    data.shape && data.shape.length ? data.shape : "default"
  );
  const [layout, setLayout] = useState<BlogLayoutImageDocument["style"]>(
    data.style && data.style.length ? data.style : ""
  );
  const [imgs, setImgs] = useState<ImageDocument[]>(
    getImgDocFromIds(
      // @ts-ignore
      Array.isArray(data)
        ? (data[0].images as string[])
        : (data.images as string[]),
      images
    ) || []
  );
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const updateSelections = () => {
    const updatedSelections: BlogLayoutImageDocument = {
      shape,
      style: layout || "",
      images: imgs
    } as BlogLayoutImageDocument;

    onEdits(updatedSelections);
  };

  const handleImageSelections = (imgs: string[]) => {
    const prevTotalImgs = totalImgsSelected;
    const imagesList = getImgDocFromIds(imgs, images);

    setTotalImgsSelected((prev) => imgs.length);
    setImgs((prev) => [...prev, ...imagesList]);

    if (prevTotalImgs !== imgs.length) {
      if (imgs.length === 2) setLayout((prev) => "duo-default");
      else if (imgs.length === 3) setLayout((prev) => "trio-h");
      else if (imgs.length === 4) setLayout((prev) => "quad-default");
      else if (imgs.length === 1) setLayout((prev) => "");
    }
  };

  useEffect(() => {
    updateSelections();
    setTotalImgsSelected((prev) => imgs.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape, layout, imgs]);

  useEffect(() => {
    /* if (data) {
      if (data.shape) setShape((prev) => data.shape);
      if (data.style) setLayout((prev) => data.style);
      if (data.images && data.images.length) {
        setImgs((prev) => getImgDocFromIds(data.images as string[], images));
        setTotalImgsSelected((prev) => data.images?.length || 0);
      }
      console.log({
        data: data,
        formatted: getImgDocFromIds(data.images as string[], images)
      });
    } */
    // @ts-ignore
    // console.log({ data });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="p-3 border grid grid-rows-[repeat(3,auto)] gap-x-4 gap-y-1.5 auto-rows-min bg-ivory-1">
      <div
        onClick={imgs.length ? () => {} : () => setShowPopup((prev) => true)}
        className={`border-[2.5px] border-dashed w-full flex items-start justify-start flex-wrap gap-8 mt-1 mb-5 ${imgs.length ? "p-5" : "p-16 cursor-pointer "} rounded-2xl border-charcoal-3/30`}
      >
        {imgs.length ? (
          <>
            {imgs.map(({ alt, defaultAlt, url, _id }, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl w-[100px] relative"
              >
                <Image
                  src={url}
                  alt={alt || defaultAlt || "Image"}
                  unoptimized={!OPTIMIZE_IMAGE}
                  decoding="async"
                  priority
                  width={200}
                  height={200}
                  className="w-full h-full object-cover object-center rounded-2xl"
                />

                <div
                  onClick={() => {
                    setImgs((prev) => prev.filter(({ _id: id }) => id !== _id));
                    if (imgs.length - 1 === 1) setLayout((prev) => "");
                    else if (imgs.length - 1 === 2)
                      setLayout((prev) => "duo-default");
                    else if (imgs.length - 1 === 3)
                      setLayout((prev) => "trio-h");
                    else if (imgs.length - 1 === 4)
                      setLayout((prev) => "quad-default");
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 transition-colors duration-300 cursor-pointer rounded-full aspect-square translate-x-[calc(50%_-_4px)] -translate-y-[calc(50%_-_4px)]"
                >
                  <X
                    strokeWidth={1.5}
                    width={15}
                    height={15}
                  />
                </div>
              </div>
            ))}

            <div
              onClick={() => setShowPopup((prev) => true)}
              className="aspect-square rounded-2xl w-[100px] relative border-[2px] border-dashed border-charcoal-3/40 flex flex-col items-center justify-center text-charcoal-3/35 cursor-pointer transition-colors duration-300 bg-charcoal-3/5 hover:bg-charcoal-3/15 hover:text-charcoal-3/60"
            >
              <Plus
                strokeWidth={1.5}
                width={28}
                height={28}
              />
              <span>Add more</span>
            </div>
          </>
        ) : (
          <span>Select Images</span>
        )}
      </div>

      {/* SHAPES ################################################################ */}
      <div
        className={`${totalImgsSelected < 2 ? "row-span-2" : ""} relative flex items-center justify-start ${totalImgsSelected < 2 ? "grid-cols-4" : "grid-cols-2"}  gap-5 *:w-[80px] *:rounded-lg *:bg-charcoal-3/60 *:cursor-pointer *:transition-all *:duration-300 py-5 pl-7 pr-5 mb-5 border border-charcoal-3/40 rounded-xl`}
      >
        {/* square ]-----------------------------------*/}
        <div
          onClick={() => setShape((prev) => "square")}
          className={`aspect-[1/1] ${shape === "square" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} hover:bg-slate-950/70`}
        />
        {/* default ]-----------------------------------*/}
        <div
          onClick={() => setShape((prev) => "default")}
          className={`aspect-[2/1] ${shape === "default" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} hover:bg-slate-950/70`}
        />
        {/* banner, start-thumbnail ]-----------------------------------*/}
        <div
          onClick={() => setShape((prev) => "start-thumbnail")}
          className={`aspect-[3/1] ${shape === "start-thumbnail" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} hover:bg-slate-950/70`}
        />
        {/* sticker ]-----------------------------------*/}
        <div
          onClick={() => setShape((prev) => "sticker")}
          className={`aspect-[4/1] ${shape === "sticker" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} hover:bg-slate-950/70`}
        />

        <span className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 -rotate-90 !bg-white text-center">
          Shape
        </span>
      </div>

      {/* LAYOUTS ################################################################ */}
      {totalImgsSelected > 1 && totalImgsSelected < 5 ? (
        <div className="relative flex items-center justify-start flex-wrap  gap-5 *:w-[90px] *:aspect-[3/2] *:grid *:gap-0.5 *:rounded-lg *:overflow-hidden *:cursor-pointer *:transition-all *:duration-300 py-5 pl-7 pr-5 border border-charcoal-3/40 rounded-xl">
          {/* 2 images =================================================*/}
          {totalImgsSelected === 2 && (
            <>
              {/* duo-h ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "duo-h")}
                className={`group grid-cols-2 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "duo-h" || layout === "duo-default" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span></span>
                <span></span>
              </div>
              {/* duo-v ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "duo-v")}
                className={`group grid-rows-2 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "duo-v" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span></span>
                <span></span>
              </div>
            </>
          )}

          {/* 3 images =================================================*/}
          {totalImgsSelected === 3 && (
            <>
              {/* trio-h ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "trio-h")}
                className={`group grid-cols-3 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "trio-h" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} group`}
              >
                <span /> <span /> <span />
              </div>
              {/* trio-v ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "trio-v")}
                className={`group grid-rows-3 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "trio-v" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} group`}
              >
                <span /> <span /> <span />
              </div>
              {/* trio-l-collage ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "trio-l-collage")}
                className={`group grid-cols-2 grid-rows-2 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "trio-l-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} group`}
              >
                <span className="row-span-2"></span>
                <span></span>
                <span></span>
              </div>
              {/* trio-r-collage ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "trio-r-collage")}
                className={`group *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "trio-r-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} group`}
              >
                <span></span>
                <span className="col-start-2 row-span-2"></span>
                <span></span>
              </div>
              {/* trio-b-collage ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "trio-b-collage")}
                className={`group *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "trio-b-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} group`}
              >
                <span></span>
                <span></span>
                <span className="col-span-2"></span>
              </div>
              {/* trio-t-collage ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "trio-t-collage")}
                className={`group *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "trio-t-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} group`}
              >
                <span className="col-span-2"></span>
                <span></span>
                <span></span>
              </div>
            </>
          )}

          {/* 4 images =================================================*/}
          {totalImgsSelected === 4 && (
            <>
              {/* quad-default ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "quad-default")}
                className={`group grid-cols-2 grid-rows-2 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "quad-default" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span /> <span /> <span /> <span />
              </div>
              {/* quad-h ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "quad-h")}
                className={`group grid-cols-4 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "quad-h" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span /> <span /> <span /> <span />
              </div>
              {/* quad-v ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "quad-v")}
                className={`group grid-rows-4 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "quad-v" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span /> <span /> <span /> <span />
              </div>
              {/* quad-l-collage ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "quad-l-collage")}
                className={`group grid-cols-2 grid-rows-3 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "quad-l-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span className="row-span-3" /> <span /> <span /> <span />
              </div>
              {/* quad-r-collage ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "quad-r-collage")}
                className={`group grid-cols-2 grid-rows-3 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "quad-r-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span /> <span className="col-start-2 row-span-3" /> <span />{" "}
                <span />
              </div>
              {/* quad-b-collage ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "quad-b-collage")}
                className={`group grid-cols-3 grid-rows-2 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "quad-b-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span /> <span /> <span /> <span className="col-span-3" />
              </div>
              {/* quad-t-collage ]-----------------------------------*/}
              <div
                onClick={() => setLayout((prev) => "quad-t-collage")}
                className={`group grid-cols-3 grid-rows-2 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${layout === "quad-t-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span className="col-span-3" /> <span /> <span /> <span />
              </div>
            </>
          )}

          <span className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 -rotate-90 !bg-white text-center !aspect-auto">
            Layouts
          </span>
        </div>
      ) : (
        <></>
      )}

      {/* <ImageManagementDeprecated
        asPopup
        open={showPopup}
        setOpen={setShowPopup}
        multiSelect
        onSelectImages={handleImageSelections}
      /> */}
      <ImageManagement
        manage="image"
        asPopup
        selectMultiple
        maxSelections={4}
        openPopup={showPopup}
        onChangeOpenPopup={setShowPopup}
        onSelect={handleImageSelections}
      />
    </div>
  );
});

export default AdminBlogImages;
