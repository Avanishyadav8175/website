// components
import WidthWrapper from "./WidthWrapper";

// types
import { ReactNode } from "react";

export default function BodyWrapper({
  children,
  fullWidth
}: {
  children: ReactNode;
  fullWidth?: boolean;
}) {
  return (
      <WidthWrapper fullWidth={fullWidth}>{children}</WidthWrapper>
  );
}
