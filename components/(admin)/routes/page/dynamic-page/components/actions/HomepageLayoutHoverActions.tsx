import { Eye, PenLine, Trash2 } from "lucide-react";

export default function HomepageLayoutHoverActions({
  id,
  onClickEdit,
  onClickDisable,
  onClickDelete,
  layoutNumber
}: {
  id: string;
  onClickEdit: (id: string) => void;
  onClickDisable: (id: string) => void;
  onClickDelete: (id: string) => void;
  layoutNumber: number;
}) {
  return (
    <div className="rounded-2xl group absolute left-0 top-0 z-[200] w-full h-full flex items-center justify-between px-3 opacity-0 hover:opacity-100 border-x-0 border-y border-charcoal-3/10 bg-gradient-to-r from-transparent from-30% to-teal-200 to-70% backdrop-blur-md text-charcoal transition-all duration-300">
      <div className="grid *:row-start-1 *:col-start-1">
        <div className="bg-[#dddddd] [mask-image:radial-gradient(90%_65%_at_center,white,transparent_70%)]" />
        <span className="italic text-4xl font-medium text-teal-500 drop-shadow-2xl pr-3">
          # {layoutNumber}
        </span>
      </div>
      <div className="flex items-center justify-end gap-1">
        <div
          onClick={() => onClickEdit(id)}
          className="flex flex-col items-center justify-center gap-0.5 text-center *:whitespace-nowrap text-xs rounded-full aspect-square w-16 h-16 hover:text-blue-900 transition-all duration-300 cursor-pointer"
        >
          <PenLine
            strokeWidth={1}
            width={24}
            height={24}
          />
          <span className="tracking-wide">Edit</span>
        </div>
        <div
          onClick={() => onClickDisable(id)}
          className="flex flex-col items-center justify-center gap-0.5 text-center *:whitespace-nowrap text-xs rounded-full aspect-square w-16 h-16 hover:text-teal-900 transition-all duration-300 cursor-pointer"
        >
          <Eye
            strokeWidth={1}
            width={24}
            height={24}
          />
          <span className="tracking-wide">Disable</span>
        </div>
        <div
          onClick={() => onClickDelete(id)}
          className="flex flex-col items-center justify-center gap-0.5 text-center *:whitespace-nowrap text-xs rounded-full aspect-square w-16 h-16 hover:text-rose-700 transition-all duration-300 cursor-pointer"
        >
          <Trash2
            strokeWidth={1}
            width={24}
            height={24}
          />
          <span className="tracking-wide">Delete</span>
        </div>
      </div>
    </div>
  );
}
