import { DateTime } from "luxon";
import Slot from "./Slot";

function CalendarLabels({
  header,
  gapSize,
}: {
  header: DateTime[];
  gapSize: number;
}) {
  return (
    <>
      {header.map((slot, index) => {
        return (
          <div key={slot.toMillis()}>
            {index !== 0 &&
              header[index - 1].plus({ minutes: 15 }).toMillis() !==
                slot.toMillis() && <Slot gapSize={gapSize} />}
            {index % (gapSize / 15) === 0 ? (
              <Slot gapSize={gapSize}>
                {slot.toLocaleString(DateTime.TIME_SIMPLE)}
              </Slot>
            ) : (
              <Slot gapSize={gapSize} />
            )}
          </div>
        );
      })}
    </>
  );
}

export default CalendarLabels;
