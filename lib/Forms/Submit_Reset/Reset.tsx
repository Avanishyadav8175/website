// decorators
import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";

// types
import { type ClassNameType } from "@/common/types/reactTypes";

export default function Reset({
  label,
  className,
  customResetLogic,
  customStyle
}: {
  label: string;
  customResetLogic?: () => void;
  className?: ClassNameType;
  customStyle?: ClassNameType;
}) {
  return (
    <input
      type="reset"
      onClick={customResetLogic}
      value={label}
      className={customStyle || `${BUTTON_STYLES.GHOST} ${className || ""}`}
    />
  );
}
