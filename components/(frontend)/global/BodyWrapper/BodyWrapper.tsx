import { Children } from "@/common/types/reactTypes";
import MaxWidthWrapper from "../_MaxWidthWrapper/MaxWidthWrapper";

export default function FrontendBodyWrapper({
  children
}: {
  children: Children;
}) {
  return (
    <main className="flex-grow relative">
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </main>
  );
}
