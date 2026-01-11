// redux
import {
  createAddonCategoryAction,
  selectAddonCategory
} from "@/store/features/categories/addonCategorySlice";

// hooks
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// components
import Input from "@/lib/Forms/Input/Input";
import SelectImage from "@/components/custom/inputs/image/SelectImage";

// types
import { type AddonDocument } from "@/common/types/documentation/contents/addon";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: AddonDocument;
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

  // states
  const [addonIsEdible, setAddonIsEdible] = useState<boolean>(
    // initialDocument?.edible?.isEdible || false
    false
  );
  const [addonIsCustomizable, setAddonIsCustomizable] = useState<boolean>(
    // initialDocument?.isCustomizable || false
    false
  );

  // effects
  useEffect(() => {
    if (addonCategoryStatus === "idle") {
      dispatch(createAddonCategoryAction.fetchDocumentList());
    }
  }, [addonCategoryStatus, dispatch]);

  useEffect(() => {
    if (initialDocument) {
      setAddonIsEdible(initialDocument?.edible?.isEdible || false);
    }
  }, [initialDocument]);

  return (
    <section className="flex flex-col gap-3 w-[40dvw] p-1">
      <Input
        type="dropdown"
        name="category"
        isRequired
        labelConfig={{
          label: "Category",
          layoutStyle: ""
        }}
        errorCheck={false}
        validCheck={false}
        nullOption
        customInitialValuePlaceholderLabel="None"
        defaultValue={(initialDocument?.category as string) || ""}
        options={addonCategoryOptions}
      />
      <Input
        type="text"
        name="name"
        isRequired
        labelConfig={{
          label: "Name",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.name || ""}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="number"
        name="price"
        isRequired
        labelConfig={{
          label: "Price",
          layoutStyle: ""
        }}
        defaultValue={initialDocument?.price?.toString() || ""}
        errorCheck={false}
        validCheck={false}
      />
      <SelectImage
        name="image"
        label="Image"
        defaultValue={initialDocument?.image as string}
      />

       <div className="grid grid-cols-[20px_1fr] items-center gap-x-4 gap-y-3 p-3.5 py-4 rounded-xl bg-teal-100/60 border border-teal-200">
        <input
          type="checkbox"
          name="isEdible"
          className="accent-teal-500 w-5 h-5 cursor-pointer"
          checked={addonIsEdible}
          onChange={(e) => setAddonIsEdible(e.target.checked)}
        />
        <span className="font-medium">Is Edible?</span>

        {addonIsEdible && (
          <Input
            type="dropdown"
            name="edibleType"
            isRequired={addonIsEdible}
            labelConfig={{
              label: "Edible Type",
              layoutStyle: "col-span-2 space-y-2"
            }}
            errorCheck={false}
            validCheck={false}
            nullOption={false}
            defaultValue={
              (initialDocument?.edible?.type as string) || "unspecified"
            }
            options={[
              {
                label: "Unspecified",
                value: "unspecified"
              },
              {
                label: "Veg",
                value: "veg"
              },
              {
                label: "Non Veg",
                value: "non-veg"
              }
            ]}
          />
        )}
      </div> 

       <div className="grid grid-cols-[20px_1fr] items-center gap-x-4 gap-y-3 p-3.5 py-4 rounded-xl bg-teal-100/60 border border-teal-200">
        <input
          type="checkbox"
          name="isCustomizable"
          className="accent-teal-500 w-5 h-5 cursor-pointer"
          checked={addonIsCustomizable}
          onChange={(e) => setAddonIsCustomizable(e.target.checked)}
        />
        <span className="font-medium">Is Customizable?</span>

        {addonIsCustomizable && (
          <Input
            type="text"
            name="customizationLabel"
            isRequired={addonIsCustomizable}
            labelConfig={{
              label: "Customization Label",
              layoutStyle: "col-span-2 space-y-2"
            }}
            defaultValue={initialDocument?.customizationLabel || ""}
            errorCheck={false}
            validCheck={false}
          />
        )}
      </div> 
    </section>
  );
}
