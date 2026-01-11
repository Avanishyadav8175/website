// utils
import { memo } from "react";

// types
import { type Children } from "@/common/types/reactTypes";

function NewCustomerAuthWrapper({ children }: { children: Children }) {
  return (
    <div className="flex justify-start px-4 gap-12 overflow-hidden *:overflow-hidden w-device sm:w-[500px]">
      {children}
    </div>
  );
}

export default memo(NewCustomerAuthWrapper);
