// icons
import { INRSymbol } from "@/common/constants/symbols";

export default function CartItemPrice({ price }: { price: number }) {
  return (
    <span className="text-sienna text-xl font-medium mt-2 sm:my-1 sm:text-2xl max-sm:-translate-y-1 leading-none max-sm:self-center">
      {`${INRSymbol}${price}`}
    </span>
  );
}
