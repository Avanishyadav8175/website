import { SetStateType } from "@/common/types/reactTypes";
import { ProductColorType } from "../static/type";
import { WhatsappSVG } from "@/common/svgs/svg";
import Link from "next/link";
import { whatsappContact } from "@/common/utils/_contactDetails";
import { BalloonColorGroupDocument } from "@/common/types/documentation/presets/balloonColorGroup";
import { useEffect, useState } from "react";

export default function FrontendProductColor({
  color,
  setColor,
  otherColors,
  setOtherColors,
  availableColors
}: {
  color: BalloonColorGroupDocument | undefined;
  setColor: SetStateType<BalloonColorGroupDocument | undefined>;
  otherColors: string[];
  setOtherColors: SetStateType<string[]>;
  availableColors: Array<BalloonColorGroupDocument>;
}) {
  const [showCustomColors, setShowCustomColors] = useState<boolean>(false);

  const handleSetColor = (selectedId: string) => {
    const withinAvailable = availableColors.find(
      ({ _id }) => _id === selectedId
    );

    if (withinAvailable) setColor((prev) => withinAvailable);
    else {
      if (selectedId === "_default_")
        setColor(
          (prev) =>
            ({
              _id: "_default_",
              name: "",
              colors: [] as string[]
            }) as BalloonColorGroupDocument
        );
      else {
        setColor(
          (prev) =>
            ({
              _id: "_other_",
              name: "",
              colors: [] as string[]
            }) as BalloonColorGroupDocument
        );
      }
    }
  };

  const handleSetOtherColors = (newValue: string, index: number) => {
    if (index === 0 && otherColors.length === 0) {
      setOtherColors((prev) => [newValue]);
      return;
    }

    if (index >= otherColors.length && index < 3)
      setOtherColors((prev) => [...prev, newValue]);

    if (index < otherColors.length)
      if (newValue.length > 0)
        setOtherColors((prev) =>
          prev.map((name, i) => (i === index ? newValue : name))
        );
      else setOtherColors((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (showCustomColors) handleSetColor("_other_");
    else handleSetColor("_default_");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCustomColors]);

  return (
    <section className="flex flex-col justify-start gap-4">
      {!showCustomColors && (
        <select
          name=""
          id=""
          onChange={(e) => handleSetColor(e.target.value)}
          className="bg-transparent border-[1.5px] border-ash/50 rounded-2xl py-3 px-3 cursor-pointer outline-none transition-all duration-300 hover:bg-ash/20 focus:bg-ash/20"
        >
          <option value="_default_">Same as in image</option>
          {availableColors.map(({ _id, name }, index) => (
            <option
              key={index}
              value={_id as string}
            >
              {name}
            </option>
          ))}
        </select>
      )}

      {!showCustomColors && (
        <div
          onClick={() => setShowCustomColors((prev) => true)}
          className="flex items-center justify-end gap-1 text-sm text-charcoal-3/80 cursor-pointer self-end w-fit transition-all duration-300 hover:underline hover:underline-offset-2"
        >
          <span>Any Other Color?</span>{" "}
          <span className="text-red-500 underline">Click Here</span>
        </div>
      )}

      {showCustomColors && color && color._id === "_other_" ? (
        <>
          <div className="grid grid-cols-[70px_auto] items-center justify-stretch gap-2">
            <span className="col-span-2">
              Type the Balloon Colors you want{" "}
              <span className="font-medium text-red-500">(Max 3)</span>
            </span>
            {(otherColors.length >= 3 ? otherColors : [...otherColors, ""]).map(
              (name, index) => (
                <>
                  <span>
                    Color {index + 1}{" "}
                    {index === 0 ? (
                      <span className="text-red-500">*</span>
                    ) : (
                      <></>
                    )}
                  </span>
                  <input
                    type="text"
                    placeholder={`Color ${index + 1} (${index === 0 ? "Required" : "Additional"})`}
                    value={name}
                    onChange={(e) =>
                      handleSetOtherColors(e.target.value, index)
                    }
                    className="bg-ivory-2 rounded-xl outline-none focus:outline-none p-3 resize-none z-10 placeholder:text-charcoal-3/30"
                  />
                </>
              )
            )}
            {otherColors.length === 3 ? (
              <span className="col-span-2 flex items-center justify-start text-sm gap-x-2 pt-1">
                <span className="text-charcoal-3/80">
                  Have more colors in mind?
                </span>
                <Link
                  href={whatsappContact()}
                  target="_blank"
                  // prefetch
                  className="underline underline-offset-2 flex items-center justify-start gap-x-1 text-green-700"
                >
                  <WhatsappSVG dimensions={20} />
                  <span>Whatsapp Us</span>
                </Link>
              </span>
            ) : (
              <></>
            )}
          </div>

          <div
            onClick={() => setShowCustomColors((prev) => false)}
            className="text-sm text-charcoal-3/80 cursor-pointer self-end w-fit transition-all duration-300 hover:underline hover:underline-offset-2"
          >
            Select from preset colors
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
}
