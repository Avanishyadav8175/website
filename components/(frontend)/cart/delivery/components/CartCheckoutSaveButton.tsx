// hooks
import { useMediaQuery } from "usehooks-ts";

// constants
import { IS_MOBILE } from "@/common/constants/mediaQueries";

export default function CartCheckoutSaveButton({
  disabled,
  onSave
}: {
  disabled: boolean;
  onSave: () => void;
}) {
  const isMobile = useMediaQuery(IS_MOBILE);

  return (
    <div
      className={`${isMobile ? " p-4 pb-2 z-30" : "pt-6 pb-3.5 max-sm:border-t border-charcoal-3/10 px-3.5 max-sm:sticky max-sm:bottom-0 flex items-end"}`}
    >
      <div
        onClick={onSave}
        className={`${disabled ? "bg-ash-3 opacity-85 pointer-events-none" : "bg-charcoal-3"} text-white text-center px-5 ${isMobile ? "py-3" : "py-3"} rounded-lg cursor-pointer w-full`}
      >
        Save Details
      </div>
    </div>
  );
}
