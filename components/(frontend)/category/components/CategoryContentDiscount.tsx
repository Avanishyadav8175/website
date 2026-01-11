// utils
import { memo } from "react";

function CategoryContentDiscount({ discount }: { discount: number }) {
  return (
    <div className="text-sm font-medium text-green-700">
      {`${discount}% off`}
    </div>
  );
}

export default memo(CategoryContentDiscount);
