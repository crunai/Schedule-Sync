import { useEffect, useState } from "react";
import { OptionT } from "../CalendarScheduler/CalendarScheduler";
import { BsZoomOut } from "react-icons/bs";
import { BsZoomIn } from "react-icons/bs";

function GapSlider({
  setOption,
}: {
  setOption: React.Dispatch<React.SetStateAction<OptionT>>;
}) {
  const [gapSize, setGapSize] = useState(1);
  useEffect(() => {
    setOption((prev) => {
      return { ...prev, gapSize: 15 * 2 ** gapSize };
    });
  }, [gapSize, setOption]);

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
