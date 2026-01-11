"use client";

// icons
import { Search } from "lucide-react";

// hooks
import { useAppStatus } from "@/hooks/useAppStatus";

// components
import HeaderContent from "./components/HeaderContent";
import HeaderSearchWithHook from "./HeaderSearchWithHook";

export default function HeaderSearch() {
  const { isLoaded } = useAppStatus();

  if (isLoaded) {
    return <HeaderSearchWithHook />;
  }

  return (
    <HeaderContent
      label={"Search"}
      icon={
        <Search
          strokeWidth={1}
          width={24}
          height={24}
        />
      }
      mobile
      action={() => {}}
    />
  );
}
