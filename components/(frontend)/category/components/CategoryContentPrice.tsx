// icons
import { INRSymbol } from "@/common/constants/symbols";
import { memo } from "react";

function CategoryContentPrice({ price }: { price: number }) {
  return (
    <div className="text-[14px] sm:text-[18px] text-charcoal-3 group-hover:text-sienna-1 font-semibold transition-all duration-300">
      {INRSymbol}
      {price}
    </div>
  );
}

export default memo(CategoryContentPrice);
