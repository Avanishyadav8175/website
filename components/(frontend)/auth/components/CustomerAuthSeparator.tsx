// utils
import { memo } from "react";

// hooks
import { useCustomerAuth } from "@/hooks/auth/useCustomerAuth";

function CustomerAuthSeparator({
  label,
  showChange
}: {
  label?: string;
  showChange?: boolean;
}) {
  // hooks
  const {
    method: { onChangeIdentification }
  } = useCustomerAuth();

  return (
    <div
      className={`grid ${label ? "grid-cols-[1fr_auto_1fr] gap-x-2" : "grid-cols-[1fr_1fr] gap-x-0"}  text-charcoal-3/50 lg:text-lg`}
    >
      <span className="grid grid-cols-1 items-center">
        <span className="h-[1px] bg-charcoal-3/20" />
      </span>
      {Boolean(label) && (
        <div className="flex items-center justify-center gap-2">
          <span>{label}</span>
          {showChange && (
            <span
              onClick={() => {
                onChangeIdentification("unidentified");
              }}
              className="text-xs text-blue-600 cursor-pointer"
            >
              (change)
            </span>
          )}
        </div>
      )}
      <span className="grid grid-cols-1 items-center">
        <span className="h-[1px] bg-charcoal-3/20" />
      </span>
    </div>
  );
}

export default memo(CustomerAuthSeparator);
