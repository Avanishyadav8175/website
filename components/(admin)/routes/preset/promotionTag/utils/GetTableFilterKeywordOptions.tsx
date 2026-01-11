// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import { selectPromotionTag } from "@/store/features/presets/promotionTagSlice";
import {
  createColorAction,
  selectColor
} from "@/store/features/presets/colorSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type PromotionTagDocument } from "@/common/types/documentation/presets/promotionTag";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<PromotionTagDocument>
  ) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const { documents } = useSelector(selectPromotionTag.documentList);

  const colorStatus = useSelector(selectColor.status);
  const { options: colorOptions } = useSelector(selectColor.documentList);

  // effects
  useEffect(() => {
    if (colorStatus === "idle") {
      dispatch(createColorAction.fetchDocumentList());
    }
  }, [colorStatus, dispatch]);

  useEffect(() => {
    onReturnOptions({
      color: (() => {
        const uniqueColors = [
          ...Array.from(new Set(documents.map(({ color }) => color)))
        ];

        return colorOptions.filter(({ value }) => uniqueColors.includes(value));
      })(),
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, colorOptions, onReturnOptions]);

  return null;
}
