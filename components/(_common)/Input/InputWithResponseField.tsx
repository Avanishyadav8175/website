import { Children, ClassNameType } from "@/common/types/reactTypes";

export type InputResponseType = "error" | "warning" | "valid" | "neutral";

export default function InputWithResponseField({
  showResponse,
  responseMsg,
  responseType,
  className,
  responseClassName,
  children,
  id
}: {
  showResponse: boolean;
  responseMsg: string | JSX.Element;
  responseType: InputResponseType;
  className?: ClassNameType;
  responseClassName?: ClassNameType;
  children: Children;
  id?: string;
}) {
  return (
    <div className={`flex flex-col justify-start gap-1 ${className}`}>
      {children}
      <div className="grid *:row-start-1 *:col-start-1">
        {showResponse && responseMsg ? (
          <div
            className={`text-sm z-10 ${responseType === "valid" ? "text-green-700" : responseType === "error" ? "text-red-600" : responseType === "warning" ? "text-orange-500" : "text-charcoal-3/85"} ${responseClassName || ""}`}
          >
            {responseMsg}
          </div>
        ) : (
          <></>
        )}
        <div
          id={id || "__AEG3d__"}
          className="text-sm z-20 bg-transparent text-red-600 w-full h-4"
        />
      </div>
    </div>
  );
}
