import { HorizontalSpacing } from "../../../global/_Spacings/HorizontalSpacings";
import FrontendCartItem from "./components/CartItem";
import { CartItemChoiceType } from "../static/types";
import { CartItemType } from "@/components/pages/(frontend)/Transaction/Cart/CartWithHook";
import { useCart } from "@/hooks/useCart";
import moment from "moment";

export default function FrontendCartItems({
  itemChoices,
  cartItems
}: {
  itemChoices: CartItemChoiceType[];
  cartItems: CartItemType[];
}) {
  const {
    cartFunctions: {
      updateCartContext: { updateItems }
    }
  } = useCart();

  const updateChoices = (
    newCartItems: CartItemType,
    newChoices: CartItemChoiceType
  ) => {
    const selectedId = newChoices._id;
    const itemExists = itemChoices.find(({ _id }) => _id === selectedId);
    if (itemExists)
      updateItems({
        items: cartItems.map((newItem) =>
          newItem._id === selectedId ? newCartItems : newItem
        ),
        itemDetails: itemChoices.map((choice) =>
          choice._id === selectedId ? newChoices : choice
        )
      });
  };

  const deleteItem = (itemId: string) => {
    const updatedItemList = cartItems.filter(({ _id }) => _id !== itemId);
    const updatedItemChoiceList = itemChoices.filter(
      ({ _id }) => _id !== itemId
    );
    updateItems({ items: updatedItemList, itemDetails: updatedItemChoiceList });
  };

  const itemAlreadyInCartWithSelectedDate = ({
    contentId,
    selectedDate
  }: {
    contentId: string;
    selectedDate: Date;
  }) => {
    const existingItems = cartItems.map(({ contentId: _id, date }) => ({
      _id,
      date
    }));
    const thisContentAlreadyInCart = existingItems.find(({ _id, date }) => {
      // rule out different contents
      if (contentId !== _id) return false;
      // rule out different dates
      if (!moment(new Date(selectedDate)).isSame(moment(new Date(date))))
        return false;
      // at this stage, dates and contents are both same
      return true;
    });

    if (thisContentAlreadyInCart) return true;
    return false;
  };

  return (
    <HorizontalSpacing className="flex flex-col justify-start transition-all duration-300 gap-4 mb-3 max-sm:py-3 sm:pb-20 sm:row-start-4 sm:col-start-1 sm:row-span-5 max-sm:px-0">
      <span className="text-center tracking-wider text-charcoal-3/40 pt-1.5">
        ITEM(S) ADDED
      </span>
      {itemChoices.map((itemChoice, index) => (
        <div
          className="sm:space-y-4"
          key={index}
        >
          <FrontendCartItem
            itemChoice={itemChoice}
            cartItem={cartItems.find(({ _id }) => _id === itemChoice._id)}
            updateChoices={updateChoices}
            deleteItem={() => deleteItem(itemChoice._id)}
            key={index}
            itemAlreadyInCartWithSelectedDate={
              itemAlreadyInCartWithSelectedDate
            }
          />
        </div>
      ))}
    </HorizontalSpacing>
  );
}
