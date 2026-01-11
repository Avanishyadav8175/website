// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectTrendingSearchKeyword } from "@/store/features/presets/trendingSearchKeywordSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type TrendingSearchKeywordDocument } from "@/common/types/documentation/presets/trendingSearchKeyword";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<TrendingSearchKeywordDocument>
  ) => void;
}) {
  const { documents } = useSelector(selectTrendingSearchKeyword.documentList);

  useEffect(() => {
    onReturnOptions({
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
