import { useMemo, useState } from "react";
import Slot from "./Slot";
import { InterevalType } from "./CalendarScheduler";
import { useMouseDown } from "../../hooks/useMouseDown";
import { Paint } from "../PaintSelector/PaintSelector";
import { twJoin } from "tailwind-merge";

function DataSlot({
  children,
  gapSize,
  paint,
  isLast,
}: {
  children?: React.ReactNode;
  gapSize: number;
  paint: Paint;
  isLast: boolean;
}) {
  const [status, setStatus] = useState<InterevalType>("None");
  const isMouseDown = useMouseDown();
  const className = useMemo(() => {
    let clName = "";
    if (status === "Preferred") clName = twJoin("bg-green-400", clName);
    if (status === "Not Preferred") clName += twJoin("bg-yellow-300", clName);
    if (status === "None") clName += twJoin("bg-red-200", clName);
    if (!isLast) clName = twJoin("border-b-0", clName);
    return clName;
  }, [status, isLast]);

  const setPaint = (requireMouseDown: boolean = true) => {
    if (isMouseDown || !requireMouseDown) {
      if (paint === "Preferred") setStatus("Preferred");
      if (paint === "Not Preferred") setStatus("Not Preferred");
      if (paint === "Remove") setStatus("None");
      return;
    }
  };
  return (
    <div
      onMouseEnter={() => setPaint()}
      onMouseLeave={() => setPaint()}
      onMouseDown={() => setPaint(false)}
    >
      <Slot
        className={twJoin(
          className,
          "select-none border border-black border-opacity-70 hover:cursor-crosshair",
        )}
        gapSize={gapSize}
      >
        {children}
      </Slot>
    </div>
  );
}

export default DataSlot;
