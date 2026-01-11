// hooks
import { useAppStates } from "@/hooks/useAppState/useAppState";

// components
import Link from "next/link";

export default function ShopMore() {
  const {
    auth: {
      data: { isAuthenticated }
    }
  } = useAppStates();

  return !isAuthenticated ? (
    <div className={"px-3 min-[1350px]:px-0 mb-2.5 text-center"}>
      <Link
        href={"/"}
        className="text-charcoal-3/70 transition-all duration-300 hover:underline hover:underline-offset-4"
      >
        {"I wish to Shop More"}
      </Link>
    </div>
  ) : (
    <></>
  );
}
