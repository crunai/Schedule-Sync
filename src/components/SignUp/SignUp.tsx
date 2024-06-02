import { useForm } from "react-hook-form";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { apiLink } from "../../helpers/api.config";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import ErrorAlert from "../ErrorAlerts/ErrorAlert";
import { twMerge } from "tailwind-merge";
import axios from "axios";

type signUpForm = { username: string; password: string };

function SignUp({
  scheduleUUID,
  setToken,
}: {
  scheduleUUID?: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpForm>();

  const mutationSignup = useMutation({
    mutationFn: async (data: signUpForm) => {
      return await axios
        .post<{ token: string }>(`${apiLink}/users/login`, {
          name: data.username,
          scheduleUUID,
          password: data.password,
        })
        .then((res) => {
          setToken(res.data.token);
        });
    },
  });

  const onSubmit = useCallback(
    (data: signUpForm) => {
      return mutationSignup.mutate(data);
    },
    [mutationSignup],
  );

  return (
    <form
      className="flex min-h-96 w-full flex-col items-center"
      onSubmit={(e) => {
        void handleSubmit(onSubmit)(e);
      }}
    >
      <div className="flex flex-row">
        <h2 className="mr-1 text-2xl">Sign In</h2>
        <div className="tooltip" data-tip="Register here for new users">
          <IoMdInformationCircleOutline />
        </div>
      </div>
      <label className="form-control w-full max-w-sm">
        <div className="label">
          <span className="label-text">Username</span>
        </div>
        <input
          type="text"
          {...register("username", {
            maxLength: {
              value: 30,
              message: "Username cannot be longer than 30 characters",
            },
          })}
          required
          className={twMerge(
            "input input-bordered w-full max-w-sm",
            errors.username && "input-error",
          )}
        />
        <div className="label min-h-8">
          {errors.username && (
            <span className="label-text-alt text-red-500">
              {errors.username.message}
            </span>
          )}
        </div>
      </label>

      <label className="form-control w-full max-w-sm">
        <div className="label">
          <span className="label-text">Password (Optional)</span>
        </div>
        <input
          type="text"
          {...register("password")}
          className="input input-bordered w-full max-w-sm"
        />
      </label>
      <button
        type="submit"
        className="btn mt-3 bg-amber-400 hover:bg-amber-400"
      >
        {mutationSignup.isPending ? (
          <span className="loading loading-dots loading-lg"></span>
        ) : (
          "Sign In"
        )}
      </button>
      <div className="w-full max-w-sm">
        {mutationSignup.error && <ErrorAlert message="Wrong Password" />}
      </div>
    </form>
  );
}

export default SignUp;
