// redux
import {
  createContentCategoryAction,
  selectContentCategory
} from "@/store/features/categories/contentCategorySlice";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// components
import Input from "@/lib/Forms/Input/Input";
import TextareaList from "@/components/custom/inputs/textareaList/TextareaList";

// types
import { type ReviewGroupDocument } from "@/common/types/documentation/presets/reviewGroup";

export default function TableFormFields({
  initialDocument
}: {
  initialDocument?: ReviewGroupDocument;
}) {
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
    <section className="flex flex-col gap-3 w-[75dvw] pb-20">
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
        options={contentCategoryOptions}
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
      <TextareaList
        name="reviews"
        label="Reviews"
        itemLabel="Review"
        defaultValue={initialDocument?.reviews}
      />
    </section>
  );
}
