// hooks
import { useEffect } from "react";

// types
import { type CustomerDocument } from "@/common/types/documentation/users/customer";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<CustomerDocument>) => void;
}) {
  // side effects
  useEffect(() => {
    onReturnOptions({});
  }, [onReturnOptions]);

  return null;
}
