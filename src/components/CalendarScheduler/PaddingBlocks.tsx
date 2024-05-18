import { DateTime } from "luxon";
import PaddingBlock from "./PaddingBlock";

function PaddingBlocks({
  padSlots,
  gapSize,
}: {
  padSlots: DateTime[];
  gapSize: number;
}) {
  return (
    <>
      {padSlots.map((padSlot) => {
        return (
          <div key={padSlot.toMillis()}>
            <PaddingBlock gapSize={gapSize} />
          </div>
        );
      })}
    </>
  );
}

export default PaddingBlocks;
