import { HomepageLayoutDocument } from "@/common/types/documentation/pages/homepageLayout";
import Toggle from "@/lib/Forms/Toggle/Toggle";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

export default function SidebarLayoutBlock({
  label,
  onHover,
  onMoveDown,
  onMoveUp,
  toggled,
  onToggle,
  tag,
  toggleLabel,
  disabled
}: {
  tag: HomepageLayoutDocument["type"] | "title";
  label: string;
  onHover: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  toggled: boolean;
  onToggle: (val: boolean) => void;
  toggleLabel: string;
  disabled: boolean;
}) {
  return (
    <div
      onMouseOver={onHover}
      className={`group/card cursor-pointer z-10 px-3 py-3 rounded-2xl grid grid-cols-[auto_1fr] border ${disabled ? "opacity-60 grayscale border-charcoal-3/10" : "border-charcoal-3/30"} hover:bg-ash/10 hover:border-charcoal-3/40 transition-all duration-300 capitalize`}
    >
      <div className="flex flex-col items-start justify-center max-w-[200px]">
        <Tag tag={tag} />
        <div className="grid *:row-start-1 *:col-start-1 items-center">
          <span
            className={`group-hover/card:opacity-0 opacity-100 pt-1 text-lg ${label[0] === '"' ? "text-charcoal-3/95" : "text-charcoal-3/50"}  translate-y-0.5 line-clamp-1 transition-all duration-300`}
          >
            {label}
          </span>

          <span className="group-hover/card:opacity-100 opacity-0 pt-1 text-lg text-charcoal-3/95 line-clamp-1 transition-all duration-300 translate-y-0.5 flex items-center justify-start gap-1">
            <CustomToggle
              label={""}
              onToggle={onToggle}
              toggled={toggled}
            />
            <span className="text-sm text-charcoal-3/90 whitespace-nowrap">
              {toggleLabel}
            </span>
          </span>
        </div>
      </div>
      <div className="opacity-30 group-hover/card:opacity-100 flex flex-col items-end justify-center gap-2 transition-all duration-300">
        <span
          onClick={onMoveUp}
          className="cursor-pointer group"
        >
          <ArrowBigUp
            strokeWidth={1.5}
            height={20}
            width={20}
            className="group-hover:fill-teal-500 group-hover:text-teal-500 text-charcoal-3/95"
          />
        </span>
        <span
          onClick={onMoveDown}
          className="cursor-pointer group"
        >
          <ArrowBigDown
            strokeWidth={1.5}
            height={20}
            width={20}
            className="group-hover:fill-teal-500 group-hover:text-teal-500 text-charcoal-3/95"
          />
        </span>
      </div>
    </div>
  );
}

const Tag = ({ tag }: { tag: HomepageLayoutDocument["type"] | "title" }) => {
  const commonStyle = "text-[10px] uppercase border py-0.5 px-3 rounded-full";

  if (tag === "title")
    return (
      <span
        className={`${commonStyle} border-blue-600 text-blue-600 bg-blue-50`}
      >
        {tag}
      </span>
    );

  if (tag === "banner")
    return (
      <span
        className={`${commonStyle} border-pink-600 text-pink-600 bg-pink-50`}
      >
        {tag}
      </span>
    );

  if (tag === "category")
    return (
      <span
        className={`${commonStyle} border-amber-600 text-amber-600 bg-amber-50`}
      >
        {tag}
      </span>
    );

  if (tag === "collage")
    return (
      <span
        className={`${commonStyle} border-teal-600 text-teal-600 bg-teal-50`}
      >
        {tag}
      </span>
    );

  if (tag === "content")
    return (
      <span
        className={`${commonStyle} border-rose-600 text-rose-600 bg-rose-50`}
      >
        {tag}
      </span>
    );

  if (tag === "faq")
    return (
      <span
        className={`${commonStyle} border-violet-600 text-violet-600 bg-violet-50`}
      >
        {tag}
      </span>
    );

  if (tag === "quick-link")
    return (
      <span
        className={`${commonStyle} border-orange-600 text-orange-600 bg-orange-50`}
      >
        {tag}
      </span>
    );

  if (tag === "text")
    return (
      <span
        className={`${commonStyle} border-slate-600 text-slate-600 bg-slate-50`}
      >
        {tag}
      </span>
    );
};

export const CustomToggle = ({
  label,
  onToggle,
  toggled
}: {
  label: string;
  toggled: boolean;
  onToggle: (val: boolean) => void;
}) => (
  <div
    onClick={() => onToggle(!toggled)}
    className={`grid grid-cols-[180px_1fr] w-full items-center cursor-pointer max-w-10 scale-95`}
  >
    {label && (
      <span className="font-medium whitespace-nowrap mr-2">{label}</span>
    )}
    <div
      className={`relative rounded-full p-1 w-9 flex items-center transition-all duration-300 ${toggled ? `bg-teal-300/50` : `bg-ash/70`}`}
    >
      <div
        className={`rounded-full h-3 aspect-square transition-all duration-300 ${toggled ? `translate-x-4 bg-teal-700` : `bg-charcoal-3`}`}
      />
    </div>
  </div>
);
