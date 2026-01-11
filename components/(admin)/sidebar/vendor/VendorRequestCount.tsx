// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createVendorRequestAction,
  selectVendorRequest
} from "@/store/features/actions/vendorRequestSlice";

export default function VendorRequestCount() {
  // hooks
  const dispatch = useDispatch();

  const vendorRequestStatus = useSelector(selectVendorRequest.status);

  const { count } = useSelector(selectVendorRequest.documentList);

  // side effects
  useEffect(() => {
    if (vendorRequestStatus === "idle") {
      dispatch(createVendorRequestAction.fetchDocumentList());
    }
  }, [vendorRequestStatus, dispatch]);

  return (
    <span className="bg-teal-600 scale-90 text-white flex items-center justify-center px-1.5 py-0.5 font-medium rounded-md !text-xs">
      {count}
    </span>
  );
}
