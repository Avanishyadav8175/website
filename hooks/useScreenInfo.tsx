/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// hooks
import { useContext, useEffect, useState } from "react";

// utils
import { createContext } from "react";

// types
import { type ReactNode } from "react";

type ScreenInfo = {
  isMobile: boolean;
  width: number;
  height: number;
};

// context
const ScreenInfo = createContext<ScreenInfo | undefined>(undefined);

// context provider
export function ScreenInfoProvider({ children }: { children: ReactNode }) {
  const [viewportSize, setViewportSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ScreenInfo.Provider
      value={{
        isMobile: viewportSize.width <= 640,
        width: viewportSize.width,
        height: viewportSize.height
      }}
    >
      {children}
    </ScreenInfo.Provider>
  );
}

// hook
export const useScreenInfo = (): ScreenInfo => {
  const context = useContext(ScreenInfo);

  if (!context) {
    throw new Error("useScreenInfo must be used within a ScreenInfoProvider");
  }

  return context;
};
