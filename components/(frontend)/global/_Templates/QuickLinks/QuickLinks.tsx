import QuickLink from "./QuickLink";

export default function QuickLinks({
  quickLinks
}: {
  quickLinks: Array<{
    _id: string;
    heading: string;
    content: Array<{ _id: string; label: string; url: string }>;
  }>;
}) {
  return (
    <div className="flex flex-col justify-start gap-4 sm:gap-4">
      {quickLinks.map(({ heading, content }, index) => (
        <div key={index}>
          <div className="text-lg mb-1">{heading}</div>
          <div className="font-light max-sm:text-sm">
            {content.map(({ label, url }, index2) => (
              <QuickLink
                key={index2}
                label={label}
                url={url}
                isLast={index2 === content.length - 1}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
