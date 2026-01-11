import { getChromaticAberrationColor } from "@/components/(frontend)/category/utils/getChromaticAberrationColor";

export default function ContentGalleryTag(tag: {
  label: string;
  color: string;
}) {
  return (
    <div
      className="absolute top-4 right-0 py-1 px-2 sm:px-3 rounded-l-lg text-sm sm:text-base"
      style={{
        background: tag.color,
        color: getChromaticAberrationColor(tag.color)
      }}
    >
      {tag.label}
    </div>
  );
}
