import { MdError } from "react-icons/md";

function ErrorAlert({ message }: { message?: string }) {
  return (
    <div role="alert" className="alert mt-5 bg-red-400">
      <MdError className="h-6 w-6" />
      <span className="text-sm font-bold">{message}</span>
    </div>
  );
}

export default ErrorAlert;
