// utils
import { memo } from "react";

// hooks
import { useCallback, useMemo } from "react";

// components
import ContentCustomizeSection from "./ContentCustomizeSection";

// types
import { type CartItemUploadedTextDocument } from "@/common/types/documentation/nestedDocuments/cartItemUploadedText";
import { type ChangeEvent } from "react";
import { type ContentCustomizationUploadTextDocument } from "@/common/types/documentation/nestedDocuments/contentCustomizationUploadText";
import { type LabelDocument } from "@/common/types/documentation/presets/label";

function ContentCustomizeUploadText({
  uploadText: { label, characterLimit },
  cartItemUploadedText,
  onChangeCartItemUploadedText
}: {
  uploadText: ContentCustomizationUploadTextDocument;
  cartItemUploadedText?: CartItemUploadedTextDocument;
  onChangeCartItemUploadedText: (
    cartItemUploadedText?: CartItemUploadedTextDocument
  ) => void;
}) {
  // variables
  const title = useMemo(() => (label as LabelDocument).label, [label]);
  const text = useMemo(
    () => cartItemUploadedText?.text || "",
    [cartItemUploadedText]
  );

  const presetTexts = useMemo(
    () => [
      "Congratulations!",
      "Welcome",
      "Happy Birthday",
      "Warm Anniversary"
    ],
    []
  );

  // event handlers
  const handleChangeText = useCallback(
    (text: string) => {
      onChangeCartItemUploadedText(
        text
          ? ({
              label: title,
              text
            } as CartItemUploadedTextDocument)
          : undefined
      );
    },
    [title, onChangeCartItemUploadedText]
  );

  return (
    <ContentCustomizeSection title={title}>
      <div className="flex flex-col gap-3">
        <div className="relative w-full max-sm:h-[90px]">
          <textarea
            className="bg-ivory-2 rounded-xl outline-none focus:outline-none p-3 resize-none w-full h-full z-10 placeholder:text-charcoal-3/30"
            value={text}
            placeholder="Enter message here..."
            onChange={({
              target: { value }
            }: ChangeEvent<HTMLTextAreaElement>) => {
              handleChangeText(
                characterLimit ? value.slice(0, characterLimit) : value
              );
            }}
          />
          {Boolean(characterLimit) && (
            <span className="absolute bottom-2.5 right-3 z-50 text-xs text-charcoal-3/80">
              {`${text.length} / ${characterLimit}`}
            </span>
          )}
        </div>
        <div className="overflow-x-scroll scrollbar-hide flex items-center justify-start gap-3">
          {presetTexts.map((presetText, i) => (
            <span
              key={i}
              className={`cursor-pointer border sm:border-[1.5px] border-ash/40 sm:border-ash/60 font-medium p-1 px-2.5 rounded-lg whitespace-nowrap text-sm text-charcoal-3/50 sm:text-charcoal-3/60 hover:sm:text-charcoal-3/90 hover:sm:border-ash/95 hover:sm:bg-ash-3/20 transition-colors duration-300`}
              onClick={() => {
                handleChangeText(
                  characterLimit
                    ? presetText.slice(0, characterLimit)
                    : presetText
                );
              }}
            >
              {presetText}
            </span>
          ))}
        </div>
      </div>
    </ContentCustomizeSection>
  );
}

export default memo(ContentCustomizeUploadText);
