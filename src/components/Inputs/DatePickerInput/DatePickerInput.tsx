import { DateTime } from "luxon";
import { forwardRef } from "react";
import { CiCalendar } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import type { ButtonHTMLAttributes } from "react";
import { twJoin } from "tailwind-merge";

type DatePickerInputT = ButtonHTMLAttributes<HTMLButtonElement> & {
  watchDates: Date[];
  isError: boolean;
  clear: () => void;
};

const DatePickerInput = forwardRef<HTMLButtonElement, DatePickerInputT>(
  ({ watchDates, clear, className, isError, ...props }, inputRef) => {
    const numDatesToShow = Math.min(watchDates.length, 5);
    const datesToShow = watchDates
      .slice(0, numDatesToShow)
      .map((d) => DateTime.fromJSDate(d))
      .map((d) => d.toLocaleString())
      .join(", ");

    return (
      <button
        className={twJoin(
          "flex h-full w-full flex-row items-center rounded-md border bg-inherit p-0 hover:border hover:bg-inherit",
          isError ? "border-red-600" : "border-black",
          className,
        )}
        {...props}
        ref={inputRef}
        type="button"
      >
        <CiCalendar className="ml-4 h-8 w-8 flex-none" />
        <div className="sm:text-md flex h-full w-full flex-1 items-center justify-center text-sm font-medium">
          {`${datesToShow}${watchDates.length > 5 ? `, (+${watchDates.length - 5})` : ""}`}
        </div>
        <div
          onClick={clear}
          className="btn btn-circle btn-sm mr-4 flex-none bg-slate-200"
        >
          <RxCross2 color="black" strokeWidth="1.7" className="h-4 w-4" />
        </div>
      </button>
    );
  },
);
DatePickerInput.displayName = "DatePickerInput";

export default DatePickerInput;
