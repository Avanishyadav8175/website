// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createVendorAction,
  selectVendor
} from "@/store/features/users/vendorSlice";

export default function VendorCount() {
  // hooks
  const dispatch = useDispatch();

  const vendorStatus = useSelector(selectVendor.status);

  const { count } = useSelector((state) =>
    selectVendor.documentList(state, {
      deleted: false
    })
  );

  // side effects
  useEffect(() => {
    if (vendorStatus === "idle") {
      dispatch(createVendorAction.fetchDocumentList());
    }
  }, [vendorStatus, dispatch]);

  return (
    <span className="bg-teal-600 scale-90 text-white flex items-center justify-center px-1.5 py-0.5 font-medium rounded-md !text-xs">
      {count}
    </span>
  );
}
