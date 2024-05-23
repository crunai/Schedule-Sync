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
        "border border-black bg-gradient-stripe hover:cursor-not-allowed",
        className,
      )}
    ></Slot>
  );
}

export default PaddingBlock;
