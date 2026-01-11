// utils
import { ShineAnimation } from "@/components/(frontend)/global/ShineAnimation/ShineAnimation";
import { ShoppingCart } from "lucide-react";
import { memo } from "react";

function ContentDetailBookNowButton({
  fullWidth,
  onClick
}: {
  fullWidth: boolean;
  onClick: () => void;
}) {
  return (
   <div
  onClick={onClick}
  className={`cursor-pointer relative group overflow-hidden
  flex items-center justify-center gap-2
  bg-moss text-ivory-1
  px-3 py-2.5 sm:py-3
  rounded-lg sm:rounded-xl
  text-base sm:text-lg
  leading-none
  min-h-[48px]
  transition-all duration-300
  ${fullWidth ? "col-span-2" : ""}`}
>
      <ShoppingCart
        width={16}
        height={16}
      />
      <span>Add to Cart</span>
      <ShineAnimation isPersistent />
    </div>
  );
}

export default memo(ContentDetailBookNowButton);
