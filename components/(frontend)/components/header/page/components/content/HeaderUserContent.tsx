// libraries
import Link from "next/link";

// icons
import { LogIn } from "lucide-react";

// utils
import { memo } from "react";

// hooks
import { useMemo } from "react";
import { FRONTEND_LINKS } from "@/common/routes/frontend/staticLinks";

function HeaderUserContent({
  isAuthenticated,
  userName,
  onClick
}: {
  isAuthenticated: boolean;
  userName: string | null;
  onClick: () => void;
}) {
  // variables
  const userNameToShow = useMemo(
    () => userName?.split(" ")[0] || "Guest",
    [userName]
  );

  return (
    <>
      {isAuthenticated ? (
        <Link
          href={FRONTEND_LINKS.DASHBOARD}
          prefetch={false}
          className=" max-lg:hidden"
        >
          <div className="group flex flex-col gap-1 items-center justify-center transition-all duration-300">
            <span className="relative overflow-hidden rounded-sm aspect-square bg-gradient-to-br from-transparent from-10% to-charcoal-3/15 text-sienna-1 font-medium w-8 h-8 max-lg:scale-[1.15] lg:w-7 lg:h-7 grid place-items-center">
              {userName?.slice(0, 1).toUpperCase()}
            </span>
            <span className="max-lg:hidden text-charcoal-3/90 text-xs">
              {userNameToShow.length > 12
                ? `${userNameToShow.substring(0, 12)}...`
                : userNameToShow}
            </span>
          </div>
        </Link>
      ) : (
        <div
          onClick={onClick}
          className="cursor-pointer max-lg:hidden"
        >
          <div className="group flex flex-col gap-1 items-center justify-center transition-all duration-300">
            <span className="relative overflow-hidden rounded-sm aspect-square font-medium w-8 h-8 max-lg:scale-[1.15] lg:w-7 lg:h-7 grid place-items-center">
              <LogIn strokeWidth={1.5} height={22} width={22} />
            </span>
            <span className="max-lg:hidden text-charcoal-3/90 text-xs">
              Login
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(HeaderUserContent);
