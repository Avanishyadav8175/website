// icons
import { LogOut } from "lucide-react";

export default function AdminSidebarFooter({
  isLocked,
  isMobile,
  userName,
  logout
}: {
  isLocked: boolean;
  isMobile?: boolean;
  userName?: string;
  logout: () => void;
}) {
  return (
    <div className="justify-end pt-2.5 relative">
      <div className="absolute top-0 left-0 h-px w-[calc(100%_-_12px)] bg-ash" />

      <div
        className={`relative grid grid-cols-[50px_10px_1fr] max-sm:w-full sm:grid-cols-[calc(68px_-_24px)_12px_calc(300px_-_36px_-_calc(68px_-_24px))] items-center rounded-xl overflow-hidden cursor-pointer transition-all duration-300`}
      >
        <span
          className={`h-[calc(68px_-_24px)] grid place-items-center rounded-xl transition-all duration-300`}
        >
          <div className="rounded-full sm:scale-[1.2] bg-teal-200/70 overflow-hidden aspect-square w-8 relative flex items-center justify-center text-teal-700">
            {userName?.slice(0, 1)?.toUpperCase() || "U"}
          </div>
        </span>
        <span
          className={
            isLocked || isMobile
              ? ""
              : `opacity-0 group-hover:opacity-100 transition-opacity duration-100 group-hover:duration-300`
          }
        ></span>
        <span
          className={
            isLocked || isMobile
              ? ""
              : `opacity-0 group-hover:opacity-100 transition-opacity duration-100 group-hover:duration-300`
          }
        >
          {userName}
        </span>

        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 transition-colors duration-300 hover:text-red-700"
          onClick={logout}
        >
          <LogOut
            strokeWidth={1.5}
            width={20}
          />
        </div>
      </div>
    </div>
  );
}
