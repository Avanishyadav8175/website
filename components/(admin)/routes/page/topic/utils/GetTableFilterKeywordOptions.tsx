// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectTopic } from "@/store/features/pages/topicSlice";
import { selectContentCategory } from "@/store/features/categories/contentCategorySlice";
import { selectCity } from "@/store/features/presets/citySlice";

// types
import { type TopicDocument } from "@/common/types/documentation/pages/topic";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<TopicDocument>) => void;
}) {
  const { documents } = useSelector(selectTopic.documentList);

  const { options: contentCategoryOptions } = useSelector((state) =>
    selectContentCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const { options: cityOptions } = useSelector((state) =>
    selectCity.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  useEffect(() => {
    onReturnOptions({
      category: contentCategoryOptions,
      city: cityOptions,
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, contentCategoryOptions, cityOptions, onReturnOptions]);

  return null;
}
