import { useCallback } from "react";
import { OptionT } from "../pages/Schedule";

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

  return { handleTzChange, handleGapChange };
};

export default useCalendarChanges;
