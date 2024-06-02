import { useMemo } from "react";
import {
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { createFormT } from "../../../hooks/useCreateForm";

const errorMessage = "Latest time must be greater than earliest time";
const trackedErrorInput = "earliestHour";

function HourSelector({
  register,
  watch,
  label,
  formInputName,
  setValue,
  setError,
  clearErrors,
}: {
  register: UseFormRegister<createFormT>;
  watch: UseFormWatch<createFormT>;
  label: string;
  formInputName: "earliestHour" | "latestHour";
  setValue: UseFormSetValue<createFormT>;
  setError: UseFormSetError<createFormT>;
  clearErrors: UseFormClearErrors<createFormT>;
}) {
  const hourStrings = useMemo(() => [...Array(25).keys()], []);
  const [earliest, latest] = watch(["earliestHour", "latestHour"]);

  return (
    <>
      <label htmlFor={`hour-${label}`} className="label whitespace-pre">
        {label}
      </label>
      <select
        id={`hour-${label}`}
        className="select select-sm rounded border border-black"
        {...register(formInputName, {
          validate: () => {
            if (formInputName !== trackedErrorInput) return true;
            return latest > earliest || errorMessage;
          },
          onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
            const value = Number(e.target.value);
            setValue(formInputName, value);
            if (
              (formInputName === "earliestHour" && value >= latest) ||
              (formInputName === "latestHour" && earliest >= value)
            ) {
              setError(trackedErrorInput, {
                type: "validate",
                message: errorMessage,
              });
            } else {
              clearErrors(trackedErrorInput);
            }
          },
          valueAsNumber: true,
        })}
      >
        {hourStrings.map((hourString) => {
          const isPM = hourString >= 12 && hourString !== 24;
          const renderedHourString =
            hourString % 12 === 0 ? 12 : hourString % 12;
          return (
            <option key={hourString} value={hourString}>
              {`${String(renderedHourString).padStart(2, " ")}:00 ${isPM ? "PM" : "AM"}`}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default HourSelector;
