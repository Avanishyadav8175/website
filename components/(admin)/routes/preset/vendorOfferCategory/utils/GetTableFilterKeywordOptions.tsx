// constants
import { categoryTypeOptions } from "../constants/categoryTypeOptions";

// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectVendorOfferCategory } from "@/store/features/presets/vendorOfferCategorySlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type VendorOfferCategoryDocument } from "@/common/types/documentation/presets/vendorOfferCategory";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<VendorOfferCategoryDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectVendorOfferCategory.documentList);

  useEffect(() => {
    onReturnOptions({
      type: categoryTypeOptions,
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, onReturnOptions]);

  return null;
}
