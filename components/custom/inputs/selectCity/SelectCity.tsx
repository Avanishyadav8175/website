// icons
import { Building2 } from "lucide-react";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createStateAction,
  selectState
} from "@/store/features/presets/stateSlice";
import {
  createCityAction,
  selectCity
} from "@/store/features/presets/citySlice";

// components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import SelectCityUI from "./components/SelectCityUI";
import SelectCityQuery from "./components/SelectCityQuery";

export default function SelectCity({
  selectedCityIds,
  onFinish
}: {
  selectedCityIds?: string[];
  onFinish: (selectedPincodeIds: string[]) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux states
  const stateStatus = useSelector(selectState.status);

  const { options: stateOptions } = useSelector((state) =>
    selectState.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  const cityStatus = useSelector(selectCity.status);

  const { documents: cities } = useSelector((reduxState) =>
    selectCity.documentList(reduxState, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // states
  const [selectedIds, setSelectedIds] = useState<string[]>(
    selectedCityIds || []
  );
  const [stateId, setStateId] = useState<string>("");
  const [showTopCities, setShowTopCities] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");

  // variables
  const selectedCities = [...cities].filter(({ _id }) =>
    selectedIds.includes(_id as string)
  );

  const availableCities = [...cities]
    .filter(({ _id }) => !selectedIds.includes(_id as string))
    .filter(({ state: cityState }) => (stateId ? cityState === stateId : true))
    .filter(({ isTopCity }) => (showTopCities ? Boolean(isTopCity) : true));

  // event handlers
  const handleReset = () => {
    setStateId("");
    setShowTopCities(false);
    setKeyword("");
  };

  // side effects
  useEffect(() => {
    if (stateStatus === "idle") {
      dispatch(createStateAction.fetchDocumentList());
    }
  }, [stateStatus, dispatch]);

  useEffect(() => {
    if (cityStatus === "idle") {
      dispatch(createCityAction.fetchDocumentList());
    }
  }, [cityStatus, dispatch]);

  useEffect(() => {
    if (selectedCityIds && selectedCityIds.length) {
      setSelectedIds(selectedCityIds);
    }
  }, [selectedCityIds]);

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="flex flex-col items-center cursor-pointer"
          title="cities"
        >
          <Building2
            strokeWidth={1.5}
            width={20}
          />
          <span className="text-xs">{selectedIds.length}</span>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-[90dvw] p-5 rounded-lg">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <section className="flex flex-col gap-5">
          <section className="flex items-center justify-between">
            <span className="text-xl font-medium">Cities</span>
            <SelectCityQuery
              stateId={stateId}
              showTopCities={showTopCities}
              keyword={keyword}
              stateOptions={stateOptions}
              onChangeStateId={setStateId}
              onChangeShowTopCities={setShowTopCities}
              onChangeKeyword={setKeyword}
              onReset={handleReset}
            />
          </section>
          <section className="grid grid-cols-[2fr_3fr] gap-5">
            <SelectCityUI
              mode="selected"
              heading="Selected"
              selectedCityIds={selectedIds}
              selectedCities={selectedCities}
              onChangeSelectedCityId={setSelectedIds}
            />
            <SelectCityUI
              mode="not-selected"
              heading="Not Selected"
              selectedCityIds={selectedIds}
              selectedCities={availableCities}
              onChangeSelectedCityId={setSelectedIds}
            />
          </section>
          <section className="flex items-center justify-end">
            <DialogClose>
              <div
                className="px-7 py-2 bg-black text-white rounded-md cursor-pointer"
                onClick={() => {
                  onFinish(selectedIds);
                }}
              >
                Done
              </div>
            </DialogClose>
          </section>
        </section>
      </DialogContent>
    </Dialog>
  );
}
