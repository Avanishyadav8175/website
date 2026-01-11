// libraries
import mongoose from "mongoose";

// icons
import { ChevronLeft, ChevronRight } from "lucide-react";

// hooks
import { useId } from "react";
import { useWindowSize } from "usehooks-ts";

// components
import CartItemAddonSuggestion from "./CartItemAddonSuggestion";

// types
import { type AddonDocument } from "@/common/types/documentation/contents/addon";
import { type CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";
import { type ContentAddonDocument } from "@/common/types/documentation/nestedDocuments/contentAddon";

export default function CartItemAddonSuggestions({
  isDeleted,
  addons,
  contentAddons,
  onChangeAddons
}: {
  isDeleted: boolean;
  addons: CartItemAddonDocument[];
  contentAddons: ContentAddonDocument[];
  onChangeAddons: (addons: CartItemAddonDocument[]) => void;
}) {
  // hooks
  const trayId = useId();
  const { width } = useWindowSize();

  // variables
  const addonSuggestions = contentAddons
    .filter(
      ({ addon }) =>
        !addons.find(
          ({ addon: cartItemAddon }) =>
            (cartItemAddon as AddonDocument)._id ===
            (addon as AddonDocument)._id
        )
    )
    .slice(0, 12);

  // event handlers
  const handleScroll = (dir: "left" | "right") => {
    const tray = document.getElementById(trayId) as HTMLElement;

    const currOffset = tray.scrollLeft;

    tray.scrollTo({
      left: currOffset + (dir === "left" ? -1 : 1) * (width * 0.65),
      behavior: "smooth"
    });
  };

  const handleAdd = (addon: AddonDocument) => {
    const cartItemAddon = {
      _id: new mongoose.Types.ObjectId(),
      addon: addon,
      pricePerUnit: addon.price,
      quantity: 1
    } as CartItemAddonDocument;

    onChangeAddons([...addons, cartItemAddon]);
  };

  if (!addonSuggestions.length) {
    return <></>;
  }

  return (
    <div
      className={`flex flex-col justify-start rounded-b-3xl sm:rounded-3xl bg-ivory sm:bg-ivory-1 border max-sm:border-t-0 max-sm:pt-7 max-sm:-translate-y-2 p-3.5 max-sm:pb-4 max-sm:mb-2 sm:p-4 gap-1.5 sm:max-w-[718px] ${isDeleted ? "transition-all duration-300 scale-0" : ""}`}
    >
      <span className="font-medium text-sm">Add more delights</span>
      <div
        id={trayId}
        className="relative scrollbar-hide overflow-x-scroll overflow-y-visible pt-2.5 flex items-stretch justify-start gap-3.5"
      >
        <div
          className="max-w-7 w-7 h-7 -mr-8 sticky top-1/2 -translate-y-[calc(50%_+_12px)] aspect-square left-0 rounded-full cursor-pointer flex items-center border border-neutral-200 justify-center bg-white/50 p-[8px] text-slate-900 transition-all duration-300 hover:bg-white z-50"
          onClick={() => {
            handleScroll("left");
          }}
        >
          <ChevronLeft
            width={22}
            height={22}
            strokeWidth={3}
            className="scale-110"
          />
        </div>
        {addonSuggestions.map(({ addon }) => (
          <CartItemAddonSuggestion
            key={(addon as AddonDocument)._id as string}
            addon={addon as AddonDocument}
            onAdd={() => {
              handleAdd(addon as AddonDocument);
            }}
          />
        ))}
        <div
          className="max-w-7 w-7 h-7 sticky top-1/2 -translate-y-[calc(50%_+_12px)] [calc(50%_+_12px)]spect-square right-0 rounded-full cursor-pointer flex items-center border border-neutral-200 justify-center bg-white/50 p-[8px] text-slate-900 transition-all duration-300 hover:bg-white z-50"
          onClick={() => {
            handleScroll("right");
          }}
        >
          <ChevronRight
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
