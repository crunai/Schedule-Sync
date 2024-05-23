import { DateTime } from "luxon";
import { isSameHourMinute } from "../../helpers/DateTime";
import PaddingBlocks from "./PaddingBlocks";

function IncrementalPaddingBlocks(
  from: DateTime,
  to: DateTime,
  key: string,
  gapSize: number,
  isLast?: boolean,
) {
  const padSlots = [];
  let padIterator = from;
  while (!isSameHourMinute(padIterator, to)) {
    padSlots.push(padIterator);
    padIterator = padIterator.plus({ minutes: 15 });
  }
  return (
    <PaddingBlocks
      isLast={isLast}
      gapSize={gapSize}
      key={key}
      padSlots={padSlots}
    />
  );
}

export default IncrementalPaddingBlocks;
