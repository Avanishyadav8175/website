// components
import Content from "./Content";

// types
import { type ContentDocument } from "@/common/types/documentation/contents/content";

export default function Contents({
  type,
  contents,
  checkIsSelected,
  onToggleSelect
}: {
  type: "product" | "service" | "both";
  contents: ContentDocument[];
  checkIsSelected: (addonId: string) => boolean;
  onToggleSelect: (addonId: string) => void;
}) {
  return (
    <section
      className={`max-h-[60dvh] h-[60dvh] overflow-y-scroll border border-charcoal-3/50 rounded-xl scrollbar-hide`}
    >
      {contents.length ? (
        <div className={`grid grid-cols-7 gap-5 items-stretch justify-start`}>
          {contents.map((content) => (
            <Content
              key={content._id as string}
              content={content}
              isSelected={checkIsSelected(content._id as string)}
              onToggleSelect={() => {
                onToggleSelect(content._id as string);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[16px] font-semibold capitalize">
          {`No ${type === "both" ? "Products" : type === "product" ? "Product" : "Service"}`}
        </div>
      )}
    </section>
  );
}
