"use client";

// icons
import { ShoppingCart } from "lucide-react";

// utils
import { memo } from "react";

// hooks
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import Link from "next/link";

function HeaderCart() {
  // hooks
  const {
    isReady,
    cart: {
      data: { itemsCount }
    }
  } = useAppStates();

  return (
    <Link
      href={"/cart"}
      prefetch={false}
      className={`relative min-w-[45px] flex flex-col items-center justify-center gap-1 text-xs text-charcoal-3 px-1 transition-colors duration-300 cursor-pointer hover:text-sienna`}
    >
      <ShoppingCart
        strokeWidth={1.5}
        width={24}
        height={24}
        className="max-lg:scale-90"
      />
      <span className="max-lg:hidden">{"Cart"}</span>
      {Boolean(isReady && itemsCount) && (
        <span className="absolute flex items-center justify-center -top-1 right-0 rounded-full text-[10px] w-3.5 h-3.5 bg-blue-500 text-white">
          {itemsCount}
        </span>
      )}
    </Link>
  );
}

export default memo(HeaderCart);
