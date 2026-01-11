import { SetStateType } from "@/common/types/reactTypes";
import { SquareCheckBigIcon, SquareIcon } from "lucide-react";
import { INRSymbol } from "@/common/constants/symbols";
import Image from "next/image";
import { ContentEnhancementItemDocument } from "@/common/types/documentation/nestedDocuments/contentEnhancementItem";
import { EnhancementDocument } from "@/common/types/documentation/presets/enhancement";
import { ImageDocument } from "@/common/types/documentation/media/image";
import { OPTIMIZE_IMAGE } from "@/config/image";

export default function ProductEnhancements({
  enhancements,
  setEnhancements,
  availableEnhancements
}: {
  enhancements: Array<ContentEnhancementItemDocument>;
  setEnhancements: SetStateType<Array<ContentEnhancementItemDocument>>;
  availableEnhancements: Array<ContentEnhancementItemDocument>;
}) {
  const updateSelectedEnhancements = (newEnhancementId: string) => {
    const isSelected = enhancements.find(({ _id }) => _id === newEnhancementId);

    if (isSelected) {
      // remove the selected enhancement
      setEnhancements((prev) =>
        prev.filter(({ _id }) => _id !== newEnhancementId)
      );
    } else {
      const newEnhancement = availableEnhancements.find(
        ({ _id }) => _id === newEnhancementId
      );

      if (newEnhancement)
        // add the selected enhancement
        setEnhancements((prev) => [...prev, newEnhancement]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-x-6 sm:gap-y-2">
      {availableEnhancements &&
        availableEnhancements.length &&
        availableEnhancements.map(({ enhancement, price, _id }, index) => (
          <div
            className={`flex items-center justify-between gap-2 sm:gap-3.5 cursor-pointer transition-all duration-300 pr-3.5 py-4 sm:py-3 rounded-lg ${enhancements.find(({ _id: id }) => _id === id) ? "bg-gradient-to-r from-transparent to-sienna-1/15" : "hover:bg-gradient-to-r hover:from-transparent hover:to-ash/20"}`}
            onClick={() => updateSelectedEnhancements(_id as string)}
            key={index}
          >
            {enhancements.find(({ _id: id }) => _id === id) ? (
              <>
                <span className="text-[17px] text-sienna flex items-center justify-start gap-3">
                  <div className="aspect-square rounded-lg bg-charcoal-3/20 overflow-hidden relative w-9">
                    <Image
                      src={
                        (
                          (enhancement as EnhancementDocument)
                            .image as ImageDocument
                        ).url
                      }
                      alt={
                        (
                          (enhancement as EnhancementDocument)
                            .image as ImageDocument
                        ).alt || "Enhancement Image"
                      }
                      height={130}
                      width={130}
                      draggable={false}
                      decoding="async"
                      unoptimized={!OPTIMIZE_IMAGE}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <span>{`${(enhancement as EnhancementDocument).label}`}</span>
                </span>
                <div className="flex items-center justify-end gap-3.5 text-sienna">
                  <span className="whitespace-nowrap">
                    {INRSymbol} {price}
                  </span>
                  <SquareCheckBigIcon
                    stroke="#b76e79"
                    className="transition-all duration-300"
                  />
                </div>
              </>
            ) : (
              <>
                <span className="text-[17px] flex items-center justify-start gap-3">
                  <div className="aspect-square rounded-lg bg-charcoal-3/20 overflow-hidden relative w-9">
                    <Image
                      src={
                        (
                          (enhancement as EnhancementDocument)
                            .image as ImageDocument
                        ).url
                      }
                      alt={
                        (
                          (enhancement as EnhancementDocument)
                            .image as ImageDocument
                        ).alt || "Enhancement Image"
                      }
                      height={130}
                      width={130}
                      draggable={false}
                      decoding="async"
                      unoptimized={!OPTIMIZE_IMAGE}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <span>{`${(enhancement as EnhancementDocument).label}`}</span>
                </span>
                <div className="flex items-center justify-end gap-3.5">
                  <span className="whitespace-nowrap">
                    {INRSymbol} {price}
                  </span>
                  <SquareIcon />{" "}
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
}
