"use client";

// components
import Link from "next/link";

// types
import { ReactNode } from "react";

export default function HeaderContent({
  label,
  icon,
  mobile,
  desktop,
  pingCount,
  path,
  action
}: {
  label: string;
  icon?: ReactNode;
  pingCount?: number;
} & (
  | {
      path: string;
      action?: undefined;
    }
  | {
      path?: undefined;
      action: () => void;
    }
) &
  (
    | {
        mobile: true;
        desktop?: boolean;
      }
    | {
        mobile?: boolean;
        desktop: true;
      }
  )) {
  return (
    <HeaderContentActionWrapper
      path={path}
      action={action}
      mobile={mobile}
      desktop={desktop}
    >
      {icon}
      <span className="max-sm:hidden">{label}</span>
      {pingCount && pingCount > 0 ? (
        <span className="absolute flex items-center justify-center -top-2 right-1.5 sm:-top-1.5 sm:-right-0.5 rounded-full w-[14px] h-[14px] sm:w-[17px] sm:h-[17px] p-0.5 bg-sienna text-white text-[10px] sm:text-xs">
          {pingCount}
        </span>
      ) : (
        <></>
      )}
    </HeaderContentActionWrapper>
  );
}

const HeaderContentActionWrapper = ({
  children,
  mobile,
  desktop,
  path,
  action
}: {
  children: ReactNode;
  path?: string;
  action?: () => void;
  mobile?: boolean;
  desktop?: boolean;
}) => {
  return (
    <>
      {path ? (
        <Link
          href={path}
          className={`${mobile ? "" : "max-sm:hidden"} ${desktop ? "" : "sm:hidden"} relative min-w-[45px] flex flex-col items-center justify-center gap-1 text-xs text-charcoal-3 px-1 transition-colors duration-300 cursor-pointer hover:text-sienna`}
        >
          {children}
        </Link>
      ) : (
        <div
          onClick={action}
          className={`${mobile ? "" : "max-sm:hidden"} ${desktop ? "" : "sm:hidden"} relative sm:min-w-[52px] flex flex-col items-center justify-center gap-1 text-xs text-charcoal-3 sm:px-1 transition-colors duration-300 cursor-pointer hover:text-sienna`}
        >
          {children}
        </div>
      )}
    </>
  );
};
