import { DateTime } from "luxon";
import {
  allDays,
  isAfterHourMinute,
  isSameHourMinute,
} from "../../helpers/DateTime";
import IncrementalPaddingBlocks from "./IncrementalPaddingBlocks";
import DataSlot from "./DataSlot";
import { OptionT } from "../../pages/Schedule";
import { Paint } from "../Inputs/PaintSelector/PaintSelector";
import EmptySlot from "./EmptySlot";
import { GappedAvailableTimeSlots } from "../../hooks/useScheduleData";

function CalendarTimeSlots({
  timeSlots,
  option,
  paint,
  isDaysInWeek,
}: {
  timeSlots: GappedAvailableTimeSlots;
  option: OptionT;
  paint: Paint;
  isDaysInWeek: boolean;
}) {
  return (
    <>
      {timeSlots.map(({ day, slotsAtDay }) => (
        <div key={day.toMillis()} className="flex flex-col items-center">
          <div className="text-sm font-semibold">
            {isDaysInWeek ? allDays[day.weekday - 1] : day.toLocaleString()}
          </div>
          {addSlots(slotsAtDay, timeSlots, option, paint)}
        </div>
      ))}
    </>
  );
}

function addSlots(
  slotsAtDay: DateTime[],
  gappedAvailableTimeSlots: GappedAvailableTimeSlots,
  option: OptionT,
  paint: Paint,
) {
  const baselineSlots = gappedAvailableTimeSlots[0].slotsAtDay;
  let hasPaddedDST = false;
  return slotsAtDay.map((slot, index) => {
    for (
      let reverseIterator = index - 1;
      reverseIterator >= 0;
      reverseIterator--
    ) {
      if (isAfterHourMinute(slotsAtDay[reverseIterator], slot)) {
        hasPaddedDST = true;
        return null;
      }
    }

    const lastTimeSlot = baselineSlots[baselineSlots.length - 1];
    if (isAfterHourMinute(slot, lastTimeSlot, true)) {
      return null;
    }

    let basePadding = null;
    if (index === baselineSlots.length - 1) {
      basePadding = IncrementalPaddingBlocks(
        slot,
        lastTimeSlot,
        "dst-base-padding",
        option.gapSize,
        true,
      );
    }

    const renderedSlot = (
      <div key={slot.toMillis()}>
        {index !== 0 &&
          !isSameHourMinute(
            slot,
            slotsAtDay[index - 1].plus({ minutes: 15 }),
          ) && <EmptySlot isLabel={false} gapSize={option.gapSize} />}
        <DataSlot
          gapSize={option.gapSize}
          paint={paint}
          isLast={isSameHourMinute(
            baselineSlots[baselineSlots.length - 1],
            slot,
          )}
        ></DataSlot>
        {basePadding}
      </div>
    );

    if (!hasPaddedDST && !isSameHourMinute(baselineSlots[index], slot)) {
      hasPaddedDST = true;
      return (
        <div key={slot.toMillis()}>
          {IncrementalPaddingBlocks(
            baselineSlots[index],
            slot,
            "dst-padding",
            option.gapSize,
          )}
          {renderedSlot}
        </div>
      );
    }
    return renderedSlot;
  });
}

export default CalendarTimeSlots;
