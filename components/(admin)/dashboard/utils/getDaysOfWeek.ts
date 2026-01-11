import moment from "moment";

export const getDaysOfWeek = ({
  format
}: {
  format: "full" | "short" | "narrow";
}): string[] => {
  const formats = {
    full: "dddd",
    short: "ddd",
    narrow: "dd"
  };

  const daysOfWeek: string[] = [];
  for (let i = 0; i < 7; i++) {
    daysOfWeek.push(
      moment().startOf("week").add(i, "days").format(formats[format])
    );
  }

  return daysOfWeek;
};
