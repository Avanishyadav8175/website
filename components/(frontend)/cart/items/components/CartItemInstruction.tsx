// icons
import { CirclePlus, PenLine } from "lucide-react";

// hooks
import { useState } from "react";

// types
import { type ChangeEvent } from "react";

export default function CartItemInstruction({
  instruction,
  onChangeInstruction
}: {
  instruction?: string;
  onChangeInstruction: (instruction: string) => void;
}) {
  // states
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [localInstruction, setLocalInstruction] = useState<string>(
    instruction || ""
  );

  // event handlers
  const handleSave = () => {
    onChangeInstruction(localInstruction);
    setIsEditing(false);
  };

  return (
    <div
      onClick={
        isEditing
          ? () => {}
          : () => {
              setIsEditing(true);
            }
      }
      className="cursor-pointer row-start-9 col-start-1 col-span-3 flex items-center justify-between border-t-[2px] pt-3 pb-1 sm:pb-0.5 px-5 sm:px-4 border-dashed border-ash/50 text-charcoal-3/50"
    >
      {isEditing ? (
        <>
          <div className="flex items-center justify-start gap-2.5">
            <PenLine
              strokeWidth={1.5}
              width={18}
            />
            <textarea
              name="instruction"
              title="instruction"
              value={localInstruction}
              onChange={({
                target: { value: instruction }
              }: ChangeEvent<HTMLTextAreaElement>) => {
                setLocalInstruction(instruction);
              }}
              autoFocus
              className="resize-none bg-transparent outline-none border-none h-6 placeholder-charcoal-3/50 max-sm:w-[calc(100dvw_-_140px)] w-[45dvw] 1200:w-[550px] overflow-x-scroll scrollbar-hide"
              placeholder="Add Instruction"
            />
          </div>
          <div
            onClick={handleSave}
            className="text-sienna font-medium p-0 px-2 pl-4 border-l border-charcoal-3/40 transition-all duration-300 hover:brightness-75"
          >
            Done
          </div>
        </>
      ) : instruction ? (
        <>
          <span className="ml-1 truncate sm:pr-7 text-charcoal-">
            {instruction}
          </span>
          <PenLine
            strokeWidth={1.5}
            width={18}
            className="mr-1 w-[20px] translate-y-0.5"
          />
        </>
      ) : (
        <>
          <span>Add Instruction</span>
          <CirclePlus strokeWidth={1.5} />
        </>
      )}
    </div>
  );
}
