import ContentInfoBulletPoint from "./ContentInfoBulletPoint";

export default function ContentDetailIncludeExclude({
  includes,
  excludes
}: {
  includes: string[];
  excludes: string[];
}) {
  return (
    <div
      className={
        "py-2.5 flex flex-col justify-start gap-2 text-base text-black/70 sm:pl-0 sm:pt-3.5"
      }
    >
      <div className="grid grid-cols-[20px_1fr] gap-1 justify-start items-start">
        {includes.map((include, i) => (
          <ContentInfoBulletPoint
            key={i}
            text={include}
          />
        ))}
      </div>
      {Boolean(excludes?.length) && (
        <>
          <span className="pl-6 underline underline-offset-4 text-red-800 font-medium">Does not include:</span>
          <div className="grid grid-cols-[20px_1fr] gap-1">
            {excludes.map((exclude, i) => (
              <ContentInfoBulletPoint
                key={i}
                text={exclude}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
