import { DateTime } from "luxon";
import PaddingBlocks from "./PaddingBlocks";
import Slot from "./Slot";

const size = 3;

function EmptySlot({
  isLabel,
  gapSize,
}: {
  isLabel: boolean;
  gapSize: number;
}) {
  if (isLabel) {
    return (
      <>
        {Array.from({ length: size }).map((_, i) => {
          return <Slot key={i} gapSize={gapSize} />;
        })}
      </>
    );
  }
  return (
    <PaddingBlocks
      padSlots={Array.from({ length: size }).map((_, i) => DateTime.fromMillis(i))}
      gapSize={gapSize}
    />
  );
}

export default EmptySlot;
