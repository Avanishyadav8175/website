// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createAddonAction,
  selectAddon
} from "@/store/features/contents/addonSlice";

// components
import Addons from "./components/Addons";
import SelectAddonDialog from "./components/SelectAddonDialog";

// types
import { type ContentAddonDocument } from "@/common/types/documentation/nestedDocuments/contentAddon";
import { FormSubTitle } from "../title/Form";

export default function SelectAddon(
  props: {
    name: string;
    label?: string;
    performReset?: boolean;
    defaultValue?: ContentAddonDocument[];
  } & (
      | {
        isRequired?: undefined;
      }
      | {
        isRequired?: boolean;
        label: string;
      }
    ) &
    (
      | {
        value?: undefined;
        defaultValue?: ContentAddonDocument[];
      }
      | {
        value?: ContentAddonDocument[];
        defaultValue?: undefined;
        onChangeValue: (newValue: ContentAddonDocument[]) => void;
      }
    )
) {
  // props
  const { name, label, isRequired, performReset, defaultValue, value } = props;

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
  const [selectedAddons, setSelectedAddons] = useState<ContentAddonDocument[]>(
    defaultValue || value || ([] as ContentAddonDocument[])
  );

  // variables
  const selectedAddonIds = selectedAddons.map(({ addon }) => addon as string);
  const popularAddonIds = selectedAddons
    .filter(({ isPopular }) => isPopular)
    .map(({ addon }) => addon as string);

  const selectedAddonDocuments = addons.filter(({ _id }) =>
    selectedAddonIds.includes(_id as string)
  );

  // handlers
  const handleCheckIsPopular = (addonId: string) =>
    popularAddonIds.includes(addonId);

  const handleDeselect = (addonId: string) => {
    setSelectedAddons(
      [...selectedAddons].filter(
        ({ addon: selectedAddon }) => selectedAddon !== addonId
      )
    );
  };

  const handleTogglePopular = (addonId: string) => {
    setSelectedAddons((prevSelectedAddons) =>
      [...prevSelectedAddons].map(
        (prevSelectedAddon) =>
          ({
            ...prevSelectedAddon,
            ...(prevSelectedAddon.addon === addonId
              ? { isPopular: !prevSelectedAddon.isPopular }
              : {})
          }) as ContentAddonDocument
      )
    );
  };

  // effects
  useEffect(() => {
    if (addonStatus === "idle") {
      dispatch(createAddonAction.fetchDocumentList());
    }
  }, [addonStatus, dispatch]);

  useEffect(() => {
    if (value && JSON.stringify(value) !== JSON.stringify(selectedAddons)) {
      setSelectedAddons(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (value) {
      props.onChangeValue(selectedAddons);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddons]);

  return (
    <section className="flex flex-col gap-3 w-full">
      <section className="flex items-center justify-between">
        {label && <FormSubTitle subtitle={label} />}
        <SelectAddonDialog
          selectedAddons={selectedAddons}
          onChangeSelectedAddons={setSelectedAddons}
        />
      </section>
      <section className="flex flex-col gap-3">
        <Addons
          addons={selectedAddonDocuments}
          checkIsSelected={() => true}
          checkIsPopular={handleCheckIsPopular}
          onToggleSelect={handleDeselect}
          onTogglePopular={handleTogglePopular}
        />
      </section>
      <input
        className="hidden"
        type="text"
        name={name}
        value={JSON.stringify(selectedAddons)}
        onChange={() => { }}
      />
    </section>
  );
}
