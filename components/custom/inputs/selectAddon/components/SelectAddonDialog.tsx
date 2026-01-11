// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createAddonAction,
  selectAddon
} from "@/store/features/contents/addonSlice";

// components
import Addons from "./Addons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import SelectAddonDialogQuery from "./SelectAddonDialogQuery";

// types
import { type ContentAddonDocument } from "@/common/types/documentation/nestedDocuments/contentAddon";

export default function SelectAddonDialog({
  selectedAddons,
  onChangeSelectedAddons
}: {
  selectedAddons: ContentAddonDocument[];
  onChangeSelectedAddons: (newSelectedAddons: ContentAddonDocument[]) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const addonStatus = useSelector(selectAddon.status);

  const { documents: addons } = useSelector((state) =>
    selectAddon.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // states
  const [filter, setFilter] = useState<
    "" | "edible" | "popular" | "selected" | "not-selected"
  >("");

  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // variables
  const selectedAddonIds = selectedAddons.map(({ addon }) => addon as string);
  const popularAddonIds = selectedAddons
    .filter(({ isPopular }) => isPopular)
    .map(({ addon }) => addon as string);

  const filteredAddons = addons
    .filter(({ _id, edible: { isEdible } }) => {
      if (filter) {
        if (filter === "edible") {
          return isEdible;
        } else if (filter === "popular") {
          return popularAddonIds.includes(_id as string);
        } else if (filter === "selected") {
          return selectedAddonIds.includes(_id as string);
        } else if (filter === "not-selected") {
          return !selectedAddonIds.includes(_id as string);
        }
      } else {
        return true;
      }
    })
    .filter(({ category }) => {
      if (categoryFilter) {
        return category === categoryFilter;
      } else {
        return true;
      }
    })
    .filter(({ name }) => {
      if (searchKeyword) {
        return name.toLowerCase().includes(searchKeyword.toLowerCase());
      } else {
        return true;
      }
    });

  const isAllSelected =
    Boolean(filteredAddons.length) &&
    filteredAddons.length ===
      filteredAddons.filter((addon) =>
        selectedAddonIds.includes(addon._id as string)
      ).length;

  // handlers
  const handleCheckIsSelected = (addonId: string) =>
    selectedAddonIds.includes(addonId);

  const handleCheckIsPopular = (addonId: string) =>
    popularAddonIds.includes(addonId);

  const handleToggleSelect = (addonId: string) => {
    if (selectedAddonIds.includes(addonId)) {
      onChangeSelectedAddons(
        [...selectedAddons].filter(
          ({ addon: selectedAddon }) => selectedAddon !== addonId
        )
      );
    } else {
      onChangeSelectedAddons([
        ...selectedAddons,
        {
          addon: addonId,
          isPopular: false
        } as ContentAddonDocument
      ]);
    }
  };

  const handleTogglePopular = (addonId: string) => {
    onChangeSelectedAddons(
      [...selectedAddons].map((selectedAddon) => {
        if (selectedAddon.addon === addonId) {
          selectedAddon.isPopular = !selectedAddon.isPopular;
        }

        return selectedAddon;
      })
    );
  };

  const handleSelectAll = () => {
    const addonsToBeAdded = filteredAddons.filter(
      ({ _id }) => !selectedAddonIds.includes(_id as string)
    );

    onChangeSelectedAddons([
      ...selectedAddons,
      ...addonsToBeAdded.map(
        ({ _id }) =>
          ({ addon: _id as string, isPopular: false }) as ContentAddonDocument
      )
    ]);
  };

  const handleDeselectAll = () => {
    onChangeSelectedAddons(
      selectedAddons.filter(
        ({ addon }) => !filteredAddons.find(({ _id }) => _id === addon)
      )
    );
  };

  const handleResetQuery = () => {
    setFilter("");
    setCategoryFilter("");
    setSearchKeyword("");
  };

  // effects
  useEffect(() => {
    if (addonStatus === "idle") {
      dispatch(createAddonAction.fetchDocumentList());
    }
  }, [addonStatus, dispatch]);

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="w-fit"
      >
        <div className="bg-black text-white py-2 px-6 text-[14px] flex items-center justify-end gap-1 rounded-lg cursor-pointer">
          + &nbsp; Select addon
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-fit ">
        <DialogTitle>
          <section className="w-full">
            <div className="capitalize">select addons</div>
          </section>
        </DialogTitle>
        <div className="px-1 pt-5 min-w-[90dvw]">
          <SelectAddonDialogQuery
            isAllSelected={isAllSelected}
            filter={filter}
            categoryFilter={categoryFilter}
            searchKeyword={searchKeyword}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onChangeFilter={setFilter}
            onChangeCategoryFilter={setCategoryFilter}
            onChangeSearchKeyword={setSearchKeyword}
            onResetQuery={handleResetQuery}
          />
          <Addons
            addons={filteredAddons}
            checkIsSelected={handleCheckIsSelected}
            checkIsPopular={handleCheckIsPopular}
            onToggleSelect={handleToggleSelect}
            onTogglePopular={handleTogglePopular}
          />
          <DialogClose className="flex items-center justify-end w-full pt-5">
            <div className="min-w-24 px-4 py-2 bg-blue-800 text-white rounded-lg">
              {"Done"}
            </div>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
