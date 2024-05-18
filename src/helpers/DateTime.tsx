import { DateTime, Interval } from "luxon";
import { Slot } from "../components/CalendarScheduler/CalendarScheduler";

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
  return Array.from(
    new Set(
      availableTimeSlots
        .map((slot) => slot.start.startOf("day").toMillis())
        .concat(
          availableTimeSlots.map((slot) => slot.end.startOf("day").toMillis()),
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
) => {
  const res = [];
  for (const day of uniqueDays.sort((a, b) => a.toMillis() - b.toMillis())) {
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
