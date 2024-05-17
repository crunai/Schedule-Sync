import { DateTime } from "luxon";

export const isSameHourMinute = (a: DateTime, b: DateTime) => {
  return a.hour === b.hour && a.minute === b.minute;
};

export const isAfterHourMinute = (
  a: DateTime,
  b: DateTime,
  strict: boolean = false,
) => {
  if (strict) {
    return a.hour > b.hour || (a.hour === b.hour && a.minute > b.minute);
  }
  return a.hour > b.hour || (a.hour === b.hour && a.minute >= b.minute);
};
