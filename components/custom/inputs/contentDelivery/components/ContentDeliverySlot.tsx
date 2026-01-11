// icons
import { X } from "lucide-react";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createDeliveryTypeAction,
  selectDeliveryType
} from "@/store/features/presets/deliveryTypeSlice";

// components
import AdvancedCheckbox from "@/lib/Forms/Checkbox/AdvancedCheckbox";
import Input from "@/lib/Forms/Input/Input";

// types
import { type ContentDeliverySlotDocument } from "@/common/types/documentation/nestedDocuments/contentDeliverySlot";
import { type SelectOption } from "@/common/types/inputs";

export default function ContentDeliverySlot({
  index,
  deliverySlot,
  selectedDeliveryTypeIds,
  onChangeDeliverySlot,
  onDeleteDeliverySlot
}: {
  index: number;
  deliverySlot: ContentDeliverySlotDocument;
  selectedDeliveryTypeIds: string[];
  onChangeDeliverySlot: (newDeliverySlot: ContentDeliverySlotDocument) => void;
  onDeleteDeliverySlot: () => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const deliveryTypeStatus = useSelector(selectDeliveryType.status);

  const { documents: deliveryTypes, options: deliveryTypeOptions } =
    useSelector((state) =>
      selectDeliveryType.documentList(state, {
        active: true,
        sortBy: "name",
        orderBy: "asc"
      })
    );

  // variables
  const availableDeliveryTypeOptions = deliveryTypeOptions.filter(
    ({ value }) =>
      value === deliverySlot.type || !selectedDeliveryTypeIds.includes(value)
  );

  const deliveryType = deliveryTypes.find(
    ({ _id }) => _id === (deliverySlot.type as string)
  );

  // effects
  useEffect(() => {
    if (deliveryTypeStatus === "idle") {
      dispatch(createDeliveryTypeAction.fetchDocumentList());
    }
  }, [deliveryTypeStatus, dispatch]);

  return (
    <section className="flex flex-col gap-5 relative bg-ash/30 border border-ash rounded-xl p-5">
      <div className="text-xl text-teal-500">{`Delivery Slot ${index + 1}:`}</div>
      <div
        onClick={() => {
          onDeleteDeliverySlot();
        }}
        className="rounded-full bg-red-600 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700 absolute top-0 right-0 translate-x-1 -translate-y-2"
      >
        <X
          strokeWidth={1.5}
          width={16}
          height={16}
        />
      </div>
      <div className="grid grid-cols-[repeat(2,auto)] auto-rows-min gap-x-4 gap-y-3">
        <Input
          type="dropdown"
          name="type"
          labelConfig={{
            label: "Type",
            layoutStyle: "flex-col space-y-2"
          }}
          isRequired={false}
          nullOption={true}
          customInitialValuePlaceholderLabel="Select Type"
          options={availableDeliveryTypeOptions}
          customValue={{
            value: deliverySlot.type as string,
            setValue: (type) => {
              onChangeDeliverySlot({
                ...deliverySlot,
                type
              } as ContentDeliverySlotDocument);
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
        <span className="row-span-3">
          <AdvancedCheckbox
            name="timeSlots"
            label="Time Slots"
            layoutStyle="flex-col space-y-2"
            options={
              deliveryType
                ? deliveryType.timeSlots.map(
                    ({ _id, label }) =>
                      ({ label, value: _id as string }) as SelectOption
                  )
                : []
            }
            selectedValues={deliverySlot.timeSlots as string[]}
            onChangeSelectedValues={(timeSlots) => {
              onChangeDeliverySlot({
                ...deliverySlot,
                timeSlots
              } as ContentDeliverySlotDocument);
            }}
          />
        </span>
        <Input
          type="number"
          name="price"
          isRequired={false}
          labelConfig={{
            label: "Price",
            layoutStyle: "flex-col space-y-2"
          }}
          customValue={{
            value: deliverySlot.price
              ? deliverySlot.price.toString()
              : deliveryType
                ? deliveryType.price.toString()
                : "",
            setValue: (price) => {
              onChangeDeliverySlot({
                ...deliverySlot,
                price: Number(price)
              } as unknown as ContentDeliverySlotDocument);
            }
          }}
          errorCheck={false}
          validCheck={false}
        />
      </div>
    </section>
  );
}
