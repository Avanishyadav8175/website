// redux
import {
  createStateAction,
  selectState
} from "@/store/features/presets/stateSlice";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// components
import Input from "@/lib/Forms/Input/Input";
import SelectImage from "@/components/custom/inputs/image/SelectImage";
import Textarea from "@/lib/Forms/Textarea/Textarea";
import Toggle from "@/lib/Forms/Toggle/Toggle";

// types
import { type CityDocument } from "@/common/types/documentation/presets/city";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: CityDocument;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const stateStatus = useSelector(selectState.status);

  const { options: stateOptions } = useSelector((state) =>
    selectState.documentList(state, {
      active: true,
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // states
  const [cityIsTopCity, setCityIsTopCity] = useState<boolean>(
    // initialDocument?.isTopCity || false
    false
  );

  // effects
  useEffect(() => {
    if (stateStatus === "idle") {
      dispatch(createStateAction.fetchDocumentList());
    }
  }, [stateStatus, dispatch]);

  useEffect(() => {
    if (initialDocument) {
      setCityIsTopCity(initialDocument?.isTopCity || false);
    }
  }, [initialDocument]);

  return (
    <section className="flex flex-col gap-3 w-[40dvw]">
      <Input
        type="dropdown"
        name="state"
        isRequired
        labelConfig={{
          label: "State",
          layoutStyle: ""
        }}
        errorCheck={false}
        validCheck={false}
        nullOption
        customInitialValuePlaceholderLabel="None"
        defaultValue={initialDocument?.state as string}
        options={stateOptions}
      />
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Name",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.name}
        errorCheck={false}
        validCheck={false}
      />
      <Textarea
        name="aliases"
        labelConfig={{
          label: "Aliases",
          labelStyle: "",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.aliases?.join(", ") || ""}
        errorCheck={false}
        validCheck={false}
      />
      {/* <Toggle
        name="isTopCity"
        label="Is Top City"
        isActive={cityIsTopCity}
        onChangeIsActive={(newCityIsTopCity) => {
          setCityIsTopCity(newCityIsTopCity);
        }}
      /> */}
      {cityIsTopCity && (
        <SelectImage
          name="icon"
          label="Icon"
          isRequired
          defaultValue={initialDocument?.icon as string}
        />
      )}
    </section>
  );
}
