import { Children } from "@/common/types/reactTypes";

export default function FrontendCategoryListProductsLayout({
  children,
  isProduct
}: {
  children: Children;
  isProduct?: boolean;
}) {
  return (
    <main className={`pt-3 pb-3 ${isProduct ? "px-0.5" : "px-2"} 1200:px-0`}>
      {children}
    </main>
  );
}
