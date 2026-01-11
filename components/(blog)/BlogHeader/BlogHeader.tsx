"use client";

// icons
import { LogIn, ShoppingBag } from "lucide-react";

// hooks
import { useState } from "react";

// components
import FrontendAuth from "@/components/(frontend)/auth/FrontendAuth";
// import FrontendSearch from "@/components/(frontend)/global/Search/FrontendSearch";
import Link from "next/link";

export default function FrontendBlogHeader() {
  const [openAuth, setOpenAuth] = useState<boolean>(false);

  return (
    <>
      <header className="bg-sienna relative mb-2 sm:mb-5 py-3.5 sm:py-3 flex items-center justify-between overflow-x-hidden">
        <div className="relative left-1/2 -translate-x-1/2 w-full max-w-1200 flex items-center justify-between max-1200:px-3.5">
          <div>LOGO</div>
          {/* <FrontendSearch variant="blog" /> */}
          <div className="flex items-center justify-end gap-x-4 sm:gap-x-3.5 *:min-w-[36px] *:sm:w-[54px]">
            <Link
              href={"/"}
              className="group font-medium hover:text-ivory-1 flex flex-col justify-center items-center text-xs text-ivory-2 cursor-pointer transition-all duration-300"
            >
              <ShoppingBag
                strokeWidth={1.5}
                width={20}
                className="max-sm:scale-95"
              />
              <span>Shop Now</span>
            </Link>
            <div
              onClick={() => setOpenAuth((prev) => true)}
              className="group font-medium hover:text-ivory-1 flex flex-col justify-center items-center text-xs text-ivory-2 cursor-pointer transition-all duration-300"
            >
              <LogIn
                strokeWidth={1.5}
                width={20}
                className="max-sm:scale-95"
              />
              <span>Login</span>
            </div>
          </div>
        </div>
      </header>
      <FrontendAuth
        openAuth={openAuth}
        setOpenAuth={setOpenAuth}
      />
    </>
  );
}
