import { Children, ClassNameType } from "@/common/types/reactTypes";

export const TopVerticalSpacing = ({
  children,
  className
}: {
  children: Children;
  className?: ClassNameType;
}) => {
  return (
    <section className={`pb-5 sm:pt-6 sm:pb-5 ${className}`}>
      {children}
    </section>
  );
};

export const BottomVerticalSpacing = ({
  children,
  className
}: {
  children: Children;
  className?: ClassNameType;
}) => {
  return <section className={`sm:py-7 ${className}`}>{children}</section>;
};

export const VerticalSpacing = ({
  children,
  className
}: {
  children: Children;
  className?: ClassNameType;
}) => {
  return <section className={`py-5 sm:py-6 ${className}`}>{children}</section>;
};

export const OnlyTopSpacing = ({
  children,
  className
}: {
  children: Children;
  className?: ClassNameType;
}) => {
  return <section className={`pt-5 sm:pt-6 ${className}`}>{children}</section>;
};

export const OnlyBottomSpacing = ({
  children,
  className
}: {
  children: Children;
  className?: ClassNameType;
}) => {
  return <section className={`pb-5 sm:pb-6 ${className}`}>{children}</section>;
};
