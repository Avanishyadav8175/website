import { memo } from "react";
import { WEBSITE_NAME } from "@/common/constants/environmentVariables";

function FooterBottomRight() {
  return (
    <section className="sm:w-fit text-charcoal-3 text-xs items-end max-sm:text-center">
      {WEBSITE_NAME} &copy; 2026
    </section>
  );
}


export default memo(FooterBottomRight);
