// components
import Addon from "./Addon";

// types
import { type AddonDocument } from "@/common/types/documentation/contents/addon";

export default function Addons({
  addons,
  checkIsSelected,
  checkIsPopular,
  onToggleSelect,
  onTogglePopular
}: {
  addons: AddonDocument[];
  checkIsSelected: (addonId: string) => boolean;
  checkIsPopular: (addonId: string) => boolean;
  onToggleSelect: (addonId: string) => void;
  onTogglePopular: (addonId: string) => void;
}) {
  return (
    <section
      className={`max-h-[60dvh] h-[60dvh] overflow-y-scroll scrollbar-hide`}
    >
      {addons.length ? (
        <div className={`grid grid-cols-7 gap-5 items-stretch justify-start`}>
          {addons.map((addon) => (
            <Addon
              key={addon._id as string}
              addon={addon}
              isSelected={checkIsSelected(addon._id as string)}
              isPopular={checkIsPopular(addon._id as string)}
              onToggleSelect={() => {
                onToggleSelect(addon._id as string);
              }}
              onTogglePopular={() => {
                onTogglePopular(addon._id as string);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-[16px] font-semibold capitalize">
          No Addon
        </div>
      )}
    </section>
  );
}
