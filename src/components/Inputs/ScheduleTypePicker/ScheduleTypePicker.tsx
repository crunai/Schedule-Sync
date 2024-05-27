import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import DatePickerInput from "../DatePickerInput/DatePickerInput";
import DayInWeekSelector from "../DayInWeekSelector/DayInWeekSelector";
import DatePicker from "react-datepicker";
import { useCallback } from "react";
import { createFormT } from "../../../hooks/useCreateForm";

function ScheduleTypePicker({
  register,
  setValue,
  watch,
  errors,
  clearErrors,
}: {
  register: UseFormRegister<createFormT>;
  setValue: UseFormSetValue<createFormT>;
  watch: UseFormWatch<createFormT>;
  errors: FieldErrors<createFormT>;
  clearErrors: UseFormClearErrors<createFormT>;
}) {
  const [watchDates, watchDays, watchIsDaysOfWeek] = watch([
    "dates",
    "days",
    "isDaysOfWeek",
  ]);
  const handleDayInWeekChange = useCallback(
    (value: number[]) => {
      setValue("days", value);
      if (value.length > 0) {
        clearErrors("days");
      }
    },
    [setValue, clearErrors],
  );

  return (
    <>
      <label
        className="label w-full cursor-pointer"
        onClick={() => {
          clearErrors("days");
          clearErrors("dates");
        }}
      >
        <span className="text-sm font-semibold sm:text-xl">Selected Dates</span>
        <input
          type="checkbox"
          className="toggle mx-3 bg-emerald-600 hover:bg-emerald-600"
          {...register("isDaysOfWeek")}
        />
        <span className="text-sm font-semibold sm:text-xl">Days of Week</span>
      </label>

      <div className="my-2 h-16 flex-row items-center justify-center">
        {watchIsDaysOfWeek ? (
          <DayInWeekSelector
            setParentDaysInWeek={handleDayInWeekChange}
            initialState={watchDays}
            isError={!!errors.days}
          />
        ) : (
          <DatePicker
            wrapperClassName="date-picker-wrapper w-full h-full"
            selectedDates={watchDates}
            selectsMultiple
            onChange={(dates) => {
              setValue("dates", dates ?? []);
              clearErrors("dates");
            }}
            shouldCloseOnSelect={false}
            todayButton="Today"
            required
            customInput={
              <DatePickerInput
                watchDates={watchDates}
                isError={!!errors.dates}
                clear={() => setValue("dates", [])}
              />
            }
          />
        )}
      </div>
    </>
  );
}

export default ScheduleTypePicker;
