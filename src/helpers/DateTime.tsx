import { DateTime, Interval } from "luxon";
import { Slot } from "../hooks/useScheduleData";

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

export const setSlotZone = (
  slot: { start: DateTime; end: DateTime },
  zone: string,
) => {
  return {
    start: slot.start.setZone(zone),
    end: slot.end.setZone(zone),
  };
};

export const extractUniqueDays = (availableTimeSlots: Slot[]) => {
  const expandedSlots = [];
  for (const slot of availableTimeSlots) {
    let slotIterator = slot.start;
    while (
      slotIterator.startOf("day").toMillis() !==
      slot.end.startOf("day").toMillis()
    ) {
      expandedSlots.push({
        start: slotIterator,
        end: slotIterator.endOf("day"),
      });
      slotIterator = slotIterator.plus({ day: 1 });
    }
    expandedSlots.push({ start: slotIterator, end: slot.end });
  }
  return Array.from(
    new Set(
      expandedSlots
        .map((slot) => slot.start.startOf("day").toMillis())
        .concat(
          expandedSlots.map((slot) => slot.end.startOf("day").toMillis()),
        ),
    ),
  ).map((t) => DateTime.fromMillis(t));
};

export const findSlotValidStartTimes = (
  uniqueDays: DateTime[],
  availabilitiesAsOffsets: { start: number; end: number; delta: number }[],
) => {
  const slotsAvailableToRenderStart = new Set<number>();
  for (const day of uniqueDays) {
    let currentSlot = Interval.fromDateTimes(day, day.plus({ minutes: 15 }));
    const dayMillis = day.toMillis();

    while (currentSlot.start?.startOf("day").toMillis() === dayMillis) {
      const potentialSlot = currentSlot.start.toMillis() - dayMillis;
      if (
        availabilitiesAsOffsets.find((availability) => {
          if (availability.delta >= 24 * 60 * 60000) {
            return true;
          }
          if (availability.delta < 15 * 60000) {
            return false;
          }
          if (availability.end <= availability.start) {
            if (
              potentialSlot >= availability.start ||
              potentialSlot < availability.end
            ) {
              return true;
            }
            return false;
          }
          if (
            potentialSlot >= availability.start &&
            potentialSlot < availability.end
          ) {
            return true;
          }
          return false;
        })
      ) {
        slotsAvailableToRenderStart.add(potentialSlot);
      }
      currentSlot = Interval.fromDateTimes(
        currentSlot.start.plus({ minutes: 15 }),
        currentSlot.end!.plus({ minutes: 15 }),
      );
    }
  }
  return Array.from(slotsAvailableToRenderStart).sort((a, b) => a - b);
};

export const expandSingleDaySlotsToUniqueDays = (
  uniqueDays: DateTime[],
  sortedSlotsAvailableToRenderStart: number[],
  isDaysInWeek: boolean,
) => {
  const res = [];
  let days = uniqueDays.sort((a, b) => a.toMillis() - b.toMillis());
  if (isDaysInWeek) {
    days = uniqueDays.sort((a, b) => a.weekday - b.weekday);
  }

  for (const day of days) {
    const slotsAtDay: DateTime[] = [];
    for (const slot of sortedSlotsAvailableToRenderStart) {
      slotsAtDay.push(DateTime.fromMillis(slot + day.toMillis()));
    }
    res.push({
      day,
      slotsAtDay,
    });
  }
  return res;
};

export const allDays: string[] = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];
