// icons
import { RotateCw } from "lucide-react";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createContentCategoryAction,
  selectContentCategory
} from "@/store/features/categories/contentCategorySlice";

// components
import Input from "@/lib/Forms/Input/Input";

export default function SelectContentDialogQuery(
  props: {
    selectSingle?: boolean;
    isAllSelected: boolean;
    filter: "" | "selected" | "not-selected";
    activationFilter: "" | "active" | "inactive";
    categoryFilter: string;
    searchKeyword: string;
    onSelectAll: () => void;
    onDeselectAll: () => void;
    onChangeFilter: (newFilter: "" | "selected" | "not-selected") => void;
    onChangeActivationFilter: (
      newActivationFilter: "" | "active" | "inactive"
    ) => void;
    onChangeCategoryFilter: (newCategoryFilter: string) => void;
    onChangeSearchKeyword: (newSearchKeyword: string) => void;
    onResetQuery: () => void;
  } & (
    | {
        type: "product" | "service";
      }
    | {
        type: "both";
        typeFilter: "" | "product" | "service";
        onChangeTypeFilter: (newTypeFilter: "" | "product" | "service") => void;
      }
  )
) {
  // props
  const {
    type,
    selectSingle,
    isAllSelected,
    filter,
    activationFilter,
    categoryFilter,
    searchKeyword,
    onSelectAll,
    onDeselectAll,
    onChangeFilter,
    onChangeActivationFilter,
    onChangeCategoryFilter,
    onChangeSearchKeyword,
    onResetQuery
  } = props;

  // hooks
  const dispatch = useDispatch();

  // redux
  const contentCategoryStatus = useSelector(selectContentCategory.status);

  const { options: contentCategoryOptions } = useSelector((state) =>
    selectContentCategory.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // effects
  useEffect(() => {
    if (contentCategoryStatus === "idle") {
      dispatch(createContentCategoryAction.fetchDocumentList());
    }
  }, [contentCategoryStatus, dispatch]);

  return (
    <section
      className={`grid ${type === "both" ? (selectSingle ? "grid-cols-[3fr_3fr_4fr_1fr]" : "grid-cols-[2fr_3fr_3fr_4fr_1fr]") : selectSingle ? "grid-cols-[3fr_3fr_3fr_4fr_1fr]" : "grid-cols-[2fr_3fr_3fr_3fr_4fr_1fr]"} w-full items-center justify-between gap-4 pb-3`}
    >
      {!selectSingle && (
        <div
          className={`text-zinc-900 rounded-lg text-center py-2 px-6 cursor-pointer transition-all duration-300 border-[1.5px] ${isAllSelected === undefined || !isAllSelected ? " border-zinc-500 hover:border-black/80 hover:bg-zinc-100" : "bg-zinc-200 border-transparent"}`}
          onClick={isAllSelected ? onDeselectAll : onSelectAll}
        >
          {isAllSelected ? "Deselect All" : "Select All"}
        </div>
      )}
      {/* {type === "both" && (
        <Input
          type="dropdown"
          name="filter"
          isRequired={false}
          errorCheck={false}
          validCheck={false}
          nullOption={false}
          options={[
            {
              label: "Product & Service",
              value: ""
            },
            {
              label: "Product",
              value: "product"
            },
            {
              label: "Service",
              value: "service"
            }
          ]}
          customValue={{
            value: props.typeFilter as string,
            setValue: (newTypeFilter) => {
              props.onChangeTypeFilter(
                newTypeFilter as "" | "product" | "service"
              );
            }
          }}
        />
      )} */}
      {/* <Input
        type="dropdown"
        name="filter"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        nullOption={false}
        options={[
          {
            label: "Active & Inactive",
            value: ""
          },
          {
            label: "Active",
            value: "active"
          },
          {
            label: "Inactive",
            value: "inactive"
          }
        ]}
        customValue={{
          value: activationFilter as string,
          setValue: (newActivationFilter) => {
            onChangeActivationFilter(
              newActivationFilter as "" | "active" | "inactive"
            );
          }
        }}
      /> */}
      {/* <Input
        type="dropdown"
        name="filter"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        nullOption={false}
        options={[
          {
            label: "Selected & Not Selected",
            value: ""
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
            onChangeFilter(newFilter as "" | "selected" | "not-selected");
          }
        }}
      /> */}
      <Input
        type="dropdown"
        name="categories"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        nullOption={false}
        options={[
          { label: "All Categories", value: "" },
          ...contentCategoryOptions
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
