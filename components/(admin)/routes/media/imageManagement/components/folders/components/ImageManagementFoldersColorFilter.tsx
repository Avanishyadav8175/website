// constants
import { folderColorClasses, folderColors } from "../constants/folderColors";

export default function ImageManagementFoldersColorFilter({
  folderLayout,
  activeColor,
  onChangeActiveColor
}: {
  folderLayout: "list" | "tiles";
  activeColor: "" | "red" | "blue" | "amber" | "jade" | "purple";
  onChangeActiveColor: (
    newActiveColor: "" | "red" | "blue" | "amber" | "jade" | "purple"
  ) => void;
}) {
  return (
    <div
      className={`${folderLayout === "tiles" ? "col-span-2" : ""} z-50 fixed bottom-5 px-4 py-3.5 rounded-xl grid grid-cols-6 place-items-center gap-4 bg-ivory-1/55 border border-ash-3 backdrop-blur-sm`}
    >
      <span
        onClick={() => {
          onChangeActiveColor("");
        }}
        className={`${activeColor ? "" : "ring-2 ring-offset-2 ring-charcoal-3/60"} rounded-full w-[18px] aspect-square bg-[conic-gradient(var(--tw-gradient-stops))] from-amber-500 via-blue-600 to-red-500 cursor-pointer transition-all duration-300`}
      />
      {folderColors.map((color, index) => (
        <span
          key={index}
          className={`${activeColor === color ? "ring-2 ring-offset-2 ring-charcoal-3/60" : ""} rounded-full w-[18px] aspect-square ${folderColorClasses[color]} cursor-pointer transition-all duration-300`}
          onClick={() => {
            onChangeActiveColor(color);
          }}
        />
      ))}
    </div>
  );
}
