// providers
import { AppStatesProvider } from "@/hooks/useAppState/useAppState";
import ContextProvider from "@/components/(frontend)/ContextProvider";

// types
import { type ReactNode } from "react";

export default function LazyContextLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <AppStatesProvider>
      <ContextProvider>{children}</ContextProvider>
    </AppStatesProvider>
  );
}
