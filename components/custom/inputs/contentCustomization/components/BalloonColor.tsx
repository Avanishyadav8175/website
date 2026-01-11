// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createLabelAction,
  selectLabel
} from "@/store/features/presets/labelSlice";
import {
  createBalloonColorGroupAction,
  selectBalloonColorGroup
} from "@/store/features/presets/balloonColorGroupSlice";

// components
import AdvancedCheckbox from "@/lib/Forms/Checkbox/AdvancedCheckbox";
import Input from "@/lib/Forms/Input/Input";

// types
import { type ContentBalloonColorDocument } from "@/common/types/documentation/nestedDocuments/contentBalloonColor";

export default function BalloonColor({
  balloonColor,
  onChangeBalloonColor
}: {
  balloonColor: ContentBalloonColorDocument;
  onChangeBalloonColor: (newBalloonColor: ContentBalloonColorDocument) => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const labelStatus = useSelector(selectLabel.status);

  const { options: labelOptions } = useSelector((state) =>
    selectLabel.documentList(state, {
      active: true,
      sortBy: "label",
      orderBy: "asc"
    })
  );

  const balloonColorStatus = useSelector(selectBalloonColorGroup.status);

  const { documents: balloonColors, options: balloonColorOptions } =
    useSelector((state) =>
      selectBalloonColorGroup.documentList(state, {
        active: true,
        sortBy: "name",
        orderBy: "asc"
      })
    );

  // states
  const [colorLength, setColorLength] = useState<string>("");

  // variables
  const uniqueBalloonColorLengths = Array.from(
    new Set(
      balloonColors
        .map(({ colors }) => colors.length)
        .sort((a, b) => a - b)
        .map((count) => count.toString())
    )
  );
  const filteredBalloonColorIds = colorLength
    ? balloonColors
        .filter(({ colors }) => colors.length === Number(colorLength))
        .map(({ _id }) => _id as string)
    : balloonColors.map(({ _id }) => _id as string);
  const filteredOptions = balloonColorOptions.filter(
    ({ value }) =>
      filteredBalloonColorIds.includes(value) ||
      (balloonColor.groups as string[]).includes(value)
  );

  // effects
  useEffect(() => {
    if (labelStatus === "idle") {
      dispatch(createLabelAction.fetchDocumentList());
    }
  }, [labelStatus, dispatch]);

  useEffect(() => {
    if (balloonColorStatus === "idle") {
      dispatch(createBalloonColorGroupAction.fetchDocumentList());
    }
  }, [balloonColorStatus, dispatch]);

  return (
    <section className="flex flex-col gap-3 w-full">
      <div className="text-xl py-2 underline underline-offset-4 text-teal-600 pt-4">
        {"Balloon Colors"}
      </div>
      <Input
        type="dropdown"
        name="label"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        labelConfig={{
          label: "Label"
        }}
        nullOption
        customInitialValuePlaceholderLabel="Select Label"
        options={labelOptions}
        customValue={{
          value: balloonColor.label as string,
          setValue: (label) => {
            onChangeBalloonColor({
              ...balloonColor,
              label
            } as ContentBalloonColorDocument);
          }
        }}
      />
      <Input
        type="dropdown"
        name="colorLength"
        isRequired={false}
        errorCheck={false}
        validCheck={false}
        labelConfig={{
          label: "Number Of Colors"
        }}
        nullOption={false}
        options={[
          { label: "All", value: "" },
          ...uniqueBalloonColorLengths.map((count) => ({
            label: count,
            value: count
          }))
        ]}
        customValue={{
          value: colorLength,
          setValue: (newNoOfColors) => {
            setColorLength(newNoOfColors);
          }
        }}
      />
      <AdvancedCheckbox
        name="group"
        isRequired={false}
        label="Colors"
        options={filteredOptions}
        selectedValues={balloonColor.groups as string[]}
        onChangeSelectedValues={(groups) => {
          onChangeBalloonColor({
            ...balloonColor,
            groups
          } as ContentBalloonColorDocument);
        }}
      />
    </section>
  );
}
