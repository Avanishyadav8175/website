// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// components
import ContentPrice from "../../contentPrice/ContentPrice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";

// types
import { type ContentPriceDocument } from "@/common/types/documentation/nestedDocuments/contentPrice";

export default function ContentPriceDialog({
  disabled,
  price,
  onChangePrice
}: {
  disabled?: boolean;
  price: ContentPriceDocument;
  onChangePrice: (newPrice: ContentPriceDocument) => void;
}) {
  return (
    <Dialog>
      {disabled ? (
        <div className="flex items-center justify-center bg-charcoal-3/10 py-2 rounded-lg">
          Price
        </div>
      ) : (
        <DialogTrigger>
          <div className="bg-charcoal-3/10 py-2 rounded-lg">Price</div>
        </DialogTrigger>
      )}
      <DialogContent className="min-w-[70dvw]">
        <DialogHeader></DialogHeader>
        <section className="max-h-[70dvh] overflow-y-scroll scrollbar-hide">
          <ContentPrice
            name="price"
            label="Price"
            value={price}
            onChangeValue={onChangePrice}
          />
        </section>
        <DialogFooter className="flex items-center justify-end gap-5">
          <div className={BUTTON_STYLES.GHOST}>Cancel</div>
          <DialogClose>
            <div className={BUTTON_STYLES.GENESIS}>Done</div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
