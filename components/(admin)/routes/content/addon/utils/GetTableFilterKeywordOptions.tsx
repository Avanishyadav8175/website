// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import { selectAddon } from "@/store/features/contents/addonSlice";
import {
  createAddonCategoryAction,
  selectAddonCategory
} from "@/store/features/categories/addonCategorySlice";

// types
import { type AddonDocument } from "@/common/types/documentation/contents/addon";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<AddonDocument>) => void;
}) {
  const dispatch = useDispatch();

  const { documents } = useSelector(selectAddon.documentList);

  const addonCategoryStatus = useSelector(selectAddonCategory.status);
  const { options: addonCategoryOptions } = useSelector(
    selectAddonCategory.documentList
  );

  useEffect(() => {
    if (addonCategoryStatus === "idle") {
      dispatch(createAddonCategoryAction.fetchDocumentList());
    }
  }, [addonCategoryStatus, dispatch]);

  useEffect(() => {
    onReturnOptions({
      category: (() => {
        const uniqueCategories = [
          ...Array.from(new Set(documents.map(({ category }) => category)))
        ];

        return addonCategoryOptions.filter(({ value }) =>
          uniqueCategories.includes(value)
        );
      })(),
      // @ts-ignore
      "edible.isEdible": [
        {
          label: "Edible",
          value: "true"
        },
        {
          label: "Not Edible",
          value: "false"
        }
      ],
      // @ts-ignore
      "edible.type": [
        {
          label: "Unspecified",
          value: "unspecified"
        },
        {
          label: "Veg",
          value: "veg"
        },
        {
          label: "Non Veg",
          value: "non-veg"
        }
      ],
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, addonCategoryOptions, onReturnOptions]);

  return null;
}
