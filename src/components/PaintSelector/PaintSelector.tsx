import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import { FaPaintBrush } from "react-icons/fa";

export type Paint = "Preferred" | "Not Preferred" | "Remove";

const paintValues: { bg: string; hover: string; value: Paint }[] = [
  {
    bg: "bg-green-400",
    hover: "hover:bg-green-400",
    value: "Preferred",
  },
  {
    bg: "bg-yellow-300",
    hover: "hover:bg-yellow-300",
    value: "Not Preferred",
  },
  {
    bg: "bg-red-200",
    hover: "hover:bg-red-200",
    value: "Remove",
  },
];

function PaintSelector({
  setParentPaint,
}: {
  setParentPaint: (value: Paint) => void;
}) {
  const [paint, setPaint] = useState<Paint>("Preferred");
  useEffect(() => {
    setParentPaint(paint);
  }, [paint, setParentPaint]);

  return (
    <div className="mr-0 mt-5 flex w-fit justify-start rounded-box">
      {paintValues.map(({ bg, hover, value }) => {
        const isSelected = value === paint;
        const optionClass = twJoin(
          !isSelected &&
            "opacity-90 hover:opacity-100 hover:font-bold font-light",
          bg,
          hover,
        );
        return (
          <div key={value} className="indicator mb-2">
            <div
              role="option"
              className={twJoin(
                "btn btn-square btn-lg flex flex-col justify-center py-1 text-xs",
                optionClass,
              )}
              onMouseDown={() => setPaint(value)}
            >
              <div>{value}</div>
            </div>
            {isSelected && (
              <div className="badge indicator-item badge-md indicator-center indicator-bottom border border-gray-400">
                {<FaPaintBrush size={"1rem"} />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PaintSelector;
