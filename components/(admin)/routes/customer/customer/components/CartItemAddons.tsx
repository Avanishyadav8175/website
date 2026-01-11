// components
import CartItemAddon from "./CartItemAddon";

// types
import { type CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";

export default function CartItemAddons({
  itemAddons
}: {
  itemAddons: CartItemAddonDocument[];
}) {
  return (
    <section className="flex items-center justify-start gap-x-4 overflow-auto scrollbar-hide max-sm:w-[calc(100dvw_-_32px)]">
      {itemAddons.map((itemAddon, i) => (
        <CartItemAddon
          key={i}
          itemAddon={itemAddon}
        />
      ))}
    </section>
  );
}
