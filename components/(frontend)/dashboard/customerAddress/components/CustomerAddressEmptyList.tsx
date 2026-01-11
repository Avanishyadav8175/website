import { LocateOff, Plus } from "lucide-react";

export default function CustomerAddressEmptyList({
  onAdd
}: {
  onAdd: () => void;
}) {
  return (
    <>
      <div className="text-charcoal-3/75 text-lg flex flex-col justify-center items-center gap-4">
        <LocateOff
          strokeWidth={1.5}
          width={48}
          height={48}
        />
        <span>No Saved Addresses Found</span>
      </div>
      <div
        onClick={onAdd}
        className="w-fit justify-self-center flex items-center justify-center gap-3 py-2.5 px-5 rounded-xl transition-all duration-300 cursor-pointer bg-sienna text-white hover:bg-sienna-2"
      >
        <Plus
          strokeWidth={1.5}
          width={20}
          height={20}
        />
        <span>Start by adding one</span>
      </div>
    </>
  );
}
