import { MdError } from "react-icons/md";

function ErrorAlert({ message, key }: { message?: string, key?: React.Key }) {
  return (
    <div key={key} role="alert" className="alert mt-5 bg-red-400">
      <MdError className="h-6 w-6" />
      <span className="text-sm font-bold">{message}</span>
    </div>
  );
}

export default ErrorAlert;
