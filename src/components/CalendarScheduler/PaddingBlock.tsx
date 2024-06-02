import { ClassNameValue, twMerge } from "tailwind-merge";
import Slot from "./Slot";

function PaddingBlock({
  gapSize,
  className,
}: {
  gapSize: number;
  className?: ClassNameValue;
}) {
  return (
    <Slot
      gapSize={gapSize}
      className={twMerge(
        "cursor-not-allowed border border-black bg-gradient-stripe",
        className,
      )}
    ></Slot>
  );
}

export default PaddingBlock;
