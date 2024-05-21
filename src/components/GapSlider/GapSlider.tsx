import { useEffect, useState } from "react";
import { BsZoomOut } from "react-icons/bs";
import { BsZoomIn } from "react-icons/bs";

function GapSlider({
  setParentGap,
}: {
  setParentGap: (newTz: number) => void;
}) {
  const [gapSize, setGapSize] = useState(1);
  useEffect(() => {
    setParentGap(15 * 2 ** gapSize);
  }, [gapSize, setParentGap]);

  return (
    <div className="flex flex-row items-center justify-center">
      <BsZoomOut className="h-8 w-8" />
      <input
        type="range"
        min={0}
        max={3}
        value={gapSize}
        className="range range-sm mx-3"
        step={1}
        onChange={(e) => setGapSize(Number(e.target.value))}
      />
      <BsZoomIn className="h-8 w-8" />
    </div>
  );
}

export default GapSlider;
