// icons
import { Trash2 } from "lucide-react";

// constants
import { INRSymbol } from "@/common/constants/symbols";

// types
import { type AddonDocument } from "@/common/types/documentation/contents/addon";
import { type CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";

export default function CartItemAddon({
  addon,
  onChangeAddon,
  onDelete
}: {
  addon: CartItemAddonDocument;
  onChangeAddon: (addon: CartItemAddonDocument) => void;
  onDelete: () => void;
}) {
  // variables
  const { pricePerUnit, quantity } = addon;

  const { name } = addon.addon as AddonDocument;

  // event handlers
  const handleIncrement = () => {
    onChangeAddon({
      ...addon,
      quantity: quantity + 1
    } as CartItemAddonDocument);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onChangeAddon({
        ...addon,
        quantity: quantity - 1
      } as CartItemAddonDocument);
    }
  };

  return (
    <div className="grid grid-cols-[1fr_auto] gap-3">
      <span className="flex items-center justify-start relative gap-2 text-charcoal-3/70 truncate max-sm:text-sm">
        {name}
        <div className="absolute right-0 h-full w-8 bg-gradient-to-r from-transparent to-ivory-1" />
      </span>
      <div className="grid grid-cols-[auto_auto_auto] items-center justify-end gap-3.5">
        <span className="text-right text-charcoal-3/70">
          {`${INRSymbol} ${pricePerUnit}`}
        </span>
        <div
          onClick={onDelete}
          className="transition-all duration-300 hover:text-red-500 cursor-pointer"
        >
          <Trash2
            strokeWidth={1.5}
            width={15}
          />
        </div>
        <div className="border sm:border-[1.5px] mb-1.5 border-ash bg-ash-1/10 text-charcoal-3/40 translate-y-[2px] font-medium flex items-center justify-between gap-x-1 sm:gap-x-1.5 px-1.5 sm:px-2.5 py-0.5  rounded-lg w-fit h-fit">
          <span
            onClick={handleDecrement}
            className="cursor-pointer"
          >
            -
          </span>
          <span className="text-center min-w-7 sm:min-w-8">{quantity}</span>
          <span
            onClick={handleIncrement}
            className="cursor-pointer"
          >
            +
          </span>
        </div>
      </div>
    </div>
  );
}
