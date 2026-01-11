export default function ContentAddonHeader({
  categories,
  selectedCategory,
  onChangeSelectedCategory
}: {
  categories: string[];
  selectedCategory: string;
  onChangeSelectedCategory: (selectedCategory: string) => void;
}) {
  return (
    <div className="flex flex-col justify-start shadow-light z-20">
      <span className="text-xl font-medium pt-6 pb-3 px-5">Select Addons</span>
      <div className="flex items-center justify-start gap-1 overflow-x-scroll scrollbar-hide">
        {categories.map((category, i) => (
          <div
            key={i}
            onClick={() => {
              onChangeSelectedCategory(category);
            }}
            className={`capitalize whitespace-nowrap py-2.5 px-5 border-b-[3px] cursor-pointer ${category === selectedCategory ? "border-sienna text-sienna" : "border-transparent hover:border-ash/60"} transition-all duration-300`}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}
