import { CartItemType } from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";
import { CartItemChoiceType } from "../../static/types";
import Image from "next/image";
import { INRSymbol } from "@/common/constants/symbols";
import { ClassNameType } from "@/common/types/reactTypes";
import { OPTIMIZE_IMAGE } from "@/config/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";

export default function FrontendCartAddonsSuggestions({
  cartItem,
  itemChoice,
  addAddon,
  className
}: {
  cartItem: CartItemType;
  itemChoice: CartItemChoiceType;
  addAddon: (id: string) => void;
  className?: ClassNameType;
}) {
  const [screenW, setScreenW] = useState<number>(300);
  const trayId = useId();

  useEffect(() => {
    const updateWindowWidth = () => {
      setScreenW((prev) => innerWidth);
    };
    window.addEventListener("resize", updateWindowWidth);
    updateWindowWidth();
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  const handleScroll = (dir: "left" | "right") => {
    const tray = document.getElementById(trayId) as HTMLElement;

    const currOffset = tray.scrollLeft;

    tray.scrollTo({
      left: currOffset + (dir === "left" ? -1 : 1) * (screenW * 0.65),
      behavior: "smooth"
    });
  };

  return (
    <div
      className={`flex flex-col justify-start rounded-b-3xl sm:rounded-3xl bg-ivory sm:bg-ivory-1 border max-sm:border-t-0 max-sm:pt-7 max-sm:-translate-y-2 p-3.5 max-sm:pb-4 max-sm:mb-2 sm:p-4 gap-1.5 sm:max-w-[718px] ${className || ""}`}
    >
      <span className="font-medium text-sm">Add more delights</span>
      <div
        id={trayId}
        className="relative scrollbar-hide overflow-x-scroll overflow-y-visible pt-2.5 flex items-stretch justify-start gap-3.5"
      >
        <div
          className="max-w-7 w-7 h-7 -mr-8 sticky top-1/2 -translate-y-[calc(50%_+_12px)] aspect-square left-0 rounded-full cursor-pointer flex items-center border border-neutral-200 justify-center bg-white/50 p-[8px] text-slate-900 transition-all duration-300 hover:bg-white z-50"
          onClick={() => handleScroll("left")}
        >
          <ChevronLeftIcon
            width={22}
            height={22}
            strokeWidth={3}
            className="scale-110"
          />
        </div>

        {cartItem.addons
          .filter(({ _id }) =>
            itemChoice.addons.find((addon) => addon._id === _id) ? false : true
          )
          .slice(0, 12)
          .map(({ _id, image, name, pricePerUnit }, index) => (
            <div
              key={index}
              className="flex flex-col gap-0 sm:gap-0 p-1.5 sm:p-2 justify-start min-w-[90px] sm:w-[90px] relative border border-ash/40 hover:border-ash hover:bg-ash/10 rounded-xl transition-all duration-300"
            >
              <div className="bg-ash rounded-xl aspect-square overflow-hidden relative mb-2">
                <Image
                  src={image.url}
                  alt={image.alt || "Addon Image"}
                  width={200}
                  height={200}
                  unoptimized={!OPTIMIZE_IMAGE}
                  priority
                  decoding="async"
                  draggable={false}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="text-xs text-charcoal-3/70 line-clamp-2 leading-tight">
                {name}
              </div>
              <div className="text-sm font-medium sm:pt-0.5">
                {INRSymbol} {pricePerUnit}
              </div>

              <div
                onClick={() => addAddon(_id)}
                className="cursor-pointer aspect-square w-[19px] h-[19px] absolute top-0 right-0 translate-x-[40%] -translate-y-[40%] flex items-center justify-center text-[15px] rounded-sm bg-green-600 text-white"
              >
                +
              </div>
            </div>
          ))}

        <div
          className="max-w-7 w-7 h-7 sticky top-1/2 -translate-y-[calc(50%_+_12px)] [calc(50%_+_12px)]spect-square right-0 rounded-full cursor-pointer flex items-center border border-neutral-200 justify-center bg-white/50 p-[8px] text-slate-900 transition-all duration-300 hover:bg-white z-50"
          onClick={() => handleScroll("right")}
        >
          <ChevronRightIcon
            width={22}
            height={22}
            strokeWidth={3}
            className="scale-110"
          />
        </div>
      </div>
    </div>
  );
}
