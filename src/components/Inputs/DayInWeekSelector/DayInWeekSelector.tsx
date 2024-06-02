import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

const allDays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function DayInWeekSelector({
  setParentDaysInWeek,
  initialState,
  isError,
}: {
  setParentDaysInWeek: (value: number[]) => void;
  initialState: number[];
  isError: boolean;
}) {
  const [days, setDays] = useState<number[]>(initialState);
  useEffect(() => {
    setParentDaysInWeek(days);
  }, [days, setParentDaysInWeek]);

  return (
    <div className="join join-horizontal flex flex-row">
      {allDays.map((dayString, dayNumber) => {
        return (
          <button
            key={dayString}
            type="button"
            className={twMerge(
              "join-item h-16 w-10 flex-1 border text-sm sm:h-16 sm:w-16 sm:text-base",
              days.includes(dayNumber) && "bg-emerald-200",
              isError ? "border-red-600" : "border-black",
            )}
            value={dayNumber}
            onClick={(e) => {
              const value = Number(e.currentTarget.value);
              if (days.includes(value)) {
                setDays((prev) =>
                  prev.filter((dayNumber) => dayNumber !== value),
                );
              } else {
                setDays((prev) => prev.concat([value]));
              }
            }}
          >
            {dayString}
          </button>
        );
      })}
    </div>
  );
}

export default DayInWeekSelector;
