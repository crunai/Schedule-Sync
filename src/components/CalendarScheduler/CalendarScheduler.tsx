import { useState } from "react";
import PaintSelector, { Paint } from "../Inputs/PaintSelector/PaintSelector";
import CalendarLabels from "./CalendarLabels";
import CalendarTimeSlots from "./CalendarTimeSlots";
import { OptionT } from "../../pages/Schedule";
import { ScheduleInfo } from "../../helpers/apiTypeAdapter";
import useScheduleData from "../../hooks/useScheduleData";

function CalendarScheduler({
  option,
  data,
}: {
  option: OptionT;
  data: ScheduleInfo;
}) {
  const { gappedAvailableTimeSlots } = useScheduleData(data, option.tz);
  const [paint, setPaint] = useState<Paint>("Preferred");

  return (
    <div className="h-full w-full">
      {gappedAvailableTimeSlots[0] && (
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
            paint={paint}
            isDaysInWeek={data.type === "DAYSINWEEK"}
          />
        </section>
      )}
      <PaintSelector setParentPaint={(value: Paint) => setPaint(value)} />
    </div>
  );
}

export default CalendarScheduler;
