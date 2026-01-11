import { arraysHaveSameElements } from "@/common/helpers/arraysHaveSameElements";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { BlogLayoutImageDocument } from "@/common/types/documentation/nestedDocuments/blogLayoutImage";
import SelectImage from "@/components/custom/inputs/image/SelectImage";
import { useEffect, useState } from "react";

export default function AdminBlogImage({
  data,
  images,
  onEdits
}: {
  data: BlogLayoutImageDocument;
  images: ImageDocument[];
  onEdits: (updatedImages: BlogLayoutImageDocument) => void;
}) {
  const [config, setConfig] = useState<BlogLayoutImageDocument>({
    shape: data.shape && data.shape.length ? data.shape : "default",
    style: data.style && data.style.length ? data.style : "",
    images: data.images !== undefined ? (data.images as string[]) : []
  } as BlogLayoutImageDocument);

  const [blockNonImageUpdates, setBlockNonImageUpdates] =
    useState<boolean>(false);
  const [totalImagesSelected, setTotalImgsSelected] = useState<number>(0);

  useEffect(() => {
    setBlockNonImageUpdates((prev) => true);
  }, [data.images]);

  useEffect(() => {
    setConfig((prev) => data);
  }, [data]);

  useEffect(() => {
    if (blockNonImageUpdates)
      setTimeout(() => {
        setBlockNonImageUpdates((prev) => false);
      }, 2000);
  }, [blockNonImageUpdates]);

  useEffect(() => {
    if (
      onEdits &&
      (config.shape !== data.shape ||
        config.style !== data.style ||
        !arraysHaveSameElements(
          config.images as string[],
          data.images as string[]
        ))
    )
      onEdits(config);

    setTotalImgsSelected((prev) => (config.images ? config.images.length : 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  return (
    <div className="p-3 flex flex-col justify-start gap-3">
      <SelectImage
        name=""
        isRequired={false}
        label=""
        performReset={true}
        selectMultiple
        defaultValue={(data.images as string[]) || []}
        blockNonImageUpdates={blockNonImageUpdates}
        onUpdate={(selectedIds: string | string[]) => {
          if (
            selectedIds.length ||
            (selectedIds.length === 0 && !blockNonImageUpdates)
          ) {
            setConfig(
              (prev) =>
                ({
                  ...prev,
                  images: selectedIds,
                  style:
                    selectedIds.length === 2
                      ? "duo-h"
                      : selectedIds.length === 3
                        ? "trio-h"
                        : selectedIds.length === 4
                          ? "quad-default"
                          : ""
                }) as BlogLayoutImageDocument
            );
          }
        }}
      />

      {/* SHAPES ################################################################ */}
      {/* <div
        className={`${totalImagesSelected < 2 ? "row-span-2" : ""} relative flex items-center justify-start ${totalImagesSelected < 2 ? "grid-cols-4" : "grid-cols-2"}  gap-5 *:w-[80px] *:rounded-lg *:bg-charcoal-3/60 *:cursor-pointer *:transition-all *:duration-300 py-5 pl-7 pr-5 mb-5 border border-charcoal-3/40 rounded-xl`}
      > */}
        {/* square ]-----------------------------------*/}
        {/* <div
          onClick={() =>
            setConfig(
              (prev) =>
                ({ ...prev, shape: "square" }) as BlogLayoutImageDocument
            )
          }
          className={`aspect-[1/1] ${config.shape === "square" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} hover:bg-slate-950/70`}
        /> */}
        {/* default ]-----------------------------------*/}
        {/* <div
          onClick={() =>
            setConfig(
              (prev) =>
                ({ ...prev, shape: "default" }) as BlogLayoutImageDocument
            )
          }
          className={`aspect-[2/1] ${config.shape === "default" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} hover:bg-slate-950/70`}
        /> */}
        {/* banner, start-thumbnail ]-----------------------------------*/}
        {/* <div
          onClick={() =>
            setConfig(
              (prev) =>
                ({
                  ...prev,
                  shape: "start-thumbnail"
                }) as BlogLayoutImageDocument
            )
          }
          className={`aspect-[3/1] ${config.shape === "start-thumbnail" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} hover:bg-slate-950/70`}
        /> */}
        {/* sticker ]-----------------------------------*/}
        {/* <div
          onClick={() =>
            setConfig(
              (prev) =>
                ({ ...prev, shape: "sticker" }) as BlogLayoutImageDocument
            )
          }
          className={`aspect-[4/1] ${config.shape === "sticker" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} hover:bg-slate-950/70`}
        />

        <span className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 -rotate-90 !bg-white text-center">
          Shape
        </span>
      </div> */}

      {/* LAYOUTS ################################################################ */}
      {totalImagesSelected > 1 && totalImagesSelected < 5 ? (
        <div className="relative flex items-center justify-start flex-wrap  gap-5 *:w-[90px] *:aspect-[3/2] *:grid *:gap-0.5 *:rounded-lg *:overflow-hidden *:cursor-pointer *:transition-all *:duration-300 py-5 pl-7 pr-5 border border-charcoal-3/40 rounded-xl">
          {/* 2 images =================================================*/}
          {totalImagesSelected === 2 && (
            <>
              {/* duo-h ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({ ...prev, style: "duo-h" }) as BlogLayoutImageDocument
                  )
                }
                className={`group grid-cols-2 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "duo-h" || config.style === "duo-default" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span></span>
                <span></span>
              </div>
              {/* duo-v ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({ ...prev, style: "duo-v" }) as BlogLayoutImageDocument
                  )
                }
                className={`group grid-rows-2 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "duo-v" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span></span>
                <span></span>
              </div>
            </>
          )}

          {/* 3 images =================================================*/}
          {totalImagesSelected === 3 && (
            <>
              {/* trio-h ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({ ...prev, style: "trio-h" }) as BlogLayoutImageDocument
                  )
                }
                className={`group grid-cols-3 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "trio-h" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} group`}
              >
                <span /> <span /> <span />
              </div>
              {/* trio-v ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({ ...prev, style: "trio-v" }) as BlogLayoutImageDocument
                  )
                }
                className={`group grid-rows-3 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "trio-v" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} group`}
              >
                <span /> <span /> <span />
              </div>
              {/* trio-l-collage ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({
                        ...prev,
                        style: "trio-l-collage"
                      }) as BlogLayoutImageDocument
                  )
                }
                className={`group grid-cols-2 grid-rows-2 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "trio-l-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} group`}
              >
                <span className="row-span-2"></span>
                <span></span>
                <span></span>
              </div>
              {/* trio-r-collage ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({
                        ...prev,
                        style: "trio-r-collage"
                      }) as BlogLayoutImageDocument
                  )
                }
                className={`group *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "trio-r-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} group`}
              >
                <span></span>
                <span className="col-start-2 row-span-2"></span>
                <span></span>
              </div>
              {/* trio-b-collage ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({
                        ...prev,
                        style: "trio-b-collage"
                      }) as BlogLayoutImageDocument
                  )
                }
                className={`group *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "trio-b-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} group`}
              >
                <span></span>
                <span></span>
                <span className="col-span-2"></span>
              </div>
              {/* trio-t-collage ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({
                        ...prev,
                        style: "trio-t-collage"
                      }) as BlogLayoutImageDocument
                  )
                }
                className={`group *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "trio-t-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""} group`}
              >
                <span className="col-span-2"></span>
                <span></span>
                <span></span>
              </div>
            </>
          )}

          {/* 4 images =================================================*/}
          {totalImagesSelected === 4 && (
            <>
              {/* quad-default ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({
                        ...prev,
                        style: "quad-default"
                      }) as BlogLayoutImageDocument
                  )
                }
                className={`group grid-cols-2 grid-rows-2 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "quad-default" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span /> <span /> <span /> <span />
              </div>
              {/* quad-h ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({ ...prev, style: "quad-h" }) as BlogLayoutImageDocument
                  )
                }
                className={`group grid-cols-4 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "quad-h" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span /> <span /> <span /> <span />
              </div>
              {/* quad-v ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({ ...prev, style: "quad-v" }) as BlogLayoutImageDocument
                  )
                }
                className={`group grid-rows-4 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "quad-v" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span /> <span /> <span /> <span />
              </div>
              {/* quad-l-collage ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({
                        ...prev,
                        style: "quad-l-collage"
                      }) as BlogLayoutImageDocument
                  )
                }
                className={`group grid-cols-2 grid-rows-3 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "quad-l-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span className="row-span-3" /> <span /> <span /> <span />
              </div>
              {/* quad-r-collage ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({
                        ...prev,
                        style: "quad-r-collage"
                      }) as BlogLayoutImageDocument
                  )
                }
                className={`group grid-cols-2 grid-rows-3 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "quad-r-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span /> <span className="col-start-2 row-span-3" /> <span />{" "}
                <span />
              </div>
              {/* quad-b-collage ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({
                        ...prev,
                        style: "quad-b-collage"
                      }) as BlogLayoutImageDocument
                  )
                }
                className={`group grid-cols-3 grid-rows-2 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "quad-b-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
              >
                <span /> <span /> <span /> <span className="col-span-3" />
              </div>
              {/* quad-t-collage ]-----------------------------------*/}
              <div
                onClick={() =>
                  setConfig(
                    (prev) =>
                      ({
                        ...prev,
                        style: "quad-t-collage"
                      }) as BlogLayoutImageDocument
                  )
                }
                className={`group grid-cols-3 grid-rows-2 *:bg-charcoal-3/60 *:group-hover:bg-slate-950/70 ${config.style === "quad-t-collage" ? "ring-[1.5px] ring-teal-500 ring-offset-[1.5px]" : ""}`}
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
    </div>
  );
}
