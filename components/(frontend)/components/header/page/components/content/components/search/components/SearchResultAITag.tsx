export default function SearchResultAITag({
  name,
  collapse
}: {
  name: string;
  collapse: () => void;
}) {
  return (
    <span
      onClick={collapse}
      className="text-sm border border-px sm:border-charcoal-3/50 px-3 py-1 rounded-full cursor-pointer transition-all duration-300 hover:shadow-md hover:bg-sienna hover:text-white hover:border-sienna"
    >
      {name}
    </span>
  );
}
