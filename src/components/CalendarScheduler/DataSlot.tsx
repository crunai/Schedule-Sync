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
  position,
}: {
  children?: React.ReactNode;
  gapSize: number;
  paint: Paint;
  position: { index: number; last: number };
}) {
  const [status, setStatus] = useState<InterevalType>("None");
  const isMouseDown = useMouseDown();
  const className = useMemo(() => {
    let className = "";
    if (status === "Preferred") className = twJoin("bg-green-400", className);
    if (status === "Not Preferred")
      className += twJoin("bg-yellow-300", className);
    if (status === "None") className += twJoin("bg-red-200", className);
    if (position.index !== position.last) {
      className = twJoin("border-b-0", className);
    }
    return className;
  }, [status, position]);

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
      onClick={() => setPaint(false)}
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
