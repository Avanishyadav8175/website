export default function CartCheckoutDifferentReceiverToggle({
  isActive,
  onToggleActive
}: {
  isActive: boolean;
  onToggleActive: () => void;
}) {
  return (
    <div
      onClick={onToggleActive}
      className={`flex items-center justify-start gap-2 text-charcoal-3/80 text-sm cursor-pointer pt-3.5 pb-2`}
    >
      <div
        className={`relative rounded-full p-1 w-9 flex items-center transition-all duration-300 ${isActive ? "bg-green-200/70" : "bg-ash/70"}`}
      >
        <div
          className={`rounded-full h-3 aspect-square transition-all duration-300 ${isActive ? "translate-x-4 bg-green-500" : "bg-charcoal-3"}`}
        />
      </div>
      <span>Deliver to someone else</span>
    </div>
  );
}
