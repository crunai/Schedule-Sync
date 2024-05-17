import { useMemo } from "react";
import { twJoin } from "tailwind-merge";

function Slot({
  children,
  gapSize,
  className,
}: {
  children?: React.ReactNode;
  gapSize: number;
  className?: string;
}) {
  const height = useMemo(() => {
    if (gapSize === 30) {
      return "h-7";
    } else if (gapSize === 60) {
      return "h-4";
    } else if (gapSize === 120) {
      return "h-1";
    } else {
      return "h-10";
    }
  }, [gapSize]);

  return (
    <div
      className={twJoin(
        "flex items-center justify-center text-center",
        height,
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Slot;
