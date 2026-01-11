// hooks
import { useCart } from "@/hooks/useOptimizedCart/useCart";

// components
import CartItem from "./components/CartItem";

// types
import { type CartItemDocument } from "@/common/types/documentation/nestedDocuments/cartItem";
import { INRSymbol } from "@/common/constants/symbols";

export default function CartItems() {
  // hooks
  const { savingAmount, items, onChangeItems } = useCart();

  // event handlers
  const handleChangeItem = (changedItem: CartItemDocument) => {
    onChangeItems(
      [...items].map((item) =>
        item._id === changedItem._id ? changedItem : item
      )
    );
  };

  const handleDeleteItem = (itemId: string) => {
    onChangeItems(items.filter(({ _id }) => _id !== itemId));
  };

  return (
    <div
      className={
        "px-3 min-[1350px]:px-0 flex flex-col justify-start transition-all duration-300 gap-4 mb-3 max-lg:py-3 lg:pb-20 lg:row-start-2 lg:col-start-1 lg:row-span-5 max-lg:px-2"
      }
    >
      <div className="font-medium text-sm flex items-center justify-between gap-x-2  my-1.5">
        <span className="  text-charcoal-3/70">
          Your Products
        </span>
        {savingAmount && (
          <span className="text-green-600">🥳 {INRSymbol}{savingAmount} saved on this order!</span>
        )}
      </div>
      {items.map((item) => (
        <div
          className="lg:space-y-4"
          key={item._id as string}
        >
          <CartItem
            item={item}
            onChangeItem={handleChangeItem}
            onDeleteItem={handleDeleteItem}
          />
        </div>
      ))}
    </div>
  );
}
