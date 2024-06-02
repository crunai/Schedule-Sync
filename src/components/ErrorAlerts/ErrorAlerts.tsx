import { MdError } from "react-icons/md";
import { FieldErrors } from "react-hook-form";
import { createFormT } from "../../hooks/useCreateForm";

function ErrorAlerts({ errors }: { errors: FieldErrors<createFormT> }) {
  return (
    <>
      {Object.entries(errors).map(([field, error]) => {
        return (
          <div key={field} role="alert" className="alert mt-5 bg-red-400">
            <MdError className="h-6 w-6" />
            <span className="text-sm font-bold">{error.message}</span>
          </div>
        );
      })}
    </>
  );
}

export default ErrorAlerts;
