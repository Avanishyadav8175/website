// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createFlavourAction,
  selectFlavour
} from "@/store/features/presets/flavourSlice";

// types
import { type CartItemFlavourDocument } from "@/common/types/documentation/nestedDocuments/cartItemFlavour";

export default function OrderItemFlavour({
  itemFlavour: { label, flavour: flavourId, price }
}: {
  itemFlavour: CartItemFlavourDocument;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux states
  const flavourStatus = useSelector(selectFlavour.status);

  const { documents: flavours } = useSelector(selectFlavour.documentList);

  // variables
  const flavour = flavours.find(({ _id }) => _id === flavourId);

  // side effects
  useEffect(() => {
    if (flavourStatus === "idle") {
      dispatch(createFlavourAction.fetchDocumentList());
    }
  }, [flavourStatus, dispatch]);

  return (
    <section className="flex flex-col gap-1">
      <span className="text-lg font-semibold underline">{label}</span>
      {flavour && (
        <section className="flex flex-col">
          <span>{flavour?.name || ""}</span>
          <span>{`₹ ${price}`}</span>
        </section>
      )}
    </section>
  );
}
