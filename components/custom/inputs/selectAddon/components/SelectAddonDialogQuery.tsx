// icons
import { RotateCw } from "lucide-react";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createAddonCategoryAction,
  selectAddonCategory
} from "@/store/features/categories/addonCategorySlice";

// components
import Input from "@/lib/Forms/Input/Input";

export default function SelectAddonDialogQuery({
  isAllSelected,
  filter,
  categoryFilter,
  searchKeyword,
  onSelectAll,
  onDeselectAll,
  onChangeFilter,
  onChangeCategoryFilter,
  onChangeSearchKeyword,
  onResetQuery
}: {
  isAllSelected: boolean;
  filter: "" | "edible" | "popular" | "selected" | "not-selected";
  categoryFilter: string;
  searchKeyword: string;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onChangeFilter: (
    newFilter: "" | "edible" | "popular" | "selected" | "not-selected"
  ) => void;
  onChangeCategoryFilter: (newCategoryFilter: string) => void;
  onChangeSearchKeyword: (newSearchKeyword: string) => void;
  onResetQuery: () => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const addonCategoryStatus = useSelector(selectAddonCategory.status);

  const { options: addonCategoryOptions } = useSelector((state) =>
    selectAddonCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // effects
  useEffect(() => {
    if (addonCategoryStatus === "idle") {
      dispatch(createAddonCategoryAction.fetchDocumentList());
    }
  }, [addonCategoryStatus, dispatch]);

  return (
    <section
      className={`grid grid-cols-[1fr_2fr_2fr_4fr_1fr] w-full items-center justify-between gap-4 pb-3`}
    >
      <div
        className={`text-zinc-900 rounded-lg text-center py-2 px-6 cursor-pointer transition-all duration-300 border-[1.5px] ${isAllSelected === undefined || !isAllSelected ? " border-zinc-500 hover:border-black/80 hover:bg-zinc-100" : "bg-zinc-200 border-transparent"}`}
        onClick={isAllSelected ? onDeselectAll : onSelectAll}
      >
        {isAllSelected ? "Deselect All" : "Select All"}
      </div>
      <Input
        type="dropdown"
        name="filter"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        nullOption={false}
        options={[
          {
            label: "All",
            value: ""
          },
          {
            label: "Edible",
            value: "edible"
          },
          {
            label: "Popular",
            value: "popular"
          },
          {
            label: "Selected",
            value: "selected"
          },
          {
            label: "Not Selected",
            value: "not-selected"
          }
        ]}
        customValue={{
          value: filter as string,
          setValue: (newFilter) => {
            onChangeFilter(
              newFilter as
                | ""
                | "edible"
                | "popular"
                | "selected"
                | "not-selected"
            );
          }
        }}
      />
      <Input
        type="dropdown"
        name="categories"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        nullOption={false}
        options={[
          { label: "All Categories", value: "" },
          ...addonCategoryOptions
        ]}
        customValue={{
          value: categoryFilter,
          setValue: (newCategoryFilter) => {
            onChangeCategoryFilter(newCategoryFilter);
          }
        }}
      />
      <Input
        type="text"
        name="search"
        placeholder="search"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        customValue={{
          value: searchKeyword,
          setValue: (newSearchKeyword) => {
            onChangeSearchKeyword(newSearchKeyword);
          }
        }}
      />
      <div
        onClick={onResetQuery}
        className="min-w-24 bg-zinc-500 flex items-center justify-center gap-3 py-2 px-4 rounded-lg cursor-pointer w-full transition-all duration-300 text-center text-white hover:bg-zinc-900"
      >
        <RotateCw
          strokeWidth={2}
          width={16}
          height={16}
        />
        Reset
      </div>
    </section>
  );
}
