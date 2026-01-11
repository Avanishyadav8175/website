// hooks
import { useSelector } from "@/store/withType";

// redux
import { selectContent } from "@/store/features/contents/contentSlice";
import { selectDeliveryType } from "@/store/features/presets/deliveryTypeSlice";

// components
import OrderDetailsDialog from "../../routes/order/components/OrderDetailsDialog";

// type
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";

export default function Booking({
  srNo,
  orderId,
  cartItem
}: {
  srNo: number;
  orderId: string;
  cartItem: CartItemDocument;
}) {
  // redux states
  const { documents: contents } = useSelector(selectContent.documentList);
  const { documents: deliveryTypes } = useSelector(
    selectDeliveryType.documentList
  );

  // variables
  const content = contents.find(({ _id }) => _id === cartItem.content);

  return (
    <div
      className={`grid grid-cols-[1fr_5fr_3fr_1fr] items-center justify-center w-full px-2 sm:px-4 py-2 rounded-lg ${content?.availability?.availableAt === "all-india" ? "bg-purple-200/30" : cartItem.status === "completed" ? "bg-green-200/30" : "bg-blue-200/30"} text-charcoal-3 text-sm sm:text-base text-center transition-colors duration-200 ${content?.availability?.availableAt === "all-india" ? "hover:bg-purple-200/50" : cartItem.status === "completed" ? "hover:bg-green-200/50" : "hover:bg-blue-200/50"}`}
    >
      <span>{srNo}</span>
      <span className="text-left line-clamp-1">{content?.name || ""}</span>
      <span className={"line-clamp-1"}>
        {deliveryTypes
          .find(({ _id }) => _id === cartItem.delivery.type)
          ?.timeSlots?.find(({ _id }) => _id === cartItem.delivery.slot)
          ?.label || "-"}
      </span>
      <span className="mx-auto">
        <OrderDetailsDialog
          orderId={orderId}
          itemId={cartItem._id as string}
        />
      </span>
    </div>
  );
}
