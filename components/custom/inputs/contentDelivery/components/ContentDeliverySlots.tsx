// icons
import { Plus, PlusCircle } from "lucide-react";

// utils
import { getInitialDeliverySlotValue } from "../utils/getInitialDeliverySlotValue";

// components
import ContentDeliverySlot from "../components/ContentDeliverySlot";

// types
import { type ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";

export default function ContentDeliverySlots({
  deliverySlots,
  onChangeDeliverySlots
}: {
  deliverySlots: ContentDeliverySlotDocument[];
  onChangeDeliverySlots: (
    newDeliverySlots: ContentDeliverySlotDocument[]
  ) => void;
}) {
  // variables
  const selectedDeliveryTypeIds = deliverySlots.map(
    ({ type }) => type as string
  );

  // handlers
  const handleAddDeliverySlot = () => {
    onChangeDeliverySlots([...deliverySlots, getInitialDeliverySlotValue()]);
  };

  const handleDeleteDeliverySlot = (deliverySlotId: string) => {
    if (deliverySlots?.length === 1) {
      onChangeDeliverySlots([getInitialDeliverySlotValue()]);
    } else {
      onChangeDeliverySlots(
        [...deliverySlots].filter(({ _id }) => _id !== deliverySlotId)
      );
    }
  };

  return (
    <section className="grid grid-cols-1 gap-3 w-full mt-3">
      {deliverySlots.map((deliverySlot, i) => (
        <ContentDeliverySlot
          key={i}
          index={i}
          deliverySlot={deliverySlot}
          selectedDeliveryTypeIds={selectedDeliveryTypeIds}
          onChangeDeliverySlot={(newDeliverySlot) => {
            onChangeDeliverySlots(
              [...deliverySlots].map((deliverySlot) =>
                deliverySlot._id === newDeliverySlot._id
                  ? newDeliverySlot
                  : deliverySlot
              )
            );
          }}
          onDeleteDeliverySlot={() => {
            handleDeleteDeliverySlot(deliverySlot._id as string);
          }}
        />
      ))}
      <div
        onClick={handleAddDeliverySlot}
        className="w-full flex items-center justify-center gap-1.5 py-2 transition-all duration-300 cursor-pointer bg-teal-200 border border-teal-400 hover:text-white hover:bg-teal-600 hover:border-teal-600 rounded-lg my-2"
      >
        <Plus
          strokeWidth={1.5}
          width={18}
          height={18}
        />
        <span>{" Add another"}</span>
      </div>
    </section>
  );
}
