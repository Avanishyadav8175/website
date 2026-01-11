// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createUpgradeAction,
  selectUpgrade
} from "@/store/features/presets/upgradeSlice";

// types
import { type CartItemUpgradeDocument } from "@/common/types/documentation/nestedDocuments/cartItemUpgrade";

export default function OrderItemUpgrade({
  itemUpgrade: { label, upgrade: upgradeId, price }
}: {
  itemUpgrade: CartItemUpgradeDocument;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux states
  const upgradeStatus = useSelector(selectUpgrade.status);

  const { documents: upgrades } = useSelector(selectUpgrade.documentList);

  // variables
  const upgrade = upgrades.find(({ _id }) => _id === upgradeId);

  // side effects
  useEffect(() => {
    if (upgradeStatus === "idle") {
      dispatch(createUpgradeAction.fetchDocumentList());
    }
  }, [upgradeStatus, dispatch]);

  return (
    <section className="flex flex-col gap-1">
      <span className="text-lg font-semibold underline">{label}</span>
      {upgrade && (
        <section className="flex flex-col">
          <span>{upgrade?.label || ""}</span>
          <span>{`₹ ${price}`}</span>
        </section>
      )}
    </section>
  );
}
