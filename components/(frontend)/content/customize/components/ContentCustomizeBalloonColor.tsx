// icons
import { WhatsappSVG } from "@/common/svgs/svg";

// utils
import { memo } from "react";
import { whatsappContact } from "@/common/utils/_contactDetails";

// hooks
import { useCallback, useEffect, useMemo, useState } from "react";

// components
import ContentCustomizeSection from "./ContentCustomizeSection";
import Link from "next/link";

// types
import { type BalloonColorGroupDocument } from "@/common/types/documentation/presets/balloonColorGroup";
import { type ChangeEvent } from "react";
import { type ContentBalloonColorDocument } from "@/common/types/documentation/nestedDocuments/contentBalloonColor";
import { type LabelDocument } from "@/common/types/documentation/presets/label";

function ContentCustomizeBalloonColor({
  balloonColor: { label, groups },
  cartItemBalloonColor,
  onChangeCartItemBalloonColor
}: {
  balloonColor: ContentBalloonColorDocument;
  cartItemBalloonColor?: string;
  onChangeCartItemBalloonColor: (cartItemBalloonColor?: string) => void;
}) {
  // states
  const [showCustomColors, setShowCustomColors] = useState<boolean>(
    cartItemBalloonColor
      ? !Boolean(
          (groups as BalloonColorGroupDocument[]).find(
            ({ name }) => name === cartItemBalloonColor
          )
        )
      : false
  );
  const [customColors, setCustomColors] = useState<string[]>(
    cartItemBalloonColor
      ? (groups as BalloonColorGroupDocument[]).find(
          ({ name }) => name === cartItemBalloonColor
        )
        ? []
        : cartItemBalloonColor.split(", ")
      : []
  );

  // variables
  const title = useMemo(() => (label as LabelDocument).label, [label]);

  // event handlers
  const handleSelectOption = useCallback(
    (option: string) => {
      onChangeCartItemBalloonColor(option ? option : undefined);
    },
    [onChangeCartItemBalloonColor]
  );

  const handleAddCustomColor = useCallback(
    (color: string, index: number) => {
      switch (index) {
        case 0:
          setCustomColors([
            ...(color ? [color] : []),
            ...(customColors[1] ? [customColors[1]] : []),
            ...(customColors[2] ? [customColors[2]] : [])
          ]);
          break;

        case 1:
          setCustomColors([
            ...(customColors[0] ? [customColors[0]] : []),
            ...(color ? [color] : []),
            ...(customColors[2] ? [customColors[2]] : [])
          ]);
          break;

        case 2:
          setCustomColors([
            ...(customColors[0] ? [customColors[0]] : []),
            ...(customColors[1] ? [customColors[1]] : []),
            ...(color ? [color] : [])
          ]);
          break;

        default:
          break;
      }
    },
    [customColors]
  );

  // side effects
  useEffect(() => {
    onChangeCartItemBalloonColor(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCustomColors]);

  useEffect(() => {
    if (showCustomColors && customColors.join(", ") !== cartItemBalloonColor) {
      onChangeCartItemBalloonColor(customColors.join(", "));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customColors]);

  return (
    <ContentCustomizeSection title={title}>
      <section className="flex flex-col justify-start gap-4">
        {showCustomColors ? (
          <>
            <div className="grid grid-cols-[70px_auto] items-center justify-stretch gap-2">
              <span className="col-span-2">
                {"Type the Balloon Colors you want"}
                <span className="font-medium text-red-500">{` (Max 3)`}</span>
              </span>
              {(customColors.length >= 3
                ? customColors
                : [...customColors, ""]
              ).map((name, i) => (
                <>
                  <span>
                    {`Color ${i + 1}`}
                    {!i && <span className="text-red-500">{" *"}</span>}
                  </span>
                  <input
                    type="text"
                    placeholder={`Color ${i + 1} (${!i ? "Required" : "Additional"})`}
                    value={name}
                    onChange={({
                      target: { value }
                    }: ChangeEvent<HTMLInputElement>) => {
                      handleAddCustomColor(value, i);
                    }}
                    className="bg-ivory-2 rounded-xl outline-none focus:outline-none p-3 resize-none z-10 placeholder:text-charcoal-3/30"
                  />
                </>
              ))}
              {customColors.length === 3 && (
                <span className="col-span-2 flex items-center justify-start text-sm gap-x-2 pt-1">
                  <span className="text-charcoal-3/80">
                    Have more colors in mind?
                  </span>
                  <Link
                    href={whatsappContact()}
                    target="_blank"
                    className="underline underline-offset-2 flex items-center justify-start gap-x-1 text-green-700"
                  >
                    <WhatsappSVG dimensions={20} />
                    <span>Whatsapp Us</span>
                  </Link>
                </span>
              )}
            </div>

            <div
              onClick={() => {
                setShowCustomColors(false);
              }}
              className="text-sm text-charcoal-3/80 cursor-pointer self-end w-fit transition-all duration-300 hover:underline hover:underline-offset-2"
            >
              Select from preset colors
            </div>
          </>
        ) : (
          <>
            <select
              className="bg-transparent border-[1.5px] border-ash/50 rounded-2xl py-3 px-3 cursor-pointer outline-none transition-all duration-300 hover:bg-ash/20 focus:bg-ash/20"
              defaultValue={cartItemBalloonColor || ""}
              onChange={({
                target: { value }
              }: ChangeEvent<HTMLSelectElement>) => {
                handleSelectOption(value);
              }}
            >
              <option value="">Same as in image</option>
              {(groups as BalloonColorGroupDocument[]).map(({ _id, name }) => (
                <option
                  key={_id as string}
                  value={name}
                >
                  {name}
                </option>
              ))}
            </select>
            <div
              onClick={() => {
                setShowCustomColors(true);
              }}
              className="flex items-center justify-end gap-1 text-sm text-charcoal-3/80 cursor-pointer self-end w-fit transition-all duration-300 hover:underline hover:underline-offset-2"
            >
              <span>{"Any Other Color? "}</span>
              <span className="text-red-500 underline">Click Here</span>
            </div>
          </>
        )}
      </section>
    </ContentCustomizeSection>
  );
}

export default memo(ContentCustomizeBalloonColor);
