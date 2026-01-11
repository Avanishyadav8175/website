// hooks
import { useEffect } from "react";
import { useSelector } from "@/store/withType";

// redux
import { selectSubTopic } from "@/store/features/pages/subTopicSlice";
import { selectCity } from "@/store/features/presets/citySlice";
import { selectContentCategory } from "@/store/features/categories/contentCategorySlice";
import { selectTopic } from "@/store/features/pages/topicSlice";

// types
import { type SubTopicDocument } from "@/common/types/documentation/pages/subTopic";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<SubTopicDocument>) => void;
}) {
  const { documents } = useSelector(selectSubTopic.documentList);

  const { options: contentCategoryOptions } = useSelector((state) =>
    selectContentCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const { options: topicOptions } = useSelector((state) =>
    selectTopic.documentList(state, {
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
      topic: topicOptions,
      city: cityOptions,
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [
    documents,
    contentCategoryOptions,
    topicOptions,
    cityOptions,
    onReturnOptions
  ]);

  return null;
}
