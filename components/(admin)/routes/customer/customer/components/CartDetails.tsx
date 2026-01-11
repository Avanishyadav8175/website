// icons
import { Eye } from "lucide-react";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createCartAction,
  selectCart
} from "@/store/features/dynamic/cartSlice";

// components
import CartItem from "./CartItem";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

export default function CartDetails({ cartId }: { cartId: string }) {
  // hooks
  const dispatch = useDispatch();

  const [open, setOpen] = useState<boolean>(false);

  // redux states
  const cartStatus = useSelector(selectCart.status);

  const { documents: carts } = useSelector(selectCart.documentList);

  // variables
  const cart = carts.find(({ _id }) => _id === cartId);

  const cartItems = cart?.items || [];

  // side effects
  useEffect(() => {
    if (cartStatus === "idle") {
      dispatch(createCartAction.fetchDocumentList());
    }
  }, [cartStatus, dispatch]);

  if (cart === undefined) {
    return <span className="text-sm">Cart unavailable</span>;
  }

  return (
    <>
      <Eye
        className="cursor-pointer"
        strokeWidth={1.5}
        width={16}
        height={16}
        onClick={() => setOpen((prev) => true)}
      />
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="p-4 pb-0 sm:py-5 sm:px-8 outline-none border-none bg-ivory-1 rounded-none sm:rounded-2xl grid grid-cols-1 sm:grid-cols-[4fr_1.5fr] max-sm:w-device max-sm:h-device sm:min-w-[calc(85dvw_+_60px)] max-sm:gap-y-8 sm:gap-x-12 sm:h-[95dvh] max-sm:overflow-auto">
          <DialogHeader className="hidden">
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <section className="flex flex-col gap-5 sm:overflow-y-scroll scrollbar-hide">
            <section className="flex flex-col border-t border-charcoal-3/30 max-sm:mt-3">
              {cartItems.map((cartItem) => (
                <CartItem
                  key={cartItem._id as string}
                  orderItem={cartItem}
                />
              ))}
            </section>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
}
