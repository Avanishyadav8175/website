// libraries
import moment from "moment";

// hooks
import { useState, useEffect } from "react";

// types
type TimeRemaining = {
  hours: number;
  minutes: number;
  seconds: number;
  date: Date;
};

// hooks
const useTimeRemainingFromHours = (
  currentHour: number,
  definedTime?: string
): TimeRemaining => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: moment().toDate()
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment();
      const adjustedNow = now.clone().add(currentHour, "hours");

      let targetTime;

      if (definedTime) {
        const [hour, minute] = definedTime.split(":").map(Number);

        targetTime = adjustedNow.clone().set({ hour, minute, second: 0 });

        if (targetTime.isBefore(adjustedNow)) {
          targetTime.add(1, "day");
        }
      } else {
        targetTime = adjustedNow.clone().endOf("day");
      }

      const timeDiff = moment.duration(targetTime.diff(adjustedNow));

      setTimeRemaining({
        hours: Math.max(timeDiff.hours(), 0),
        minutes: Math.max(timeDiff.minutes(), 0),
        seconds: Math.max(timeDiff.seconds(), 0),
        date: targetTime.toDate()
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [currentHour, definedTime]);

  return timeRemaining;
};

export default useTimeRemainingFromHours;
