import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";
import CustomDialog from "@/common/helpers/CustomDialog";
import { SelectOption } from "@/common/types/inputs";
import { SetStateType } from "@/common/types/reactTypes";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";

export default function AdminOptionsSidebar({
  openOptions,
  setOpenOptions,
  availableSorts,
  sortBy,
  setSortBy,
  orderBy,
  setOrderBy
}: {
  openOptions: boolean;
  setOpenOptions: SetStateType<boolean>;
  availableSorts: SelectOption[];
  sortBy: string;
  setSortBy: SetStateType<string>;
  orderBy: "asc" | "desc";
  setOrderBy: SetStateType<"asc" | "desc">;
}) {
  return (
    <CustomDialog
      open={openOptions}
      onOpenChange={setOpenOptions}
    >
      <div className="text-2xl mb-2 font-light">Sort By</div>
      <div className="flex items-center justify-start gap-2.5">
        {availableSorts.map(({ label, value }, index) => (
          <div
            onClick={
              value === sortBy
                ? () => {}
                : () => {
                    setSortBy((prev) => value);
                  }
            }
            className={`px-4 py-2 border bg-neutral-100 text-sm text-neutral-800 rounded-lg transition-all duration-300 ${value === sortBy ? "bg-teal-400/25 border-teal-700 text-teal-900" : "cursor-pointer hover:bg-neutral-200"}`}
            key={index}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="text-2xl mt-5 mb-2 font-light">Order By</div>
      <div className="flex items-center justify-start gap-2.5">
        <div
          onClick={
            orderBy === "asc"
              ? () => {}
              : () => {
                  setOrderBy((prev) => "asc");
                }
          }
          className={`px-4 flex items-center justify-center gap-1.5 py-2 border bg-neutral-100 text-sm text-neutral-800 rounded-lg transition-all duration-300 ${orderBy === "asc" ? "bg-teal-400/25 border-teal-700 text-teal-900" : "cursor-pointer hover:bg-neutral-200"}`}
        >
          <ArrowDownAZ
            strokeWidth={1.5}
            width={15}
            height={15}
          />
          <span>Ascending</span>
        </div>

        <div
          onClick={
            orderBy === "desc"
              ? () => {}
              : () => {
                  setOrderBy((prev) => "desc");
                }
          }
          className={`px-4 flex items-center justify-center gap-1.5 py-2 border bg-neutral-100 text-sm text-neutral-800 rounded-lg transition-all duration-300 ${orderBy === "desc" ? "bg-teal-400/25 border-teal-700 text-teal-900" : "cursor-pointer hover:bg-neutral-200"}`}
        >
          <ArrowDownZA
            strokeWidth={1.5}
            width={15}
            height={15}
          />
          <span>Descending</span>
        </div>
      </div>

      <div className="mt-5 text-2xl mb-2 font-light">Filter By</div>
      <div>...</div>

      <div
        className={`${BUTTON_STYLES.PRIMARY} w-fit text-white bg-teal-600 mt-4`}
        onClick={() => setOpenOptions((prev) => false)}
      >
        Done
      </div>
    </CustomDialog>
  );
}
