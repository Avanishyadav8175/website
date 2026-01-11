// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import { selectVendorRequest } from "@/store/features/actions/vendorRequestSlice";
import {
  createFoundUsSourceAction,
  selectFoundUsSource
} from "@/store/features/presets/foundUsSourceSlice";

// types
import { type FilterKeywordOptions } from "@/common/types/redux/filterOption";
import { type VendorRequestDocument } from "@/common/types/documentation/actions/vendorRequest";

export default function GetTableFilterKeywordOptions({
  onReturnOptions
}: {
  onReturnOptions: (
    options: FilterKeywordOptions<VendorRequestDocument>
  ) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux states
  const { documents } = useSelector(selectVendorRequest.documentList);

  const foundUsSourceStatus = useSelector(selectFoundUsSource.status);

  const { options: foundUsSourceOptions } = useSelector((state) =>
    selectFoundUsSource.documentList(state, {
      active: true,
      sortBy: "source",
      orderBy: "asc"
    })
  );

  // side effects
  useEffect(() => {
    if (foundUsSourceStatus === "idle") {
      dispatch(createFoundUsSourceAction.fetchDocumentList());
    }
  }, [foundUsSourceStatus, dispatch]);

  useEffect(() => {
    onReturnOptions({
      status: [
        { label: "New", value: "new" },
        { label: "Processing", value: "processing" },
        { label: "Registered", value: "registered" },
        { label: "Rejected", value: "rejected" }
      ],
      foundUs: foundUsSourceOptions,
      createdBy: [
        ...Array.from(
          new Set(
            documents
              .filter(({ createdBy }) => createdBy)
              .map(({ createdBy }) => createdBy as string)
          )
        )
      ].map((createdBy) => ({ label: createdBy, value: createdBy })),
      updatedBy: [
        ...Array.from(
          new Set(
            documents
              .filter(({ updatedBy }) => updatedBy)
              .map(({ updatedBy }) => updatedBy as string)
          )
        )
      ].map((updatedBy) => ({ label: updatedBy, value: updatedBy }))
    });
  }, [documents, foundUsSourceOptions, onReturnOptions]);

  return null;
}
