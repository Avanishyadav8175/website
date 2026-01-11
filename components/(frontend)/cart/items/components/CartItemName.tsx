export default function CartItemName({ name }: { name: string }) {
  return (
    <span className="text-charcoal-3/70 text-lg font-medium py-0.5 grid items-start sm:items-center justify-start gap-1">
      <span className="line-clamp-1 leading-tight">{name}</span>
    </span>
  );
}
