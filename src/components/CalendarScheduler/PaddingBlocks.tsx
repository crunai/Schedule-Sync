import { DateTime } from "luxon";
import PaddingBlock from "./PaddingBlock";

function PaddingBlocks({
  padSlots,
  gapSize,
  isLast,
}: {
  padSlots: DateTime[];
  gapSize: number;
  isLast?: boolean;
}) {
  return (
    <>
      {padSlots.map((padSlot, index) => {
        return (
          <div key={padSlot.toMillis()}>
            <PaddingBlock
              className={
                !(isLast && index === padSlots.length - 1) && "border-b-0"
              }
              gapSize={gapSize}
            />
          </div>
        );
      })}
    </>
  );
}

export default PaddingBlocks;
