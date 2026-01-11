"use client";

// hooks
import { useContext, useState } from "react";

// utils
import { createContext } from "react";

// types
import { type ReactNode } from "react";

type AppStatus = {
  isLoaded: boolean;
  onLoad: () => void;
};

// context
const AppStatus = createContext<AppStatus | undefined>(undefined);

// context provider
export function AppStatusProvider({ children }: { children: ReactNode }) {
  // states
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // event handlers
  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <AppStatus.Provider value={{ isLoaded, onLoad: handleLoad }}>
      {children}
    </AppStatus.Provider>
  );
}

// hook
export const useAppStatus = (): AppStatus => {
  const context = useContext(AppStatus);

  if (!context) {
    throw new Error("useAppStatus must be used within a AppStatusProvider");
  }

  return context;
};
