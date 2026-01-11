// components
import ContentInfoBulletPoint from "./ContentInfoBulletPoint";

export default function ContentDetailCareInfo({
  careInfo
}: {
  careInfo: string[];
}) {
  return (
    <div
      className={
        "py-2.5 flex flex-col justify-start gap-3 text-black/80 sm:pl-0 sm:pt-3.5"
      }
    >
      <div className="grid grid-cols-[20px_1fr] gap-1 justify-start items-start">
        {careInfo.map((info, i) => (
          <ContentInfoBulletPoint
            key={i}
            text={info}
          />
        ))}
      </div>
    </div>
  );
}
