// icons
import { X } from "lucide-react";

// hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/store/withType";

// redux
import {
  createPromotionTagAction,
  selectPromotionTag
} from "@/store/features/presets/promotionTagSlice";

// components
import Input from "@/lib/Forms/Input/Input";

// types
import { type HeaderNavLinkSectionLinkDocument } from "@/common/types/documentation/nestedDocuments/headerNavLinkSectionLink";

export default function HeaderNavLinkSectionLink({
  index,
  link,
  onChangeLink,
  onDeleteLink
}: {
  index: number;
  link: HeaderNavLinkSectionLinkDocument;
  onChangeLink: (newLink: HeaderNavLinkSectionLinkDocument) => void;
  onDeleteLink: () => void;
}) {
  // hooks
  const dispatch = useDispatch();

  // redux
  const promotionTagStatus = useSelector(selectPromotionTag.status);

  const { options: promotionTagOptions } = useSelector((state) =>
    selectPromotionTag.documentList(state, {
      active: true,
      sortBy: "label",
      orderBy: "asc"
    })
  );

  // effects
  useEffect(() => {
    if (promotionTagStatus === "idle") {
      dispatch(createPromotionTagAction.fetchDocumentList());
    }
  }, [promotionTagStatus, dispatch]);

  return (
    <section className="grid grid-cols-[24px_1fr_1fr_1fr_24px] items-center gap-5">
      <span>{`${index + 1}.`}</span>
      <Input
        type="text"
        name="linkLabel"
        isRequired
        labelConfig={{
          label: ""
        }}
        placeholder="label"
        customValue={{
          value: link.label || "",
          setValue: (label) => {
            onChangeLink({
              ...link,
              label
            } as HeaderNavLinkSectionLinkDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="text"
        name="LinkPath"
        isRequired
        labelConfig={{
          label: ""
        }}
        placeholder="path"
        customValue={{
          value: link.path,
          setValue: (path) => {
            onChangeLink({
              ...link,
              path
            } as HeaderNavLinkSectionLinkDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <Input
        type="dropdown"
        name="linkTag"
        labelConfig={{
          label: ""
        }}
        isRequired={false}
        nullOption={false}
        options={[{ label: "None", value: "none" }, ...promotionTagOptions]}
        customValue={{
          value: link.tag as string,
          setValue: (tag) => {
            onChangeLink({
              ...link,
              tag
            } as HeaderNavLinkSectionLinkDocument);
          }
        }}
        errorCheck={false}
        validCheck={false}
      />
      <div
        onClick={() => {
          onDeleteLink();
        }}
        className="aspect-square rounded-full bg-red-600 text-white p-1 cursor-pointer transition-all duration-300 hover:bg-red-700"
      >
        <X
          strokeWidth={1.5}
          width={16}
          height={16}
        />
      </div>
    </section>
  );
}
