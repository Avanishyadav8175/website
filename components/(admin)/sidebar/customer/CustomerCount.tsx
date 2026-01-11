// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createCustomerAction,
  selectCustomer
} from "@/store/features/users/customerSlice";

export default function CustomerCount() {
  // hooks
  const dispatch = useDispatch();

  const customerStatus = useSelector(selectCustomer.status);

  const { count } = useSelector((state) =>
    selectCustomer.documentList(state, {
      deleted: false
    })
  );

  // side effects
  useEffect(() => {
    if (customerStatus === "idle") {
      dispatch(createCustomerAction.fetchDocumentList());
    }
  }, [customerStatus, dispatch]);

  return (
    <span className="bg-teal-600 scale-90 text-white flex items-center justify-center px-1.5 py-0.5 font-medium rounded-md !text-xs">
      {count}
    </span>
  );
}
