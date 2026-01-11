import { memo, ReactNode } from "react";

function WidthWrapper({
  children,
  className,
  fullWidth
}: {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`min-[640px]:!px-5 ${fullWidth ? "overflow-x-hidden" : "w-device min-[1300px]:w-1200 relative left-1/2 -translate-x-1/2"} ${className || ""}`}
    >
      {children}
    </div>
  );
}

export default memo(WidthWrapper);
