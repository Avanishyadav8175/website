import { WEBSITE_NAME } from "@/common/constants/environmentVariables";

export default function FooterBottomLeft() {
  return (
    <section className="max-sm:row-start-4 text-xs text-charcoal-3 max-sm:text-center flex flex-col items-center sm:items-start justify-center sm:gap-0.5">
      <span>Copyright &copy; {WEBSITE_NAME}</span>
      <span>All rights reserved</span>
    </section>
  );
}
