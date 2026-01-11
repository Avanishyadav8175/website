// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import { selectNoteGroup } from "@/store/features/presets/noteGroupSlice";
import {
  createOccasionAction,
  selectOccasion
} from "@/store/features/presets/occasionSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type NoteGroupDocument } from "@/common/types/documentation/presets/noteGroup";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<NoteGroupDocument>) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const { documents } = useSelector(selectNoteGroup.documentList);

  const occasionStatus = useSelector(selectOccasion.status);
  const { options: occasionOptions } = useSelector(selectOccasion.documentList);

  // effects
  useEffect(() => {
    if (occasionStatus === "idle") {
      dispatch(createOccasionAction.fetchDocumentList());
    }
  }, [occasionStatus, dispatch]);

  useEffect(() => {
    onReturnOptions({
      occasion: (() => {
        const uniqueOccasions = [
          ...Array.from(new Set(documents.map(({ occasion }) => occasion)))
        ];

        return occasionOptions.filter(({ value }) =>
          uniqueOccasions.includes(value)
        );
      })(),
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, occasionOptions, onReturnOptions]);

  return null;
}
