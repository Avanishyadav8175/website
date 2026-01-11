// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createContentAction,
  selectContent
} from "@/store/features/contents/contentSlice";

// components
import Contents from "./components/Contents";
import SelectContentDialog from "./components/SelectContentDialog";
import { FormSubTitle } from "../title/Form";

export default function SelectContent(
  props: {
    name: string;
    type: "product" | "service" | "both";
    label?: string;
    excludes?: string[];
    disabled?: boolean;
    performReset?: boolean;
    defaultValue?: string | string[];
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
          selectSingle: true;
          value?: undefined;
          defaultValue: string;
        }
      | {
          selectSingle: true;
          value: string;
          defaultValue?: undefined;
          onChangeValue: (newValue: string) => void;
        }
      | {
          selectSingle?: false;
          icon: true;
          value?: undefined;
          defaultValue: string[];
          onFinish: (newValue: string[]) => void;
        }
      | {
          selectSingle?: false;
          icon?: false;
          value?: undefined;
          defaultValue: string[];
        }
      | {
          selectSingle?: false;
          icon?: false;
          value: string[];
          defaultValue?: undefined;
          onChangeValue: (newValue: string[]) => void;
        }
    )
) {
  // props
  const {
    name,
    type,
    label,
    isRequired,
    excludes,
    disabled,
    selectSingle,
    performReset,
    defaultValue,
    value
  } = props;

  // hooks
  const dispatch = useDispatch();

  // redux
  const contentStatus = useSelector(selectContent.status);

  const { documents: contents } = useSelector((state) =>
    selectContent.documentList(state, {
      ...(type !== "both"
        ? {
            defaultFilterBy: "type",
            defaultFilterKeyword: type as string
          }
        : {}),
      sortBy: "name",
      orderBy: "asc"
    })
  );

  // states
  const [selectedContentIds, setSelectedContentIds] = useState<string[]>(
    defaultValue
      ? Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue]
      : value
        ? Array.isArray(value)
          ? value
          : [value]
        : []
  );

  // variables
  const selectedContents = contents.filter(({ _id }) =>
    selectedContentIds.includes(_id as string)
  );

  // handlers
  const handleDeselect = (contentId: string) => {
    setSelectedContentIds(
      [...selectedContentIds].filter((content) => content !== contentId)
    );
  };

  // effects
  useEffect(() => {
    if (contentStatus === "idle") {
      dispatch(createContentAction.fetchDocumentList());
    }
  }, [contentStatus, dispatch]);

  useEffect(() => {
    if (defaultValue !== undefined) {
      if (Array.isArray(defaultValue)) {
        setSelectedContentIds(defaultValue);
      } else {
        setSelectedContentIds([defaultValue]);
      }
    }

    if (value !== undefined) {
      if (Array.isArray(value)) {
        setSelectedContentIds(value);
      } else {
        setSelectedContentIds(value ? [value] : []);
      }
    }
  }, [defaultValue, value]);

  useEffect(() => {
    if ("onChangeValue" in props) {
      if (selectSingle) {
        if (selectedContentIds[0] !== value) {
          props.onChangeValue(selectedContentIds[0] || "");
        }
      } else {
        if (JSON.stringify(selectedContentIds) !== JSON.stringify(value)) {
          props.onChangeValue(selectedContentIds || []);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedContentIds, contents]);

  if ("icon" in props && props.icon) {
    return (
      <SelectContentDialog
        type={type}
        selectSingle={selectSingle}
        excludes={excludes}
        icon
        selectedContentIds={selectedContentIds}
        onChangeSelectedContentIds={setSelectedContentIds}
        onFinish={props.onFinish}
      />
    );
  }

  return (
    <section
      className={`flex flex-col gap-3 ${selectSingle ? "" : "w-full"} ${disabled ? "pointer-events-none" : ""}`}
    >
      <section
        className={selectSingle ? "" : "flex items-center justify-between"}
      >
        {label && <FormSubTitle subtitle={label} />}
        <SelectContentDialog
          type={type}
          selectSingle={selectSingle}
          excludes={excludes}
          selectedContentIds={selectedContentIds}
          onChangeSelectedContentIds={setSelectedContentIds}
        />
      </section>
      {!selectSingle && (
        <section className="flex flex-col gap-3">
          <Contents
            type={type}
            contents={selectedContents}
            checkIsSelected={() => true}
            onToggleSelect={handleDeselect}
          />
        </section>
      )}
      <input
        className="hidden"
        type="text"
        name={name}
        value={JSON.stringify(selectedContentIds)}
        onChange={() => {}}
      />
    </section>
  );
}
