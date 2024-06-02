import { FieldErrors } from "react-hook-form";
import { createFormT } from "../../hooks/useCreateForm";
import ErrorAlert from "./ErrorAlert";

function ErrorAlerts({ errors }: { errors: FieldErrors<createFormT> }) {
  return (
    <>
      {Object.entries(errors).map(([field, error]) => {
        return (
          <ErrorAlert key={field} message={error.message}/>
        );
      })}
    </>
  );
}

export default ErrorAlerts;
