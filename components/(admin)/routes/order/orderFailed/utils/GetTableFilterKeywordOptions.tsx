// hooks
import { useEffect } from "react";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type OrderDocument } from "@/common/types/documentation/dynamic/order";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<OrderDocument>) => void;
}) {
  // side effects
  useEffect(() => {
    onReturnOptions({});
  }, [onReturnOptions]);

  return null;
}
