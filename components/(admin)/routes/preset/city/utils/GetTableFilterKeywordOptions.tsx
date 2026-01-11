// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import { selectCity } from "@/store/features/presets/citySlice";
import {
  createStateAction,
  selectState
} from "@/store/features/presets/stateSlice";

// types
import { type CityDocument } from "@/common/types/documentation/presets/city";
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (options: FilterKeywordOptions<CityDocument>) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const { documents } = useSelector(selectCity.documentList);

  const stateStatus = useSelector(selectState.status);
  const { options: stateOptions } = useSelector(selectState.documentList);

  // effects
  useEffect(() => {
    if (stateStatus === "idle") {
      dispatch(createStateAction.fetchDocumentList());
    }
  }, [stateStatus, dispatch]);

  useEffect(() => {
    onReturnOptions({
      state: (() => {
        const uniqueStates = [
          ...Array.from(new Set(documents.map(({ state }) => state)))
        ];

        return stateOptions.filter(({ value }) => uniqueStates.includes(value));
      })(),
      aliases: [
        {
          label: "Have",
          value: "true"
        },
        {
          label: "Don't have",
          value: "false"
        }
      ],
      isTopCity: [
        {
          label: "True",
          value: "true"
        },
        {
          label: "False",
          value: "false"
        }
      ],
      createdBy: [
        ...Array.from(new Set(documents.map(({ createdBy }) => createdBy)))
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(new Set(documents.map(({ updatedBy }) => updatedBy)))
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, stateOptions, onReturnOptions]);

  return null;
}
