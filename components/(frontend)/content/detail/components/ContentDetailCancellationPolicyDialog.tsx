// icons
import { Info } from "lucide-react";

// components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";

// styles
import styles from "../styles/cancellationPolicy.module.scss";

export default function ContentDetailCancellationPolicyDialog({
  cancellationPolicy
}: {
  cancellationPolicy: string;
}) {
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="max-sm:hidden"
      >
        <div className="bg-charcoal-3/10 px-4 py-2 rounded-lg w-fit self-start sm:mt-3 transition-all duration-300 hover:bg-neutral-300/80 cursor-pointer text-charcoal-3 flex items-center justify-end gap-2">
          <Info
            strokeWidth={1.5}
            width={18}
            height={18}
          />
          <h4>Show Cancellation Policy</h4>
        </div>
      </DialogTrigger>
      <DialogContent className="z-[996] gap-0 sm:pt-7 rounded-2xl max-h-[90dvh] overflow-auto scrollbar-hide px-0 *:px-6 pb-0">
        <div className="flex items-center justify-start gap-3">
          <Info
            strokeWidth={1.5}
            width={22}
            height={22}
          />
          <div className="text-xl">Cancellation Policy</div>
        </div>
        <div
          className={styles.container}
          dangerouslySetInnerHTML={{
            __html: cancellationPolicy
          }}
        />
        <DialogClose asChild>
          <div className="sticky bottom-0 bg-ivory-1 pb-5 pt-2.5 border-t border-ash-3/50 flex items-center justify-center">
            <div className=" transition-all duration-300 w-fit rounded-lg py-2 px-6 bg-charcoal-3/15 text-charcoal-3 hover:bg-charcoal-3/30 cursor-pointer">
              Close
            </div>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
