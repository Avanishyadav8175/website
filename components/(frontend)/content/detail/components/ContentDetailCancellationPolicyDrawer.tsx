// icons
import { Info } from "lucide-react";

// components
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";

// styles
import styles from "../styles/cancellationPolicy.module.scss";

export default function ContentDetailCancellationPolicyDrawer({
  cancellationPolicy
}: {
  cancellationPolicy: string;
}) {
  return (
    <Drawer>
      <DrawerTrigger
        asChild
        className="sm:hidden"
      >
        <div className="bg-charcoal-3/10 px-4 py-2 rounded-xl w-fit self-end sm:mt-3 transition-all duration-300 hover:bg-neutral-300/80 cursor-pointer text-charcoal-3 flex items-center justify-end gap-2">
          <Info
            strokeWidth={1.5}
            width={18}
            height={18}
          />
          <span>Show Cancellation Policy</span>
        </div>
      </DrawerTrigger>
      <DrawerContent className="z-[996] px-3.5 pt-8 pb-3 outline-none border-none  gap-0 sm:pt-7 rounded-t-3xl h-[80dvh] overflow-auto scrollbar-hide space-y-4">
        <div className="flex items-center justify-start gap-3">
          <Info
            strokeWidth={1.5}
            width={20}
            height={20}
          />
          <div className="text-xl">Cancellation Policy</div>
        </div>
        <div className="overflow-auto scrollbar-hide h-[63dvh]">
          <div
            dangerouslySetInnerHTML={{
              __html: cancellationPolicy
            }}
            className={styles.container}
          />
        </div>
        <div className="flex items-center justify-center w-full">
          <DrawerClose asChild>
            <div className="transition-all duration-300 w-fit rounded-lg py-2 px-6 bg-charcoal-3/15 text-charcoal-3 hover:bg-charcoal-3/30 cursor-pointer">
              Close
            </div>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
