import { DateTime, WeekdayNumbers } from "luxon";
import { useEffect, useMemo, useState } from "react";
import { ScheduleInfo } from "../helpers/apiTypeAdapter";
import { expandSingleDaySlotsToUniqueDays, extractUniqueDays, findSlotValidStartTimes, setSlotZone } from "../helpers/DateTime";

export type Slot = {
  start: DateTime;
  end: DateTime;
};

export type IntervalSlot = {
  start: DateTime;
  end: DateTime;
  status: InterevalType;
};

export type InterevalType = "Preferred" | "Not Preferred" | "None";

export type GappedAvailableTimeSlots = {
  day: DateTime;
  slotsAtDay: DateTime[];
}[];

const useScheduleData = (data: ScheduleInfo, tz: string) => {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<Slot[]>(() => {
    if (data.type === "DAYSINWEEK") {
      return data.allowable_time_range.map(({ start, end }) => {
        const dummyDateStart = DateTime.fromMillis(start, { zone: "utc" });
        const dummyDateEnd = DateTime.fromMillis(end - 1, { zone: "utc" });
        const now = DateTime.now().startOf("day");
        const startTime = now.set({
          weekday: dummyDateStart.weekday as WeekdayNumbers,
          hour: dummyDateStart.hour,
          minute: dummyDateStart.minute,
        });
        let potentialEndTime = now.set({
          weekday: dummyDateEnd.weekday as WeekdayNumbers,
          hour: dummyDateEnd.hour,
          minute: dummyDateEnd.minute,
        });
        while (startTime.toMillis() >= potentialEndTime.toMillis()) {
          potentialEndTime = potentialEndTime.plus({ week: 1 });
        }
        return {
          start: startTime,
          end: potentialEndTime,
        };
      });
    }
    return data.allowable_time_range.map(({ start, end }) => {
      return {
        start: DateTime.fromMillis(start),
        end: DateTime.fromMillis(end - 1),
      };
    });
  });


  useEffect(() => {
    setAvailableTimeSlots((prev) =>
      prev
        .map((slot) => setSlotZone(slot, tz))
        .sort((a, b) => {
          const hDiff = a.start.hour - b.start.hour;
          if (hDiff !== 0) return hDiff;
          return a.start.minute - b.start.minute;
        }),
    );
  }, [tz]);

  const gappedAvailableTimeSlots = useMemo(() => {
    const uniqueDays = extractUniqueDays(availableTimeSlots);
    const availabilitiesAsOffsets = availableTimeSlots.map((time) => {
      return {
        start: time.start.toMillis() - time.start?.startOf("day").toMillis(),
        end: time.end.toMillis() - time.end?.startOf("day").toMillis(),
        delta: time.end.toMillis() - time.start.toMillis(),
      };
    });
    const sortedSlotsAvailableToRenderStart = findSlotValidStartTimes(
      uniqueDays,
      availabilitiesAsOffsets,
    );

    return expandSingleDaySlotsToUniqueDays(
      uniqueDays,
      sortedSlotsAvailableToRenderStart,
      data.type === "DAYSINWEEK",
    );
  }, [availableTimeSlots, data.type]);

  return { gappedAvailableTimeSlots };
};

export default useScheduleData;
