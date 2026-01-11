export const scrollToSection = ({
  targetId,
  behavior,
  align,
  afterScroll
}: {
  targetId: string;
  behavior: "smooth" | "instant";
  align?: "start" | "center" | "end";
  afterScroll: () => void;
}) => {
  const target = document.getElementById(targetId) as HTMLElement;
  target.scrollIntoView({
    behavior,
    inline: align || "center",
    block: align || "center"
  });
  setTimeout(afterScroll, 400);
};
