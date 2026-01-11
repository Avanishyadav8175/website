import { Children } from "@/common/types/reactTypes";

export default function FrontendCategoryFilterLayout({
  title,
  children
}: {
  title: string;
  children: Children;
}) {
  return (
    <section className="sticky top-4 h-fit max-sm:hidden sm:row-span-6 sm:pl-3 1200:pl-0 flex flex-col justify-start gap-2 min-w-[180px]">
      <span className="text-lg font-medium">{title}</span>
      {children}
    </section>
  );
}
