/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ClassNameType, SetStateType } from "@/common/types/reactTypes";
import { useEffect, useState } from "react";

export default function Toggle({
  name,
  label,
  isActive,
  className,
  activeColor,
  inactiveColor,
  onChangeIsActive
}: {
  name: string;
  label?: string;
  isActive?: boolean;
  className?: ClassNameType;
  activeColor?: { bubble: ClassNameType; bg: ClassNameType };
  inactiveColor?: { bubble: ClassNameType; bg: ClassNameType };
  onChangeIsActive?: (newIsActive: boolean) => void;
}) {
  const [checked, setChecked] = useState<boolean>(isActive || false);

  useEffect(() => {
    if (onChangeIsActive) {
      onChangeIsActive(checked);
    }
  }, [checked]);

  useEffect(() => {
    if (typeof isActive === "boolean" && isActive !== checked) {
      setChecked(isActive);
    }
  }, [isActive]);

  return (
    <>
      <div
        onClick={() => setChecked((prevChecked) => !prevChecked)}
        className={`grid grid-cols-[180px_1fr] w-full items-center cursor-pointer ${className || ""}`}
      >
        {label && (
          <span className="font-medium whitespace-nowrap mr-2">{label}</span>
        )}
        <div
          className={`relative rounded-full p-1 w-9 flex items-center transition-all duration-300 ${checked ? `${activeColor ? activeColor.bg : "bg-teal-300/50"} ` : `${inactiveColor ? inactiveColor.bg : `bg-ash/70`}`}`}
        >
          <div
            className={`rounded-full h-3 aspect-square transition-all duration-300 ${checked ? `translate-x-4 ${activeColor ? activeColor.bubble : "bg-teal-700"}` : inactiveColor ? inactiveColor.bubble : `bg-charcoal-3`}`}
          />
        </div>
      </div>
      <input
        className="hidden"
        type="checkbox"
        name={name}
        checked={checked}
        readOnly
      />
    </>
  );
}
