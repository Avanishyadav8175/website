import { BUTTON_STYLES } from "@/common/decorators/buttonStyles";
import { ClassNameType } from "@/common/types/reactTypes";

export default function Submit({
  label,
  className,
  customStyle,
  masked,
  customDisabledLogic,
  onClick
}: {
  label: string;
  className?: ClassNameType;
  customStyle?: ClassNameType;
  masked?: boolean;
  customDisabledLogic?: () => boolean;
  onClick?: () => void;
}) {
  const isDisabled = customDisabledLogic ? customDisabledLogic() : false;

  if (masked)
    return (
      <div
        onClick={onClick ? onClick : () => {}}
        className={customStyle || `${BUTTON_STYLES.PRIMARY} ${className || ""}`}
      >
        {label}
      </div>
    );

  return (
    <input
      type="submit"
      value={label}
      onClick={onClick ? onClick : () => {}}
      disabled={isDisabled}
      className={customStyle || `${BUTTON_STYLES.PRIMARY} ${className || ""}`}
    />
  );
}
