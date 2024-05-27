import { FieldErrors, UseFormRegister } from "react-hook-form";
import { twJoin } from "tailwind-merge";
import { createFormT } from "../../../hooks/useCreateForm";

function ScheduleNameInput({
  register,
  errors,
}: {
  register: UseFormRegister<createFormT>;
  errors: FieldErrors<createFormT>;
}) {
  return (
    <>
      <label htmlFor="schedule-name">
        <h1 className="text-lg font-medium sm:text-xl">Schedule Name</h1>
      </label>
      <input
        id="schedule-name"
        type="text"
        className={twJoin(
          "input input-bordered mb-5 w-full",
          errors.name && "input-error",
        )}
        required
        {...register("name", {
          maxLength: {
            value: 35,
            message: "Schedule Name cannot be longer than 35 characters",
          },
        })}
      />
    </>
  );
}

export default ScheduleNameInput;
