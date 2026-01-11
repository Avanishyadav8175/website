import CartItemAddon from "./CartItemAddon";

// types
import { type CartItemAddonDocument } from "@/common/types/documentation/nestedDocuments/cartItemAddon";

export default function CartItemAddons({
  addons,
  onChangeAddons
}: {
  addons: CartItemAddonDocument[];
  onChangeAddons: (addons: CartItemAddonDocument[]) => void;
}) {
  // event handlers
  const handleChangeAddon = (updatedAddon: CartItemAddonDocument) => {
    onChangeAddons(
      [...addons].map((addon) =>
        addon._id === updatedAddon._id ? updatedAddon : addon
      )
    );
  };

  const handleDelete = (addonId: string) => {
    onChangeAddons(addons.filter(({ _id }) => _id !== addonId));
  };

  if (!addons.length) {
    return <></>;
  }

  return (
    <div className="row-start-8 col-start-1 col-span-3 flex flex-col items-stretch justify-start gap-x-5 gap-y-1 px-4 max-sm:my-3 my-2 max-sm:text-sm text-charcoal-3/50 mt-2 sm:mt-4">
      {addons.map((addon) => (
        <CartItemAddon
          key={addon._id as string}
          addon={addon}
          onChangeAddon={handleChangeAddon}
          onDelete={() => {
            handleDelete(addon._id as string);
          }}
        />
      ))}
    </div>
  );
}
