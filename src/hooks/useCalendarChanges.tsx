import { useCallback } from "react";
import { OptionT } from "../components/CalendarScheduler/CalendarScheduler";
import { Paint } from "../components/Inputs/PaintSelector/PaintSelector";

const useCalendarChanges = (
  setOption: React.Dispatch<React.SetStateAction<OptionT>>,
) => {
  const handleTzChange = useCallback(
    (value: string) =>
      setOption((prev) => {
        return { ...prev, tz: value };
      }),
    [setOption],
  );

  const handleGapChange = useCallback(
    (value: number) =>
      setOption((prev) => {
        return { ...prev, gapSize: value };
      }),
    [setOption],
  );

  const handlePaintChange = useCallback(
    (value: Paint) =>
      setOption((prev) => {
        return { ...prev, paint: value };
      }),
    [setOption],
  );

  return { handleTzChange, handleGapChange, handlePaintChange };
};

export default useCalendarChanges;
