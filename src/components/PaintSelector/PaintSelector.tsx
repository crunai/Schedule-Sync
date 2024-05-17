import { useEffect, useState } from "react";
import { OptionT } from "../CalendarScheduler/CalendarScheduler";
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
  setOption,
}: {
  setOption: React.Dispatch<React.SetStateAction<OptionT>>;
}) {
  const [paint, setPaint] = useState<Paint>("Preferred");
  useEffect(() => {
    setOption((prev) => {
      return { ...prev, paint };
    });
  }, [paint, setOption]);

  return (
    <div className="mt-5 flex justify-start">
      {paintValues.map(({ bg, hover, value }) => {
        const isSelected = value === paint;
        const optionClass = twJoin(
          !isSelected &&
            "opacity-90 hover:opacity-100 hover:font-bold font-light",
          bg,
          hover,
        );
        return (
          <div
            key={value}
            role="option"
            className={twJoin(
              "btn btn-square btn-lg flex flex-col justify-center py-1 text-xs",
              optionClass,
            )}
            onClick={() => setPaint(value)}
          >
            <div className="opacity-100">{value}</div>
            {isSelected && <FaPaintBrush size={"0.8rem"} />}
          </div>
        );
      })}
    </div>
  );
}

export default PaintSelector;
