import TimezoneSelector from "../components/Inputs/TimezoneSelector/TimezoneSelector";
import HourSelector from "../components/Inputs/HourSelector/HourSelector";
import "react-datepicker/dist/react-datepicker.css";
import "../components/Inputs/DatePickerInput/DatePicker.css";
import ErrorAlerts from "../components/ErrorAlerts/ErrorAlerts";
import ScheduleNameInput from "../components/Inputs/ScheduleNameInput/ScheduleNameInput";
import ScheduleTypePicker from "../components/Inputs/ScheduleTypePicker/ScheduleTypePicker";
import useCreateForm from "../hooks/useCreateForm";
import ErrorAlert from "../components/ErrorAlerts/ErrorAlert";

function Create() {
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    watch,
    setError,
    clearErrors,
    onSubmit,
    mutationSubmit,
  } = useCreateForm();

  return (
    <main className="mx-2 mb-10 mt-4">
      <h1 className="mb-5 text-center text-3xl font-bold">
        Customise Your Schedule
      </h1>
      <form
        className="flex flex-col items-center"
        onSubmit={(e) => {
          void handleSubmit(onSubmit)(e);
        }}
      >
        <div className="flex w-[95%] flex-col items-start gap-2 sm:w-5/6">
          <ScheduleNameInput register={register} errors={errors} />

          <div className="w-min-[17.5rem] sm:w-min-[28rem] mb-3 w-full">
            <ScheduleTypePicker
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              clearErrors={clearErrors}
            />
          </div>

          <div className="flex flex-row items-center">
            <HourSelector
              register={register}
              watch={watch}
              label="Earliest Time:"
              formInputName="earliestHour"
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
          </div>

          <div className="flex flex-row items-center">
            <HourSelector
              register={register}
              watch={watch}
              label="Latest Time:  "
              formInputName="latestHour"
              setValue={setValue}
              setError={setError}
              clearErrors={clearErrors}
            />
          </div>

          <div className="flex flex-row">
            <TimezoneSelector
              numWhiteSpace={5}
              setParentTz={(value) => setValue("timezone", value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-md mt-5 w-full border bg-emerald-600 text-white sm:btn-lg hover:bg-emerald-700"
          >
            {mutationSubmit.isPending ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              "Create New Schedule"
            )}
          </button>
          <ErrorAlerts errors={errors} />
          {mutationSubmit.isError && (
            <ErrorAlert message="Something went wrong during schedule creation"/>
          )}
        </div>
      </form>
    </main>
  );
}

export default Create;
