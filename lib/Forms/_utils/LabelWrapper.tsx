// decorators
import { INPUT_STYLES } from "@/common/decorators/inputStyles";

// types
import { type Children, type ClassNameType } from "@/common/types/reactTypes";

export default function LabelWrapper(
  props: {
    children: Children;
  } & (
    | {
        label?: undefined;
      }
    | {
        label?: string;
        isRequired?: boolean;
        isTextArea?: boolean;
        layoutStyle?: ClassNameType;
        labelStyle?: ClassNameType;
      }
  )
) {
  const { label, children } = props;

  return (
    <>
      {label ? (
        <div
          className={
            props.layoutStyle ||
            `${INPUT_STYLES.LABEL.LAYOUT.HORIZONTAL} ${props.isTextArea ? "sm:items-start" : "sm:items-center"}`
          }
        >
          <div
            className={`${INPUT_STYLES.LABEL.STYLE} ${props.labelStyle || ""}`}
          >
            <span>{label}</span>
            {props.isRequired && <span className="text-red-500"> *</span>}
          </div>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
