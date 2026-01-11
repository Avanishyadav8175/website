// components
import { INRSymbol } from "@/common/constants/symbols";

// types
import { CustomizationPriceSummaryItem } from "../types/priceSummary";

export default function ContentCustomizePriceSummaryItem({
  item: { label, price }
}: {
  item: CustomizationPriceSummaryItem;
}) {
  return (
    <>
      <span className={"self-start"}>{label}</span>
      <span className={"self-end"}>{`${INRSymbol} ${price}`}</span>
    </>
  );
}
