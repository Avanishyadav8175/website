// icons
import { Trash2 } from "lucide-react";

export default function CartItemAction({
  showDelete,
  quantity,
  onChangeShowDelete,
  onChangeQuantity
}: {
  showDelete: boolean;
  quantity: number;
  onChangeShowDelete: (showDelete: boolean) => void;
  onChangeQuantity: (quantity: number) => void;
}) {
  // event handlers
  const handleIncrement = () => {
    onChangeQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onChangeQuantity(quantity - 1);
    }
  };

  return (
    <div className="pr-3 sm:pr-4 sm:mt-1 justify-self-end row-span-2 col-start-3 row-start-1 max-sm:pt-1 flex items-start justify-end gap-x-2 sm:gap-x-3.5">
      <div
        className={`text-red-600 translate-y-0.5 px-1 transition-all duration-300 cursor-pointer ${showDelete ? "pointer-events-none opacity-0" : "opacity-100"}`}
        onClick={() => {
          onChangeShowDelete(true);
        }}
      >
        <Trash2
          strokeWidth={1.5}
          width={17}
        />
      </div>

      <div className="border sm:border-[1.5px] mb-1.5 border-sienna bg-sienna-1/10 text-sienna font-medium flex items-center justify-between gap-x-1 sm:gap-x-1.5 px-1.5 sm:px-2.5 py-0.5  rounded-lg w-fit h-fit">
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
  );
}
