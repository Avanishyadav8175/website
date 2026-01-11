import { Children, ClassNameType } from "@/common/types/reactTypes";
import { FormEntriesType } from "@/common/types/types";

export default function Form({
  children,
  onSubmit,
  customStyle,
  className
}: {
  children: Children;
  onSubmit: (formData: FormEntriesType) => void;
  customStyle?: string;
  className?: ClassNameType;
}) {
  const getFormData = async (formData: FormData) => {
    const dataEntries: FormEntriesType = Object.fromEntries(formData);
    onSubmit(dataEntries);
  };

  return (
    <form
      action={getFormData}
      className={
        customStyle ||
        `flex flex-col justify-start items-start *:w-full gap-3 ${className || ""}`
      }
    >
      {children}
    </form>
  );
}
