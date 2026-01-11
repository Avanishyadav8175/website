"use client";
import { ADMIN_VERIFIED } from "@/common/constants/cookieKeys";
import { ROOT_ADMIN_ROUTE } from "@/common/routes/admin/staticLinks";
import { type Children } from "@/common/types/reactTypes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLoginLayout({ children }: { children: Children }) {
  const { replace } = useRouter();

  useEffect(() => {
    const adminVerified = sessionStorage.getItem(ADMIN_VERIFIED);

    if (adminVerified === "true") {
      replace(ROOT_ADMIN_ROUTE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-ivory-2 w-full h-device grid grid-cols-1 sm:grid-cols-[1fr_360px]">
      <div className="bg-rose-400 h-full w-full max-sm:hidden">
      </div>

      <div className="bg-ivory-1 flex flex-col p-5 sm:p-7 items-stretch justify-center">
        <div className="text-2xl text-ash-3 p-2 mb-4">Admin Login</div>
        <div className="w-full grid grid-cols-1 grid-rows-[repeat(4,auto)] sm:gap-1 sm:px-1">
          {children}
          <div className="row-start-4 flex items-center justify-center text-sm">
            <Link
              href={"/"}
              className="flex items-center justify-start gap-2 transition-all duration-300 text-charcoal-3/70 hover:text-charcoal-3 hover:gap-1.5"
            >
              <ChevronLeft
                strokeWidth={1.5}
                width={16}
                className="transition-all duration-300"
              />
              <span>Go to Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
