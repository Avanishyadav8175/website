export const getDaysHrsMinsSecs = (targetDate: Date): string => {
  const checkTwoDigits = (val: number) => (val < 10 ? `0${val}` : `${val}`);

  const now = new Date();
  // @ts-ignore
  let delta = Math.abs(targetDate - now) / 1000;

  const days = checkTwoDigits(Math.floor(delta / 86400));
  delta -= Math.floor(delta / 86400) * 86400;

  const hours = checkTwoDigits(Math.floor(delta / 3600) % 24);
  delta -= (Math.floor(delta / 3600) % 24) * 3600;

  const minutes = checkTwoDigits(Math.floor(delta / 60) % 60);
  delta -= (Math.floor(delta / 60) % 60) * 60;

  const seconds = checkTwoDigits(Math.floor(delta % 60));
  if (
    days === "NaN" ||
    hours === "NaN" ||
    minutes === "NaN" ||
    seconds === "NaN"
  )
    return "";

  if (days === "00") return `${hours}h ${minutes}m`;
  return `${days}d ${hours}h ${minutes}m`;
};
