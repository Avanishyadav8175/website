import { memo } from "react";

// types
import { type ReactNode } from "react";

function CustomerAuthMethod({
  icon,
  label,
  onClick
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <div
      className="group flex justify-center sm:justify-start bg-ivory-1 border px-2 border-charcoal-3/20 rounded-md shadow-sm items-center gap-x-1 cursor-pointer text-charcoal-3/80 py-1 gap-y-1.5 sm:gap-y-1 transition-all duration-500"
      onClick={onClick}
    >
      <div className="group-hover:text-sienna group-hover:border-sienna rounded-full aspect-square w-10 h-10 flex items-center justify-center transition-all duration-500">
        {icon}
      </div>
      <span className="group-hover:text-sienna font-medium transition-all duration-500">
        {label}
      </span>
    </div>
  );
}

export default memo(CustomerAuthMethod);
