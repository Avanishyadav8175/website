// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createCustomerAction,
  selectCustomer
} from "@/store/features/users/customerSlice";

export default function OrderCustomerData({
  customerId
}: {
  customerId: string;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux states
  const customerStatus = useSelector(selectCustomer.status);

  const { documents: customers } = useSelector(selectCustomer.documentList);

  // variables
  const customer = customers.find(({ _id }) => _id === customerId);

  // side effects
  useEffect(() => {
    if (customerStatus === "idle") {
      dispatch(createCustomerAction.fetchDocumentList());
    }
  }, [customerStatus, dispatch]);

  return (
    <section className="flex flex-col">
      <span className="text-lg font-semibold underline">Customer Details</span>
      <section className="flex flex-col">
        <span className="flex items-baseline gap-1">
          <span className="text-sm font-medium">{"Name:"}</span>
          <span>{customer?.name || ""}</span>
        </span>
        <span className="flex items-baseline gap-1">
          <span className="text-sm font-medium">{"Mobile No:"}</span>
          <span>{customer?.mobileNumber || ""}</span>
        </span>
        <span className="flex items-baseline gap-1">
          <span className="text-sm font-medium">{"Mail:"}</span>
          <span>{customer?.mail || ""}</span>
        </span>
      </section>
    </section>
  );
}
