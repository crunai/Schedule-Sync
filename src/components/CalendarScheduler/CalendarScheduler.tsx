import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";
import TimezoneSelector from "../Inputs/TimezoneSelector/TimezoneSelector";
import PaintSelector, { Paint } from "../Inputs/PaintSelector/PaintSelector";
import GapSlider from "../Inputs/GapSlider/GapSlider";
import CalendarLabels from "./CalendarLabels";
import CalendarTimeSlots from "./CalendarTimeSlots";
import Slot from "./Slot";
import {
  expandSingleDaySlotsToUniqueDays,
  extractUniqueDays,
  findSlotValidStartTimes,
  setSlotZone,
} from "../../helpers/DateTime";
import useCalendarChanges from "../../hooks/useCalendarChanges";

const defaultTZ = DateTime.local().zoneName;

export type OptionT = {
  tz: string;
  paint: Paint;
  gapSize: number;
};

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

function CalendarScheduler() {
  const [timeSlots, setTimeSlots] = useState<IntervalSlot[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<Slot[]>([]);
  const [option, setOption] = useState<OptionT>({
    tz: defaultTZ,
    paint: "Preferred",
    gapSize: 30,
  });

  const { handleTzChange, handleGapChange, handlePaintChange } =
    useCalendarChanges(setOption);

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
    );
  }, [availableTimeSlots]);

  useEffect(() => {
    setAvailableTimeSlots((prev) =>
      prev
        .map((slot) => setSlotZone(slot, option.tz))
        .sort((a, b) => {
          const hDiff = a.start.hour - b.start.hour;
          if (hDiff !== 0) return hDiff;
          return a.start.minute - b.start.minute;
        }),
    );
    setTimeSlots((prev) =>
      prev.map(({ start, end, status }) => {
        return {
          ...setSlotZone({ start, end }, option.tz),
          status: status,
        };
      }),
    );
  }, [option.tz]);

  return (
    <div className="h-full w-full">
      <div>
        <TimezoneSelector setParentTz={handleTzChange} />
      </div>
      <div className="w-96">
        <GapSlider setParentGap={handleGapChange} />
      </div>
      {gappedAvailableTimeSlots[0] ? (
        <section className="flex gap-4">
          <div className="flex flex-col">
            <div>Time</div>
            <CalendarLabels
              header={gappedAvailableTimeSlots[0].slotsAtDay}
              gapSize={option.gapSize}
            />
          </div>
          <CalendarTimeSlots
            timeSlots={gappedAvailableTimeSlots}
            option={option}
          />
        </section>
      ) : (
        <div>No Time Slots</div>
      )}
      {timeSlots.map(() => null)}
      <PaintSelector setParentPaint={handlePaintChange} />
    </div>
  );
}

export default CalendarScheduler;
