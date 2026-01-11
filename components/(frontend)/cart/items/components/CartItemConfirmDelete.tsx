// constants
import { IS_MOBILE } from "@/common/constants/mediaQueries";

// hooks
import { useMediaQuery } from "usehooks-ts";

export default function CartItemConfirmDelete({
  onConfirm,
  onCancel
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  // hooks
  const isMobile = useMediaQuery(IS_MOBILE);

  return (
    <div
      onClick={
        isMobile
          ? () => {
              onConfirm();
            }
          : () => {}
      }
      className="z-20 text-sm border border-red-500 bg-gradient-to-r from-transparent to-60% to-red-50/50 rounded-3xl text-red-500 flex items-center justify-end max-sm:px-4 px-[17px] max-sm:cursor-pointer"
    >
      <span className="sm:hidden">Remove</span>

      <div className="flex flex-col items-center justify-center max-sm:hidden">
        <span>Remove ?</span>
        <div className="flex items-center justify-center">
          <span
            className="cursor-pointer px-2 py-1 transition-all duration-300 hover:underline hover:underline-offset-2"
            onClick={() => {
              onConfirm();
            }}
          >
            Yes
          </span>
          <span
            className="cursor-pointer px-2 py-1 transition-all duration-300 hover:underline hover:underline-offset-2"
            onClick={() => {
              onCancel();
            }}
          >
            No
          </span>
        </div>
      </div>
    </div>
  );
}
